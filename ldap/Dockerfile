FROM python:3.9.2 AS ldap-build

RUN apt-get update -y && \ 
    apt-get install -y libsasl2-dev python-dev libldap2-dev libssl-dev && \
    python -m pip wheel --wheel-dir=/tmp python-ldap==3.3.1

# There are no official binaries for python-ldap
# So you have to build it yourself using some development packages
# I'm doing this muti-stage building to avoid having the development packages in the final image

FROM python:3.9.2
COPY --from=ldap-build /tmp/*.whl /tmp
RUN python -m pip install /tmp/*.whl

CMD tail -f /dev/null