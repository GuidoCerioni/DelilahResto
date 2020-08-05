/* SERVER */
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");

var jwtdecoder = require("./src/auth/jwt.js");

/** Middlewares generales */
app.use(bodyParser.json());

/* cors */
app.use(cors());

// ROUTES:
// _users

app.use("/user", require(path.join(__dirname, "src/controllers/user.js")));

// _products
app.use(
  "/product",
  require(path.join(__dirname, "src/controllers/product.js"))
);

// _orders
app.use("/order", require(path.join(__dirname, "src/controllers/order.js")));

//Any requested path that do not exist will be a 404
app.all("*", (req, res) => {
  res.status(404).json({ error: "Incorrect method/path" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
