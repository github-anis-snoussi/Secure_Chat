# GL4_Secure_Chat
Projet Protocoles de sécurité GL4

## Overview

![Architecture Description](./overview.drawio.svg)

## How to start
I have tried sooo many variations that I have conflicts when starting docker containers, that's why I need to delete the containers and volumes each time :
- `sudo docker rm  $(sudo docker ps -a -q)` 
- `sudo docker volume rm $(sudo docker volume ls -q)`

After that : 


1. Start the authentication services

    ```bash
    sudo docker-compose up ldap phpldapadmin database adminer
    ```

   - **phpLDAPAdmin** (LDAP management) will be available at `https://localhost:8081`
   - **adminer** (PostgreSQL management) will be available at `http://localhost:8082`


2. Create your first user by accessing phpLDAPAdmin at `https://localhost:8081`

    - login with DN: `cn=admin,dc=insat,dc=com` Password: `adminpwd`
    - create a `Generic : Posix Group` in `dc=insat,dc=com` named `Users`
    - create a `Generic : User Account` with a GID Number `Users`

3. NGINX reverse-proxy

    We are using NGINX as a reverse proxy so we can have a unique endpoint for our app and API. Else, we would have to open two endpoints : one for the app, the other for the API.

    ```bash
    sudo docker-compose up --build -d nginx
    ```

    > NGINX will auto restart until you have started the app and API below.

4. Run the API

    The database will be automatically set-up thanks to Flask Migrate and any future modification brought to [models](./api/app/src/model) will be automatically applied when the API is **restarted**.

    You might wait some time before the database get updated after starting the API :

    ```bash
    sudo docker-compose up --build -d api
    ```

    > For development, go to [`http://localhost:5000`](http://localhost:5000) to access the API documentation

5. Run the web app

    ```bash
    # Expect several minutes for first launch (npm install)
    sudo docker-compose up --build -d app
    ```

    > :information_source: If you want to add a NPM package, just stop & re-launch `docker-compose up app`.

    Open the app at [`http://localhost:8080`](http://localhost:8080)