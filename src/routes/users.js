//  USERS ROUTES
const express = require("express");
const router = express.Router();

var dataBase = require("../db/config.js");

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
      type: dataBase.QueryTypes.SELECT,
    })

    .then((response) => res.status(200).json(response))

    .catch((err) => cachtSqlError(res, err));
});

// GET user by id
router.get("/user/:id", (req, res) => {
  dataBase
    .query("SELECT * FROM users WHERE id = :userid", {
      replacements: { userid: req.params.id },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => cachtSqlError(res, err));
});

//POST new user
router.post("/user/register", (req, res) => {
  console.log(dataBase);
  //Check if the user already exist
  dataBase
    .query(`SELECT * FROM users WHERE email = :email`, {
      replacements: { email: req.body.email },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => {
      if (response.length) {
        res.status(409).json({
          success: false,
          error: "Email is already used",
          rejectedUser: req.body,
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
              success: true,
              ...req.body,
              id: response[0],
            });
          })
          .catch((err) => cachtSqlError(res, err));
      }
    });
});

module.exports = router;
