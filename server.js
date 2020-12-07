 
 require('dotenv').config();
 const   app        =    require('./app');
 const   http       =    require('http').createServer(app);
 const    io        =    require('socket.io')(http , { origins: '*:*'}); 
 const socketioJwt  =    require('socketio-jwt');
 const    db        =    require('./config/db');
 let   main_chat    =    require('./chat');
 let     port       =    process.env.PORT || 5000; 
 let   jwt_key      =    process.env.JWT_SECRET; 
 
 io.use(socketioJwt.authorize({
   secret: jwt_key,
   handshake: true
 }));

 let chat_nsp = io.of('messages');
 main_chat(chat_nsp);
 
 http.listen(port,()=>{
    console.log(`Listening to port : ${port}`);
 });

   
