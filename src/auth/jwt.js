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
  generateToken: function (req, res, response) {
    const payload = {
      id: response[0].id,
      isAdmin: response[0].isAdmin,
    };
    const options = {
      expiresIn: 60000,
    };

    const token = jwt.sign(payload, secret, options);

    res.status(200).send({
      success: true,
      userName: response[0].userName,
      accesstoken: token,
    });
  },
};
