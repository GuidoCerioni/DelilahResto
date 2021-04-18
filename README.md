# Delilah Restó 
API Rest built in NodeJS, using express and MySQL. This API is made to manage orders in a restaurant.

#### Features
- CRUD Products methods.
- CRUD Orders methods.
- User log in using Json Web Token
- Role validation

# MySQL set up
1. Install [XAMPP](https://www.apachefriends.org/index.html) to serve MySQL.
2. Start XAMPP and click on the `Start` button on Apache and MySQL.
3. Click on the `Admin` button on MySQL and check if you have an user called "root". Also check if the MySQL port is 3306. (If you want to use a different port or username/password, check [this file](./src/db/config.js).)
4. Import [this file](./src/db/databaseQueries.sql) in MySQL Admin. This will create the database and the tables. Some default data will also be added.

# Server init
1. Install [NodeJS](https://nodejs.org). To see if Node is installed, open the Windows Command Prompt, Powershell or a similar command line tool, and type
```bash
node -v
```
This should print the version number.

2. Clone this repository into your computer. Get to the folder you clone it and install the npm dependencies. You can do that from your command line tool.
```bash
git clone https://github.com/GuidoCerioni/DelilahResto
cd C:/.../.../DelilahResto
npm install
```

3. Start the server, also from your command line tool.
```bash
npm start
```

# Endpoints documentation
Check the available endpoints [__here__](https://app.swaggerhub.com/apis-docs/GuidoCerioni/Resto/1.0.0) (this is a swagger documentation, the [YAML file](./documentation/DelilahRestoAPI.yaml) is in the repo just in case).

# Test
To test the endpoints you should have both MySQL and the server started. The API base url is `localhost:3000/`.

Anyways, I recomend you use __Postman__. By clicking here [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/23a3a827e5984806c6a0) you will be able to import the colection with all the API endpoints with preloaded data for testing.

Remember you need a __token__ in order to use the API. You can get it from the user login endpoint. There is one admin user preloaded (username: admin password: admin123).






