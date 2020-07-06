//  USERS ROUTES
const express = require("express");

const router = express.Router();

var dataBase = require("../DB/initialization.js");
const { QueryTypes } = require("../DB/initialization.js");

const cachtSqlError = (res, err) => {
  res.status(500).json({
    mensaje: "Ocurrió un error en la consulta SQL.",
    errStack: err,
  });
};

// GET all users
router.get("/user", (req, res) => {
  dataBase
    .query(`SELECT * FROM users`, {
      type: QueryTypes.SELECT,
    })

    .then((response) => res.status(200).json(response))

    .catch((err) => cachtSqlError(res, err));
});

// GET user by id
router.get("/user/:id", (req, res) => {
  dataBase
    .query("SELECT * FROM users WHERE id = :userid", {
      replacements: { userid: req.params.id },
      type: QueryTypes.SELECT,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => cachtSqlError(res, err));
});

//POST new user
router.post("/user/register", (req, res) => {
  //Check if the user already exist
  dataBase
    .query(`SELECT * FROM users WHERE email = :email`, {
      replacements: { email: req.body.email },
      type: QueryTypes.SELECT,
    })
    .then((response) => {
      if (response) {
        res.status(401).json({
          error: "Email is already used",
          user: req.body,
        });
      } else {
        dataBase
          .query(
            `INSERT INTO users
            (id, userName, password, fullName, email, phoneNumber, address, isAdmin)
            VALUES
            (0, :userName, :password, :fullName, :email, :phoneNumber, :address, 0)
            `,
            { replacements: req.body }
          )
          .then((response) => {
            res.status(201).json({
              ...req.body,
              id: response[0],
            });
          })
          .catch((err) => cachtSqlError(res, err));
      }
    });
});

module.exports = router;
