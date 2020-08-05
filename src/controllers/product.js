//  PRODUCT ROUTES
const express = require("express");
const router = express.Router();

const dataBase = require("../db/config.js");

// Middlewares import
//    jwt
const { adminRoute, userRoute } = require("../auth/jwt.js");

/* General  error*/
const catchSqlError = (res, err) => {
  console.log(err);
  res.status(500).json({
    success: false,
    mensaje: "SQL error",
    errStack: err.original,
  });
};
/* Create new product */
router.post("", adminRoute, (req, res) => {
  dataBase
    .query(`SELECT * FROM products WHERE name=:name`, {
      replacements: {
        name: req.body.name,
      },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => {
      /* if there isnt a Response, return error. */
      if (!response.length == 0) {
        res.status(422).json({
          success: false,
          error: "Name is used",
        });
      } else {
        dataBase
          .query(
            `INSERT INTO products
              (id, name, price, description, inStock)
            VALUES
              (0, :name, :price, :description, :inStock)`,
            {
              replacements: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                inStock: req.body.inStock,
              },
            }
          )
          .then((response) => {
            res.status(201).json({
              success: true,
              message: "Product created",
              product: { id: response[0], ...req.body },
            });
          })
          .catch((err) => {
            catchSqlError(res, err);
          });
      }
    })
    .catch((err) => {
      catchSqlError(res, err);
    });
});

/* Edit product */
router.put("", adminRoute, (req, res) => {
  dataBase
    .query(`SELECT * FROM products WHERE id=:id`, {
      replacements: {
        id: req.body.id,
      },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => {
      /* if there isnt a Response, return error. */
      if (response.length == 0) {
        res.status(422).json({
          success: false,
          error: "Incorrect ID",
        });
      } else {
        dataBase
          .query(
            `UPDATE products SET
              name= :name, price= :price, description= :description, inStock= :inStock
            WHERE id=:id`,
            {
              replacements: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                inStock: req.body.inStock,
                id: req.body.id,
              },
            }
          )
          .then((response) => {
            res.status(200).json({
              success: true,
              message: "Product updated",
              editedProduct: { id: response[0], ...req.body },
            });
          })
          .catch((err) => {
            catchSqlError(res, err);
          });
      }
    })
    .catch((err) => {
      catchSqlError(res, err);
    });
});

/* Delete product */
router.delete("/:id", adminRoute, (req, res) => {
  let deletedProduct = {};
  dataBase
    .query(`SELECT * FROM products WHERE id=:id`, {
      replacements: {
        id: req.params.id,
      },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => {
      deletedProduct = response[0];
      /* if there isnt a Response, return error. */
      if (response.length == 0) {
        res.status(422).json({
          success: false,
          error: "Incorrect ID",
        });
      } else {
        dataBase
          .query(`DELETE from products WHERE id=:id`, {
            replacements: {
              id: req.params.id,
            },
          })
          .then((response) => {
            res.status(204).json({
              success: true,
              message: "Product deleted",
              deletedProduct,
            });
          })
          .catch((err) => {
            catchSqlError(res, err);
          });
      }
    })
    .catch((err) => {
      catchSqlError(res, err);
    });
});

/* Get all products */
router.get("", userRoute, (req, res) => {
  dataBase
    .query(`SELECT * FROM products`, {
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => catchSqlError(res, err));
});

module.exports = router;
