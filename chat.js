 require('dotenv').config();

 const   Users       =    require('./config/db').Users;
 const   JWT_SEC     =    process.env.JWT_SECRET;
 const    jwt        =    require('jsonwebtoken');
 let  active_users   =    [];

 function main_chat(nsp){

   // C H A T   C O N N E C T I O N   A U T H E N T I C A T I O N  (With JWT) 
   nsp.use( function(socket, next){
    if (socket.handshake.query ){
      try{
         let query_data = JSON.parse(socket.handshake.query);
         if(!query_data.token){
             console.log('chat connection failed : there is no token'); 
             next(new Error('Authentication error'));
         }  
      }catch(err){
         console.log('JSON parsing error : '+err.message);
         next(new Error('Authentication error')); 
      }   
      jwt.verify(socket.handshake.query.token, JWT_SEC, function(err, decoded) {
        if (err){ 
          console.log(`ERROR : ${err.message}`);  
          return next(new Error('Authentication error'));
        }
        console.log('successfully connected to the chat');
        Users.findOne({ where: {id: decoded.id}}).then(res=>{
           socket.data = {
               id: res.id,
               lastname: res.lastname,
               firstname: res.firstname,
               picture: res.picture
           };
           next();
        }).catch(err=>{
           console.log(err.stack);
        });
        
      });
    }
    else {
    console.log('chat connection failed : no query data'); 
    next(new Error('Authentication error'));
    }    
  }).on('connection',function(socket){

    console.log(`U S E R  C O N N E C T E D : ${socket.id} `);
    console.log(socket.data);

    //  G E T   A L L   A C T I V E   U S E R S 
    socket.emit('active users', activeUsers(nsp, socket.id));

    //  N O T I F Y   U S E R S   F O R   N E W   C O N N E C T I O N
    socket.broadcast.emit('active users', socket.data);

    //  P R I V A T E   C H A T   M E S S A G E S 
    socket.on('private message',()=>{

    });

    //  D I S C O N N E C T   F R O M   T H E   C H A T
    socket.on('disconnect',function(){
        console.log(`U S E R  D I S C O N N E C T E D : ${socket.id} `);
    });

   }); 
 }

 // F I N D  A L L  A C T I V E  U S E R S
 function activeUsers(nsp , id){
    var clients = nsp.clients();
    if(!Array.isArray(clients)) return clients.data;
    let activeusers = clients.filter(client => {
        return client.id !== id;
    });
    return activeusers;
 }

 exports.main_chat = main_chat;