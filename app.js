 const  express  =  require('express');
 const  social   =  require('./routes/social');
 const    app    =  express();
 
 app.use(express.json());
 app.use('/',social);
 app.get('/',(req,res)=>{
   return res.send('We Are Connected');
 });

 module.exports = app;