 
 const  express   =    require('express');
 const   app      =    require('./app');
 const   http     =    require('http').createServer(app);
 const    io      =    require('socket.io'); 
 let     port     =    process.env.PORT || 5000; 

 let chat_nsp = io.of('messages');
 

 http.listen(port,()=>{
    console.log(`Listening to port : ${port}`);
 });

   
