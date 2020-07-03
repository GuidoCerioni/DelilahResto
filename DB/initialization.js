/*  */
const Sequelize = require("sequelize");

const USERNAME = "root";

const PASSWORD = "";

const DATABASE = "delilahresto"; /* DATABASE name */

/* const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
}); */

// Option 1: Passing a connection URI
//const sequelize = new Sequelize("sqlite::memory:"); // Example for sqlite
//const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname"); // Example for postgres
const sequelize = new Sequelize("mysql://root:@127.0.0.1:3306/delilahresto"); // Example for postgres

sequelize
  .authenticate()
  .then(() => console.log("DB -Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
