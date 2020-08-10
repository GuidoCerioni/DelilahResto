/* DATABASE CONFIG */
const USERNAME = "root";
const PASSWORD = "";
const PORT = 3306;
const DATABASE_NAME = "delilahresto";

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  `mysql://${USERNAME}:${PASSWORD}@127.0.0.1:${PORT}/${DATABASE_NAME}`
);
sequelize.options.logging = false; //turn logging SQL queries off

sequelize
  .authenticate()
  .then(() =>
    console.log("Database connection has been established successfully.")
  )
  .catch((error) =>
    console.log({
      message: "Unable to connect to the database, check XAMPP",
      error: error.original,
    })
  );

module.exports = sequelize;
