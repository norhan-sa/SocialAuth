 require('dotenv').config();

 const   app        =    require('./app');
 const  server      =    require('http').createServer(app);
 const    io        =    require('socket.io')(server); 
 const    db        =    require('./config/db');
 let   {main_chat}  =    require('./chat');
 let   jwt_key      =    process.env.JWT_SECRET; 

 let chat_nsp = io.of('/messages');
 main_chat(chat_nsp);
 
 let  port    =    process.env.PORT || 3000; 

 server.listen(port,()=>{
    console.log(`Listening to port : ${port}`);
 });