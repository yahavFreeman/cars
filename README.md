# Description
This is a full-stack application for managing cars, built with a React front-end and a Node.js/Express back-end. It uses Redux for state management and communicates with the server via RESTful API.

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
The refresh token is valid for two days, so you won't have to log in in that period.
The access token is generated for fifteen minutes.
Current implementation of user authentication is as minimal as possible without a database storage, for the purpose of showcasing JWT alone.
In order to make the refresh and access tokens invalid, just press the logout button in the app's header.