const express = require("express");
const bodyParser = require("body-parser");

const server = express();

var dataBase = require("./DB/initialization");

/** Middlewares generales */
server.use(bodyParser.json());

/** Endpoints middlewares & helpers */
const cachtSqlError = (res, err) => {
  res.status(500).json({
    mensaje: "Ocurrió un error en la consulta SQL.",
    errStack: err,
  });
};
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

server.get("/users", (req, res) => {
  dataBase
    .query(`SELECT * FROM users`)

    .then((response) => res.status(200).json(response))

    .catch((err) => cachtSqlError(res, err));
});

server.listen(3000, () => {
  console.log("Express server working");
});
