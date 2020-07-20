//  ORDERS ROUTES
const express = require("express");
const router = express.Router();

const dataBase = require("../db/config.js");

// Middlewares
//    jwt
const { adminRoute, userRoute, decodeToken } = require("../auth/jwt.js");
//    validations
const { body, validationResult } = require("express-validator");

/* General  error*/
const catchSqlError = (res, err) => {
  console.log(err);
  res.status(500).json({
    success: false,
    mensaje: "SQL error",
    errStack: err.original,
  });
};

/* GET all orders */
router.get("", adminRoute, (req, res) => {
  dataBase
    .query(`SELECT * FROM orders ORDER BY date DESC`, {
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => catchSqlError(res, err));
});

/* Create new order */
router.post(
  "/create",
  userRoute,
  //express-validator middleware
  [
    body("address").isLength({ min: 7 }).withMessage("must be a valid address"),
  ],
  (req, res, next) => {
    if (typeof (req.product) === 'object') {
      for (const [key, value] of Object.entries(req.product)) {
        console.log(`${key}: ${value}`);
        if(typeof key === 'string')
      }
      if(typeof tamano === 'number')
    }

  }
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //controlling posible errors
      return res.status(422).json({ errors: errors.array() });
    }

    //get USER ID from the token
    var userId;
    decodeToken(req.headers["access-token"], function (err, res) {
      // this callback function is called by lookup function with the result
      if (err) {
        throw err;
      } else {
        userId = res.id;
      }
    });

    //get all products in array productsFromDatabase
    var productsFromDatabase = [];
    await dataBase
      .query(`SELECT * FROM products`, {
        type: dataBase.QueryTypes.SELECT,
      })
      .then((response) => {
        productsFromDatabase = response;
      })
      .catch((err) => {
        catchSqlError(res, err);
      });

    //calculate order totalprice AND generate order description based on the products
    var totalPrice = 0;
    var description = [];
    req.body.products.forEach((product) => {
      const currentProduct = productsFromDatabase.find(
        (prod) => prod.id === product.id
      );
      totalPrice = totalPrice + currentProduct.price * product.quantity;
      description.push(`${product.quantity}x${currentProduct.name}`);
    });
    description = description.join(", ");

    var replacements = {
      id_user: userId,
      id_paymentType: req.body.id_paymentType,
      state: "new",
      description: description,
      address: req.body.address,
      totalPrice: totalPrice,
    };

    dataBase
      .query(
        `INSERT INTO orders
        (id_user, id_paymentType, state, description, address, totalPrice)
      VALUES
        (:id_user, :id_paymentType, :state, :description, :address, :totalPrice)`,
        { replacements }
      )
      .then((response) => {
        req.body.products.forEach((product) => {
          dataBase.query(
            ` INSERT INTO orders_products
              (id_order, id_product, productQuantity)
            VALUES
              (:id_order, :id_product, :productQuantity)`,
            {
              replacements: {
                id_order: response[0],
                id_product: product.id,
                productQuantity: product.quantity,
              },
            }
          );
        });

        var replacements = {
          id_user: userId,
          id_paymentType: req.body.id_paymentType,
          state: "new",
          description: description,
          address: req.body.address,
          totalPrice: totalPrice,
        };

        //response
        ({ id_paymentType, description, address, totalPrice } = replacements);

        var replacementsResponse = {
          id_paymentType,
          description,
          address,
          totalPrice,
        };

        res.status(201).json({
          success: true,
          message: "Order created",
          order: { id: response[0], ...replacementsResponse },
        });
      })
      .catch((err) => {
        catchSqlError(res, err);
      });
  }
);

/* Edit order */
router.put("/edit", adminRoute, (req, res) => {
  dataBase
    .query(`SELECT * FROM orders WHERE id=:id`, {
      replacements: {
        id: req.body.id,
      },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => {
      /* if there isnt a Response, return error. */
      if (response.length == 0) {
        res.status(200).json({
          success: false,
          error: "Incorrect ID",
        });
      } else {
        dataBase
          .query(
            `UPDATE orders SET
            id_paymentType=:id_paymentType, state=:state, description=:description, address=:address, totalPrice=:totalPrice
            WHERE id=:id`,
            {
              replacements: {
                id: req.body.id,
                id_paymentType: req.body.id_paymentType,
                state: req.body.state,
                description: req.body.description,
                address: req.body.address,
                totalPrice: req.body.totalPrice,
              },
            }
          )
          .then((response) => {
            res.status(200).json({
              success: true,
              message: "Order updated",
              editedOrder: { id: response[0], ...req.body },
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

/* Delete order */
router.delete("/delete/:id", adminRoute, (req, res) => {
  let deletedOrder = {};
  dataBase
    .query(`SELECT * FROM orders WHERE id=:id`, {
      replacements: {
        id: req.params.id,
      },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => {
      deletedOrder = response[0];
      /* if there isnt a Response, return error. */
      if (response.length == 0) {
        res.status(200).json({
          success: false,
          error: "Incorrect ID",
        });
      } else {
        dataBase
          .query(`DELETE from orders WHERE id=:id`, {
            replacements: {
              id: req.params.id,
            },
          })
          .then((response) => {
            res.status(200).json({
              success: true,
              message: "Order deleted",
              deletedOrder,
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

module.exports = router;
