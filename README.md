# Storefront Backend Project

## Getting Started
To get started, clone this repo and run yarn or npm i in your terminal at the project root.

## Steps to Run The project

### 1.  Download The dependencies 
Run yarn or npm i in your terminal at the project root.

### 2.  Env File
Create a .env file in the project root and add the following environment variables

- POSTGRES_HOST=
- POSTGRES_DB=
- POSTGRES_USER=
- POSTGRES_PASSWORD=

- POSTGRES_HOST_TEST=
- POSTGRES_DB_TEST=
- POSTGRES_USER_TEST=
- POSTGRES_PASSWORD_TEST=

- BCRYPT_PASSWORD=
- SALT_ROUND=
- TOKEN_SECRET=

- ENV=

### 2.  DB Creation and Migrations
This Project Uses docker to run an image of posgres database .. so first you need to run this image using
- docker-compose up

To Manipulate dev database set ENV=dev in .env file run the following command by order
- npm run dev-startdb

To Fill the database tables with initial values run the following command
- npm run dev-setupdb

To Reset the database run the following command
- npm run dev-resetdb

### 3. Models and API endpoints

Check REQUIREMENTS.md

### 4. Running The Project

Run npm run start, then fetch the endpoints stated in the REQUIREMENTS.md on port 3000

### 5. Running The Test

To run tests for routes run npm run test-routes

### 6. Port information

Database port is 5432. 
Endpoints port is 3000. 
