/* SERVER */
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const path = require("path");

/** Middlewares generales */
app.use(bodyParser.json());

// ROUTES:
// _users
app.use("/user", 
  require(path.join(__dirname, "src/controllers/user.js"))//controller
);

/**_products @TODO 
app.use("/product",
  require(path.join(__dirname, "src/controllers/product.js"))//controller
);*/

/**_orders @TODO 
app.use("/order",
  require(path.join(__dirname, "src/controllers/order.js"))//controller
);*/

//Any requested path that do not exist will be a 404
app.all("*", (req, res) => {
  res.status(404).json({ error: "Incorrect path" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
