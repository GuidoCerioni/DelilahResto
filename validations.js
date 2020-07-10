const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@127.0.0.1:3306/delilahresto");
sequelize
  .authenticate()
  .then(() =>console.log("DB -Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));
/** Middlewares generales */
app.use(bodyParser.json());

const jwt= require("jsonwebtoken");
/** JWT LOGIN */
const secret="sarasa";
app.post("/login",(req,res)=>{
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

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  