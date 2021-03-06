# OHS StuCo App API

## Setup
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

### Backend setup

1. From the root of the project folder, go to the API folder and install the project dependencies.
```
cd api/
yarn install
```

2. Start the app!
```
yarn start
```
