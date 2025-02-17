# Volunteer Portal

## Description:
This is a simple web application that allows users to track their volunteer hours. Users are able to sign-up and login into the application to store their entries in the add selection. 

## Development

Set up: npm install

In Express > index.d.ts, Change interface User {} to

interface User {
    id: Number,
    username: String,
}

Set up Database: 
 * Have PostgresSQL installed and run setup-database.sql into the SQL Query 

Compile Code: npx tsc

Build code: npm run-script build

Run Development Code: npm run dev

Run Production Code: npm start *Note: This is in development*
