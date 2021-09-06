

## Description

NestJS RestAPI Challenge. Simple database with users, addresses, cities and profiles

## Prerequisites
- Docker installed
- Docker Compose installed
- Postman
- Client MySQL (MySQL Workbench). Only for initial data load


## Installation

Download or clone the project in some directory and open cmd/bash in this directory. <br />
Execute ls/dir command and verify if exists "docker-compose.yml" file 

```bash
# Execute docker compose build for create images and wait it finish 
$ docker-compose build

# Execute docker compose up for create containers and wait it finish
$ docker-compose up

# Note: The app run in watchmode and could retry connect to database if it not is created yet
# The last message will must be "Nest application succesfully started"
```

## Running the app

### API Port
API port is 4000 locally

### DB Port and credentials
- DB (MySql) port is 4306 locally
- user: root
- pass:1234

### Initial City Table Data Load

Connect to database and execute the following script:
``` sql
INSERT INTO usuarios_db.city (name)
VALUES('Moron');

INSERT INTO usuarios_db.city (name)
VALUES('Haedo');

INSERT INTO usuarios_db.city (name)
VALUES('Nuñez');

COMMIT
```

## API Test

### Endpoints

http://localhost:4000

#### Description: 
If the server returns "Hola mundo2!", it is running succesfully 

#### Use POSTMAN for following endpoints

http://localhost:4000/user/create (POST)

#### RequestBody(JSON) example:
```json
{
    "username": "test",
    "password": "1234",
    "name": "Test - WorkOffice",
    "address": "Av Libertador 101",
    "cityId": 1
}
```

#### Description: 
Create user profile with sent data

#### Validations: 
- All field are required
- City exist
- If user not exist, it will be created
- If address not exist, it will be created
- If a profile with user and address given exist, it won't be created.

#### Successfull Response:
```json
{
    "message": "User succesfully created"
}
```

http://localhost:4000/user/login (POST)

#### RequestBody(JSON) example:
```json
{
    "username": "test",
    "password": "pass"
}
```

#### Description: 
Validate the credentials and return JWT token

#### Validations: 
- All field are required
- Credentiales are valid

#### Successfull Response Example:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMwOTY1Mzk0LCJleHAiOjE2MzA5NjU1MTR9.HJT5no0Os-qsJpLvipP2x9ppT3iz9Vw4qi8OO45YLF0"
}
```

http://localhost:4000/user/profile (GET)

#### Authorization Header:
The authorization header value will be the obtained token on login method

#### Description: 
Return a relevant user profile

#### Validations: 
- Token is valid. The token expires in 2 minutes.

#### Successfull Response Example:
```json
{
    "id": 1,
    "name": "Ezequiel Gomez - Dabove",
    "address": {
        "street": "Los Dabove2080",
        "city": "Moron"
    }
}
```

## Stopping the app

#### Open other console and write the following command:
```bash 
$ docker ps -a

# Note: The containers with followings names were created
api-challenge-main_apirest_1
api-challenge-main_mysqldb_1
```

#### Stop the containers
```bash 
$ docker container stop api-challenge-main_apirest_1
$ docker container stop api-challenge-main_mysqldb_1
```

#### Start the containers again

```bash 
$ docker start api-challenge-main_mysqldb_1
$ docker start api-challenge-main_apirest_1

Note: The watch mode will not be executed
Alternative: Remove the containers and execute docker-commpose up again.
```


- Author - [Ezequiel Gomez]
- Website - [g.ezequiel90@gmail.com]
- Linkedin - [www.linkedin.com/in/ezequiel-gómez-639415127]

