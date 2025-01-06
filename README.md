# Description
This is a full-stack application for managing cars, built with a React front-end and a Node.js/Express back-end. It uses Redux for state management and communicates with the server via RESTful API.
This app allows users to manage a car inventory, including adding, viewing, and editing car details. It demonstrates the use of modern web technologies for secure and scalable applications.

# Features
User authentication (JWT-based).
Secure session management with refresh tokens.
View, add and edit cars in the database.
Persistent data storage using a Dockerized Microsoft SQL Server database.

# Getting started with Cars web app

# Requirements
Make sure you have the following installed:
Node.js (v16+)
npm or yarn
Docker (for the database)
SQL Server management tool if you want to interact with the database directly.

Directions are for npm but yarn works just the same.

### For local development and testing 
## BACKEND

# Navigate to the backend directory: 
cd backend

# Install dependencies: 
npm i

# Create a .env file with the following:
JWT_SECRET=yahavSecretProj
JWT_REFRESH_SECRET=yahavSecretProjRefresher
CARS_DB_USER_CONFIG=SA
CARS_DB_PASSWORD_CONFIG=yourStrong(!)Password
CARS_DB_PORT=1433
MSSQL_HOST=localhost
MSSQL_DB=carsDataBase
MODE_ENV=development

# Run one of the following 
npm run start for production
npm run start-dev for development

## Database (Dockerized Microsoft SQL Server)

## Pull the DB Image
# cmd script:
docker pull ghcr.io/yahavfreeman/cars:latest

## Run the DB Image
# cmd script:
docker run -d -p 1433:1433 ghcr.io/yahavfreeman/cars:latest 

# Verify the container is running cmd prompt command:

docker ps

## Frontend
# Navigate to the root directory, and from there to frontend/cars-tw directory
cd frontend/cars-tw

# Install dependencies: 
npm i

# Available Scripts:
npm run start - Runs the app in the development mode.
npm run build - Builds the app for production to the `build` folder.
npm run test -  Launches the test runner in the interactive watch mode.
npm run eject - Removes the single build dependency from your project.

# To start the frontend server run the script:
npm run start

# Open your browser and navigate to:
http://localhost:3000 

## Dockrized app initiation

# To get started with the Dockerized version of the app, follow these steps:

# Prerequisites

# Ensure you have Docker and Docker Compose installed on your system. If not, follow the installation guides:

- Install Docker
- Install Docker Compose

## 1. Clone the Repository

# Clone this repository to your local machine:

# https cmd prompt: 
git clone https://github.com/yahavFreeman/cars.git

## Start the docker containers

# cmd prompt
docker-compose up --build

## Run the applicaion

# app runs on:
http://localhost:80

## Stop the containers

# cmd prompt:
docker-compose down




## JWT token generation
In order to generate a refresh token and an access token, all you have to do is log in.

# login process
The user authenticates himself, and then receives two tokens, one short term access token which is being stored in the app's stored data, which is harder to access, and in minimal time, making it hard to penetrate and get the access token. and another one, a long term refresh token, which is being saved as an http only cookie, meaning he is accessible only for the backend. the refresh token is used for verifying the user authentication in the backend when the access token is invalid, then the backend generates a new access token so the user can keep on making requests that require user authentication without having to log in for the whole duration of the refresh token cookie's life span. the refresh token is the backend's responsibility and the access token is the frontend's resposibility to manage.

# JWT token generation and verification
Creating a JWT token using jsonwebtoken is implemented by the line: const refreshToken = jwt.sign({data: loggedUser,}, process.env.JWT_REFRESH_SECRET, // value in README.md file { expiresIn: "2 days",}); here we see that the data we encrypt is the logged user, the secret over which the verification and encryption will be based upon is stored in the .env file and the toke will expire in 2 days. This means that the token now holds the data of the user, not the backend, the backend doesn't have to go and look for the user in a stored data, this means we can have a single token for several servers, all the servers will need is just the same verification secret, and they will be able to authenticate the user by the same token, lets elaborate this with an example.

An example of how a JWT looks like and it's structure is: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
it has three parts separated by dots, the first part is the header which holds the algorithm and the token type, the next part is the payload data, in our example it's the loggedUser data, and the last part is the verification signature, that allows the verify function to know if the token got tampered with. this part has the secret we used to store the token with. the way it does it, is by using the algorithm specified in the header and encoding the two first parts together using the provided secret key. the output is the third section, which then is being compared to the JWT tokens coming from the user, if the last part in the JWT by the user doesn't match, it is invalid. 

The refresh token is valid for two days, so you won't have to log in during that time frame.
The access token is generated for fifteen minutes.

Points to note, for enhanced security, consider implementing token rotation, where each refresh generates a new refresh token.

Current implementation of user authentication is as minimal as possible without a database storage, for the purpose of showcasing JWT alone.
In order to make the refresh and access tokens invalid, just press the logout button in the app's header.

# logout process
The backend removes the refresh token cookie and the frontend removes the access token.

### API Documentation
# Get All Cars
Endpoint:
GET /cars

Description:
Retrieves a list of all cars in the database.

Headers:

Authorization: Bearer <access_token> (required)

Response example: [
  {
    "id": 1,
    "make": "Toyota",
    "model": "Corolla",
    "year": 2020,
    "price": 15000
  },
  {
    "id": 2,
    "make": "Honda",
    "model": "Civic",
    "year": 2019,
    "price": 14000
  }
]

# Upsert Car
Endpoint:
POST /cars 

Description:
Creates a new car or updates an existing car based on the id provided.

Headers:
Authorization: Bearer <access_token> (required)

Body (JSON):

Car creation example: 
{
  "id": null,
  "make": "Ford",
  "model": "Focus",
  "year": 2021,
  "price": 20000
}

Adding a car example:
{
  "id": 1,
  "make": "Ford",
  "model": "Fusion",
  "year": 2021,
  "price": 22000
}

Response example: {
    "id": 1,
    "make": "Ford",
    "model": "Fusion",
    "year": 2021,
    "price": 22000
  }

# Login
Endpoint:
POST /auth/login

Description:
Authenticates a user and provides an access token and refresh token.

Body (JSON) example:
{
  "username": "testuser",
  "password": "password123"
}

Response example:{
  "ID": 1
  "username": "testuser",
  "accessToken": "<jwt_access_token>",
}
  "refreshToken": "<jwt_refresh_token>" added to the browser cookies

# Logout
Endpoint:
POST /auth/logout

Description:
Invalidates the user's refresh token by removing it from the server.

Response:

Status 200 (OK):
{
    "msg": logged out successfully
}

Status 500 (Internal Server Error):
{
    "err": Failed to logout
}



