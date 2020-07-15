const jwt = require("jsonwebtoken");
const { secret } = require("./s3cr3t.js");

module.exports = {
  adminRoute: function (req, res, next) {
    const token = req.headers["access-token"];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ mensaje: "Token inválida" });
        } else {
          if (decoded.isAdmin == 1) next();
        }
      });
    } else {
      res.send({
        mensaje: "Token no proveída.",
      });
    }
  },
  userRoute: function (req, res, next) {
    const token = req.headers["access-token"];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ mensaje: "Token inválida" });
        } else next();
      });
    } else {
      res.send({
        mensaje: "Token no proveída.",
      });
    }
  },
};
