# encoding: utf-8

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
import datetime
import uuid
import subprocess

class CA_admin:
    
    def create_certificate(self, username):
        # Generate our key
        key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend()
        )
        # Write our key to disk for safe keeping
        with open('rsa_keys/'+username+"_key.pem", "wb") as f:
            f.write(key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.TraditionalOpenSSL,
                encryption_algorithm=serialization.BestAvailableEncryption(b"passphrase")
                ))
        # Generate a CSR
        csr = x509.CertificateSigningRequestBuilder().subject_name(x509.Name([
        # Provide various details about who we are.
        x509.NameAttribute(NameOID.COUNTRY_NAME, u"TN"),
        x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, u"INSAT"),
        x509.NameAttribute(NameOID.LOCALITY_NAME, u"INSAT"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, username),
        x509.NameAttribute(NameOID.COMMON_NAME, username+'@insat.com'),
        ])).add_extension(
        x509.SubjectAlternativeName([
                # Describe what sites we want this certificate for.
                x509.DNSName(username+'@insat.com')
                ]),
        critical=False,
        # Sign the CSR with our private key.
        ).sign(key, hashes.SHA256(), default_backend())
        # Write our CSR out to disk.
        with open('csr/'+username+"_request.csr", "wb") as f:
            f.write(csr.public_bytes(serialization.Encoding.PEM))
        # Create the client certificate
        pem_csr = open('csr/'+username+'_request.csr','rb').read()
        csr = x509.load_pem_x509_csr(pem_csr, default_backend())
        pem_cert = open('ANCE_cert', 'rb').read()
        ca = x509.load_pem_x509_certificate(pem_cert, default_backend())
        pem_key = open('CLEF_auth','rb').read()
        ca_key = serialization.load_pem_private_key(pem_key, password=bytes('rootroot', 'utf-8'), backend=default_backend())
        builder = x509.CertificateBuilder()
        builder = builder.subject_name(csr.subject)
        builder = builder.issuer_name(ca.subject)
        builder = builder.not_valid_before(datetime.datetime.now())
        builder = builder.not_valid_after(datetime.datetime.now()+datetime.timedelta(7))
        builder = builder.public_key(csr.public_key())
        builder = builder.serial_number(int(uuid.uuid4()))
        for ext in csr.extensions:
            builder.add_extension(ext.value, ext.critical)
        certificate = builder.sign(
                private_key=ca_key,
                algorithm=hashes.SHA256(),
                backend=default_backend()
                )
        with open('certificates/'+username+'.crt', 'wb') as f:
            f.write(certificate.public_bytes(serialization.Encoding.PEM))
        return certificate.public_bytes(serialization.Encoding.PEM)
    
    def verify_certificate(self, username, certif_string):
        with open('tmp/'+username+'.crt', 'wb') as f:
            f.write(certif_string)
        output = subprocess.check_output('openssl verify -CAfile ANCE_cert tmp/'+username+'.crt', shell=True)
        if (output[-3:-1]).decode('UTF-8') == 'OK':
            return True
        else:
            return False