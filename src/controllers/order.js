//  PRODUCT ROUTES
const express = require("express");
const router = express.Router();

const dataBase = require("../db/config.js");

const { adminRoute, userRoute, decodeToken } = require("../auth/jwt.js");

/* General  error*/
const catchSqlError = (res, err) => {
  console.log(err);
  res.status(500).json({
    success: false,
    mensaje: "SQL error",
    errStack: err.original,
  });
};

/* Create new order */
router.post("/create", userRoute, async function (req, res) {
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
  //console.log("productsFromDatabase2", productsFromDatabase);

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


  var replacements ={
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
      {replacements}
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
      //response
      var replacementsResponse ={
        id_paymentType,
        description,
        address,
        totalPrice
      }=replacements;
      res.status(201).json({
        success: true,
        message: "Order created",
        order: { id: response[0], ...replacementsResponse },
      });
    })
    .catch((err) => {
      catchSqlError(res, err);
    });

  /* dataBase
    .query(`SELECT * FROM products WHERE name=:name`, {
      replacements: {
        name: req.body.name,
      },
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => {
      
      if (!response.length == 0) {
        res.status(200).json({
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
    });*/
});

/* Edit product */
router.put("/edit", adminRoute, (req, res) => {
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
        res.status(200).json({
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
router.delete("/delete/:id", adminRoute, (req, res) => {
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
        res.status(200).json({
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
            res.status(200).json({
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

/* Read all products */
router.get("", userRoute, (req, res) => {
  dataBase
    .query(`SELECT * FROM products`, {
      type: dataBase.QueryTypes.SELECT,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => catchSqlError(res, err));
});

module.exports = router;
