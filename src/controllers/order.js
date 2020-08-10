//  ORDERS ROUTES
const express = require("express");
const app = express();
const router = express.Router();

const dataBase = require("../db/config.js");

// Middlewares import
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
    body("id_paymentType")
      .isNumeric()
      .withMessage("must be a number (check payment types)"),
    body("address").isLength({ min: 5 }).withMessage("must be a valid address"),
  ],
  (req, res, next) => {
    /* payment type validation */
    if (!(req.body.id_paymentType > 0)) {
      return res.status(422).json({
        success: "false",
        errors: [
          {
            value: req.body.id_paymentType,
            msg: "out of range (check payment types)",
            param: "id_paymentType",
            location: "body",
          },
        ],
      });
    }

    /* object validations */
    let flag = 1;
    if (typeof req.body.products === "object") {
      req.body.products.forEach((element) => {
        for (const [key, value] of Object.entries(element)) {
          if (!(typeof key === "string" && typeof value === "number")) {
            flag = 0;
          }
        }
      });
    } else {
      return res.status(422).json({
        success: "false",
        errors: [
          {
            value: req.body.products,
            msg: "products must be an array",
            param: "products",
            location: "body",
          },
        ],
      });
    }
    if (flag) {
      next();
    } else {
      {
        return res.status(422).json({
          success: "false",
          errors: [
            {
              value: req.body.products,
              msg: "error in product object",
              param: "products",
              location: "body",
            },
          ],
        });
      }
    }
  },
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //controlling posible errors
      return res.status(422).json({ success: "false", errors: errors.array() });
    }

    //get USER ID from the token
    let userId;
    decodeToken(req.headers["access-token"], function (err, res) {
      // this callback function is called by lookup function with the result
      if (err) {
        throw err;
      } else {
        userId = res.id;
      }
    });

    //calculate order totalprice AND generate order description based on the products
    var totalPrice = 0;
    var description = [];
    req.body.products.forEach((product) => {
      const currentProduct = JSON.parse(app.locals.products).find(
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

        //creating response
        ({ id_paymentType, description, address, totalPrice } = replacements);

        var successResponse = {
          id_paymentType,
          description,
          address,
          totalPrice,
        };

        res.status(201).json({
          success: true,
          message: "Order created",
          order: { id: response[0], ...successResponse },
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
        res.status(422).json({
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
        res.status(422).json({
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

//get all products in array app.locals.products

dataBase
  .query(`SELECT * FROM products`, {
    type: dataBase.QueryTypes.SELECT,
  })
  .then((response) => {
    app.locals.products = JSON.stringify(response);
    console.log("products: " + app.locals.products);
  })
  .catch(() => {
    console.log("error");
  });

module.exports = router;
