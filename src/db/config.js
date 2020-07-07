/* DATABASE */
/*const USERNAME = "root";
const PASSWORD = "";
const DATABASE = "delilahresto";  DATABASE name 

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
}); */

const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@127.0.0.1:3306/delilahresto");
sequelize
  .authenticate()
  .then(() => console.log("DB -Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
