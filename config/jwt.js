 
 require('dotenv').config();

 const   jwt     =   require('jsonwebtoken');
 const jwt_key   =   process.env.JWT_SECRET;

 module.exports = (data)=>{
   let token = jwt.sign(data, jwt_key, { expiresIn: 60*60*24*15 });    
   return token;    
 }