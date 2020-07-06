const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var dataBase = require("./DB/initialization");

/** Middlewares generales */
app.use(bodyParser.json());

/** Endpoints middlewares & helpers */

const validarIdCancion = (req, res, next) => {
  const idCancion = parseInt(req.params.idCancion);
  if (!isNaN(idCancion)) {
    req.locals = {
      ...req.locals,
      idCancion,
    };
    next();
  } else {
    res.status(400).json({
      mensaje: "El id debe ser un numero.",
    });
  }
};

// ROUTES
app.use(require("./routes/users.js"));

app.listen(3000, () => {
  console.log("Express server working");
});
