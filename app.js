 const  express  =  require('express');
 const  social   =  require('./routes/social');
 const    app    =  express();
 
 app.use('/',social);

 module.exports = app;