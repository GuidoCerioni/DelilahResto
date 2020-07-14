const jwt = require("jsonwebtoken");
const secret = "sarasa";

module.exports={

adminRoute: function(req, res, next) {
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          if(decoded.isAdmin)    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 },
 userRoute: 
}