/* SERVER */
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;



/** Middlewares generales */
app.use(bodyParser.json());

// ROUTES
app.use(require("./src/routes/users.js"));

//Any requested path that do not exist will be a 404
app.all("*", (req, res) => {
  res.status(404).json({ error: "Incorrect path" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
