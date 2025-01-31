 require('dotenv').config();

 const   Users       =    require('./config/db').Users;
 const   JWT_SEC     =    process.env.JWT_SECRET;
 const    jwt        =    require('jsonwebtoken');
 let  active_users   =    [];

 function main_chat(nsp){

   // C H A T   C O N N E C T I O N   A U T H E N T I C A T I O N  (With JWT) 
   nsp.use( function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
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
    console.log('chat connection failed : No query or token'); 
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
    socket.on('private message',(data)=>{
        let {toID , msg} = data;
        let from  = socket.data.id;

        let to_user_data = findById(nsp , toID);
        if(to_user_data){
        let to_socket_id = to_user_data.id;
        socket.to(to_socket_id).emit('private message',{msg: msg, from: from, with: from, date: new Date()});
        }
        socket.emit('private message',{msg: msg, from: from, with: toID, date: new Date()});
    });

    //  D I S C O N N E C T   F R O M   T H E   C H A T
    socket.on('disconnect',function(){
        console.log(`U S E R  D I S C O N N E C T E D : ${socket.id} `);
    });

   }); 
 }

 // F I N D  A L L  A C T I V E  U S E R S
 function activeUsers(nsp , id){
      
    let active_sockets = getConnectedSocketsArray(nsp);

    let activeusers = [];
    for(let i = 0 ; i < active_sockets.length ; ++i){
        if(active_sockets[i].id == id)
        continue;
        else activeusers.push(active_sockets[i].data);
    }
    console.log(activeusers);
    return activeusers;
 }

 // F I N D  A C T I V E   U S E R   S O C K E T   I D   (BY ID)
 function findById(nsp ,id){

   let active_sockets = getConnectedSocketsArray(nsp);
   
   for(let i = 0 ; i < active_sockets.length ; ++i){
      if(active_sockets[i].data.id === id) 
         return active_sockets[i];
   }
     return;
 }


 //  G E T   C O N N E C T E D   S O C K E T S  A S   A R R A Y
 function getConnectedSocketsArray(nsp){
    var clients = nsp.clients().connected;
    var array = Object.keys(clients)
    .map(function(key) {
        return clients[key];
    });

    return array;
 }


 exports.main_chat = main_chat;