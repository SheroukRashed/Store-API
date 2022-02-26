# Storefront Backend Project

## Getting Started
To get started, clone this repo and run yarn or npm i in your terminal at the project root.

## Steps to Run The project

### 2.  Env File
Create a .env file in the project root and add the following environment variables

POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=

POSTGRES_HOST_TEST=
POSTGRES_DB_TEST=
POSTGRES_USER_TEST=
POSTGRES_PASSWORD_TEST=

BCRYPT_PASSWORD=
SALT_ROUND=
TOKEN_SECRET=

ENV=

### 2.  DB Creation and Migrations

To Manipulate dev database set ENV=dev in .env file run the following command by order

npm run dev-startdb
node addInitialUsers.mjs
node addInitialProducts.mjs
node addInitialOrders.mjs
node addInitialOrdersProducts.mjs

To Manipulate test database set ENV=test in .env file run the following command by order

npm run test-up 
node addInitialUsers.mjs
node addInitialProducts.mjs
node addInitialOrders.mjs
node addInitialOrdersProducts.mjs

### 3. Models and API endpoints

check REQUIREMENTS.md

### 4. Running The Project

run npm run start, the fetch the endpoints stated in the REQUIREMENTS.md on port 3000

### 5. Running The Test
