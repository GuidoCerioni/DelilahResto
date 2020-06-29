const USERNAME = "username";
const PASSWORD = "password";
/* DATABASE name */
const DATABASE = "database";

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "mariadb",
});

// Option 1: Passing a connection URI
const sequelize = new Sequelize("sqlite::memory:"); // Example for sqlite
const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname"); // Example for postgres

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
