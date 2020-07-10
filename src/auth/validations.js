
const express = require("express");
const router = express.Router();

var dataBase = require("../db/config.js");

const jwt= require("jsonwebtoken");
/** JWT LOGIN */
const secret="sarasa";

router.post("/login",(req,res)=>{
    sequelize
    .query(`SELECT * FROM users WHERE userName = :userName AND password = :password`, {
        replacements: { 
            userName: req.body.userName,
            password: req.body.password},
        type: sequelize.QueryTypes.SELECT,
      })
      .then((response)=>{
          console.log(response);
        if((response.lenght)==1){
            res.status(405).json({error: "incorrect user-password"})
        }else{
            const payload = {
                name: 'John',
                surname: 'Smith',
                username: 'john.smith',
                permissions: ['USER', 'ADMIN'],
            };
            const options = {
                expiresIn: 60000,
            };
            const token = jwt.sign(payload, secret, options);
            res.status(201).send({ token });            
       }})
});

function checkAdmin(req,res,next){
    
}

module.exports = router;
  