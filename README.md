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
SQL Server management tool (e.g., Azure Data Studio or SQL Server Management Studio) if you want to interact with the database directly.

Directions are in npm but yarn works just the same.

### BACKEND

Navigate to the backend directory: 
## cd /backend

Install dependencies: 
## npm i

Create a .env file with the following:
## JWT_SECRET=yahavSecretProj
## JWT_REFRESH_SECRET=yahavSecretProjRefresher
## CARS_DB_USER_CONFIG=sa
## CARS_DB_PASSWORD_CONFIG=yourStrong(!)Password

Run one of the following 
## npm run start for production
## npm run start-dev for development

### Database (Dockerized Microsoft SQL Server)

Pull the Microsoft SQL Server Docker image cmd prompt command:

## docker pull mcr.microsoft.com/mssql/server:2019-latest

Run the Docker container cmd prompt command:
## docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong(!)Password" -e "MSSQL_PID=Express" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest

Verify the container is running cmd prompt command:

## docker ps

Connect your backend to this database using the credentials specified in .env.

### Frontend
Navigate to the frontend/cars-tw directory
## cd /frontend/cars-tw

Install dependencies: 
## npm i

Available Scripts:
## npm run start - Runs the app in the development mode.
## npm run build - Builds the app for production to the `build` folder.
## npm run test -  Launches the test runner in the interactive watch mode.
## npm run eject - Removes the single build dependency from your project.

To start the frontend server run the script:
## npm run start

Open your browser and navigate to:
## http://localhost:3000 

### JWT token generation
In order to generate a refresh token and an access token, all you have to do is log in.
The refresh token is valid for two days, so you won't have to log in in that period.
The access token is generated for fifteen minutes.
Current implementation of user authentication is as minimal as possible without a database storage, for the purpose of showcasing JWT alone.
In order to make the refresh and access tokens invalid, just press the logout button in the app's header.


