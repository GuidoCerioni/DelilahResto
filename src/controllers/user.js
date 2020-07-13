//  USERS ROUTES
const express = require("express");
const router = express.Router();

var dataBase = require("../db/config.js");

/* JWT LOGIN */
const jwt = require("jsonwebtoken");
const secret = "sarasa";

/* General  error*/
const cachtSqlError = (res, err) => {
  res.status(500).json({
    mensaje: "SQL query error",
    errStack: err,
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
      /* if there isnt a Response, return error. if there is, return the JWT-token */
      if (response == 0) {
        res.status(401).json({ error: "incorrect user-password" });
      } else {
        const payload = {
          id: response[0].id,
          isAdmin: response[0].isAdmin,
        };
        const options = {
          expiresIn: 60000,
        };

        const token = jwt.sign(payload, secret, options);
        
        res.status(200).send({
          userName: response[0].userName,
          token: token,
        });
      }
    });
});

// GET all users
router.get("", (req, res) => {
  dataBase
    .query(`SELECT * FROM users`, {
      type: dataBase.QueryTypes.SELECT,
    })

    .then((response) => res.status(200).json(response))

    .catch((err) => cachtSqlError(res, err));
});

// GET user by id
router.get("/:id", (req, res) => {
  dataBase
    .query("SELECT * FROM users WHERE id = :userid", {
      replacements: { userid: req.params.id },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => cachtSqlError(res, err));
});

//POST new user
router.post("/register", (req, res) => {
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
            (id, userName, password, fullName, email, phoneNumber, adress, isAdmin)
            VALUES
            (0, :userName, :password, :fullName, :email, :phoneNumber, :adress, 0)
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
