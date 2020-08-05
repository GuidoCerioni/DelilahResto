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
4. Import [this file](./src/db/databaseQueries.js) in MySQL Admin. This will create the database and the tables. Some default data will also be added.

# Server init
1. Install [NodeJS](https://nodejs.org). To see if Node is installed, open the Windows Command Prompt, Powershell or a similar command line tool, and type
```bash
node -v
```
This should print the version number.
2. Clone this repository into your computer. Get to the folder you clone it into and install the npm dependencies. You can do that from your command line tool.
```bash
git clone https://github.com/GuidoCerioni/DelilahResto
cd DelilahResto
npm install
```
3. Start the server, also from your commnand line tool.
```bash
npm start
```

# Endpoints 
The endpoints are detailed in this YALM file (../documentation/swagger.yml) and they were designed following the OPEN API specifications. Import the file into the Swagger Editor (https://editor.swagger.io/#) for a better understanding of thte API endopoints. 

# Endpoints Testing
By importing the following file (../documentation/Delilah Resto.postman_collection.json) in Postman aplication you will be able to test all the endopoints. (Remember that some require role validation so you will have to include the correspondant token in the header authorization). 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/73852f9dcdb9706612d3)

[View documentation](https://app.swaggerhub.com/apis-docs/GuidoCerioni/Resto/1.0.0)

