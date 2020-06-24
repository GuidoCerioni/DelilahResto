const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const server = express();
const dataBase = new sequelize("mysql://root:@127.0.0.1:3306/clase49");



server.listen(3000, () => {
  console.log("Working");
});