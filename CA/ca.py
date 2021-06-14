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


# AUTH_key : authority key
# to generate authority key : openssl genrsa -out AUTH_key -des3 4092


# AUTH_cert : authority certif
# to generate authority certificate : openssl req -new -x509 -days 3650 -key AUTH_key -out AUTH_cert


def create_certificate(username):

    # we simulate a key sent by the user
    key = rsa.generate_private_key( public_exponent=65537,key_size=2048,backend=default_backend())

    # Generate a Certificate Signing Request
    csr = x509.CertificateSigningRequestBuilder().subject_name(x509.Name([
    x509.NameAttribute(NameOID.COUNTRY_NAME, u"TN"),
    x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, u"Centre Urbain Nord"),
    x509.NameAttribute(NameOID.LOCALITY_NAME, u"INSAT"),
    x509.NameAttribute(NameOID.ORGANIZATION_NAME, username),
    x509.NameAttribute(NameOID.COMMON_NAME, username+'@insat.com'),
    ])).add_extension(
    x509.SubjectAlternativeName([x509.DNSName(username+'@insat.com')]),critical=False,
    ).sign(key, hashes.SHA256(), default_backend()) # Sign the CSR with the user key

    # Import the authority certificate and private key
    pem_cert = open('AUTH_cert', 'rb').read()
    pem_key = open('AUTH_key','rb').read()
    ca = x509.load_pem_x509_certificate(pem_cert, default_backend())
    ca_key = serialization.load_pem_private_key(pem_key, password=bytes('rootroot', 'utf-8'), backend=default_backend())
    
    # we build the the x509 certificate
    builder = x509.CertificateBuilder()
    builder = builder.subject_name(csr.subject)
    builder = builder.issuer_name(ca.subject)
    builder = builder.not_valid_before(datetime.datetime.now())
    builder = builder.not_valid_after(datetime.datetime.now()+datetime.timedelta(7))
    builder = builder.public_key(csr.public_key())
    builder = builder.serial_number(int(uuid.uuid4()))
    for ext in csr.extensions:
        builder.add_extension(ext.value, ext.critical)

    # we create the x509 certificate
    certificate = builder.sign(private_key=ca_key,algorithm=hashes.SHA256(),backend=default_backend())

    # we simulate saving the certificate in the LDAP server
    with open('dummy_ldap/'+username+'.crt', 'wb') as f:
        f.write(certificate.public_bytes(serialization.Encoding.PEM))

    print('certificate generated and saved')


def get_certificate(username):

    # We simulate fetching the certificate from the LDAP server
    fetched_certif = open('dummy_ldap/'+username+'.crt', 'rb').read()

    # Here we return the certificate to the user
    print(fetched_certif.decode())



create_certificate("ee")
# get_certificate("ansnoussi")