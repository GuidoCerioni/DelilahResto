const jwt = require("jsonwebtoken");
const { secret } = require("./s3cr3t.js");

module.exports = {
  adminRoute: function (req, res, next) {
    const token = req.headers["access-token"];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Invalid token" });
        } else {
          if (decoded.isAdmin == 1) {
            next();
          } else {
            return res
              .status(200)
              .json({ msg: "You dont have permission for this request" });
          }
        }
      });
    } else {
      return res.status(401).json({ msg: "No token" });
    }
  },
  userRoute: function (req, res, next) {
    const token = req.headers["access-token"];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Invalid token" });
        } else next();
      });
    } else {
      res.send({
        msg: "No token",
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
  decodeToken: function (token, callback) {
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return false;
        } else {
          callback(null, decoded);
        }
      });
    }
  },
};
