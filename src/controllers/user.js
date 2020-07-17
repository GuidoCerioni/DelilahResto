//  USERS ROUTES
const express = require("express");
const router = express.Router();

const dataBase = require("../db/config.js");

// Middlewares
//    jwt
const { adminRoute, generateToken } = require("../auth/jwt.js");
//    validations
const validations = require("../validations/validations.js");

/* General  error*/
const catchSqlError = (res, err) => {
  console.log(err);
  res.status(500).json({
    success: false,
    mensaje: "SQL error",
    errStack: err.original,
  });
};

//LOGIN user
router.post("/login", (req, res) => {
  dataBase
    .query(
      `SELECT * FROM users WHERE userName = :userName AND password = :password`,
      {
        replacements: {
          userName: req.body.userName,
          password: req.body.password,
        },
        type: dataBase.QueryTypes.SELECT,
      }
    )
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          success: false,
          error: "incorrect user-password",
        });
      } else {
        generateToken(req, res, response);
      }
    })
    .catch((err) => {
      catchSqlError(res, err);
    });
});

// GET all users
router.get("", adminRoute, (req, res) => {
  dataBase
    .query(`SELECT * FROM users`, {
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => catchSqlError(res, err));
});

// GET user by id
router.get("/:id", adminRoute, (req, res) => {
  dataBase
    .query("SELECT * FROM users WHERE id = :userid", {
      replacements: { userid: req.params.id },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => catchSqlError(res, err));
});

//POST new user
router.post("/register", validations.newUser, (req, res) => {
  //Check if the user already exist
  dataBase
    .query(`SELECT * FROM users WHERE email = :email`, {
      replacements: { email: req.body.email },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => {
      if (!response.length == 0) {
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
              newUser: { ...req.body },
            });
          })
          .catch((err) => catchSqlError(res, err));
      }
    })
    .catch((err) => catchSqlError(res, err));
});

module.exports = router;
