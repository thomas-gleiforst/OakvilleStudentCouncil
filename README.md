# OakvilleStudentCouncil

Official application for the Student Council organization at Oakville High School.

## Tech Stack
### App
Built with React Native

### Backend
Built with Express and TypeORM
Uses PostgreSQL for the database

## Getting started
### Requirements

This project is split into two parts, one for the app and one for the backend. Go to the respective folder for each project and there will be a more detailed README for each project.

* NodeJS
* Yarn package manager
* ESLint and Prettier extensions for your IDE
  * ESLint helps detect syntax errors, and Prettier helps format your code and make it consistent

## Backend API Documentation

Coming soon via Postman!


## Frontend Setup

Coming soon!

## Backend Setup

### Database

1. Log into Postgres. Default user is postgres.

```
# Windows
psql -U postgres

# MacOS/Linux
sudo psql -U postgres
```

2. Create the dev database environment inside the psql environment.

```
CREATE DATABASE ohsDB;
CREATE USER ohsDev WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE ohsDB TO ohsDev;
```

3. Quit psql and log into the database as the new user to make sure it works.
```
\q
# Log into the ohsdb database as the ohsdev user
psql -d ohsdb -U ohsdev
```

### Server

1. From the root of the project folder, go to the API folder and install the project dependencies.
```
cd api/
yarn install
```

2. Start the app!
```
yarn start
```
