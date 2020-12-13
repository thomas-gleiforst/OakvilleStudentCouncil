-- SQL database for users in Stuco project
-- SDELCilicious
-- Tommy Dong, Thomas Gleiforst, Ben Ellebrecht
-- WARNING: Use PostgreSQL
--C:\Users\benel\Documents\Databases Project\OakvilleStudentCouncil-1

CREATE DATABASE ohsDB;
CREATE USER ohsDev WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE ohsDB to ohsDev;

-- Create tables
create table if not exists Admins(
email CHAR(80) PRIMARY KEY,
adminPass VARCHAR(1024) NOT NULL, 
firstName CHAR(80) NOT NULL,
middleName CHAR(80),
lastName CHAR(80) NOT NULL,
joinDate date NOT NULL CHECK (joinDate <= GETDATE()),
loginDate date NOT NULL CHECK (loginDate >= joinDate)
);

create table if not exists Students(
email CHAR(80) PRIMARY KEY,
stuPass VARCHAR(1024) NOT NULL,
firstName CHAR(80) NOT NULL,
middleName CHAR(80),
lastName CHAR(80) NOT NULL,
joinDate date NOT NULL CHECK (joinDate <= GETDATE()),
loginDate date NOT NULL CHECK (loginDate >= joinDate),
points SMALLINT NOT NULL DEFAULT 0 CHECK (points > -1)
);

create table if not exists Events(
eventID VARCHAR PRIMARY KEY,
eventName VARCHAR(80) NOT NULL,
event_desc VARCHAR(2048)
);

create table if not exists Event_Dates(
eventID SMALLINT REFERENCES Events(eventID),
eventDate CHECK (date >= GETDATE()),
CONSTRAINT EventDatePK PRIMARY KEY (eventID, eventDate)
);

create table if not exists Locations(
name VARCHAR(255) NOT NULL,
address VARCHAR(255) NOT NULL,
room SMALLINT NOT NULL,
eventID VARCHAR,
CONSTRAINT LocationsPK PRIMARY KEY (address, room, eventID)
);

create table if not exists QR_Codes(
pointValue SMALLINT,
eventID SMALLINT REFERENCES Events(eventID),
CONSTRAINT QRCodePK PRIMARY KEY (pointValue, eventID)
);

create table if not exists Attends(
email CHAR(80) REFERENCES Students(email),
eventID SMALLINT,
CONSTRAINT event_ref FOREIGN KEY (eventID) REFERENCES Events(eventID),
CONSTRAINT AttendsPK PRIMARY KEY (email, eventID)
);

/*DROP TABLE Admins;
DROP TABLE Event_Dates;
DROP TABLE QR_Codes;
DROP TABLE Attends;
DROP TABLE Locations;
DROP TABLE Events;
DROP TABLE Students;*/

