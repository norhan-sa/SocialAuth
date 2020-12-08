 const   Users       =    require('./config/db').Users;
 let  active_users   =    [];

 function main_chat(nsp){
  
     nsp.on('connection',function(socket){
         console.log(`user connected ${socket.id} `);
 
         //  J O I N   T H E   C H A T (get user data from the db)
         socket.on('join chat', function(data){
            let is_exist = getSocketId(data.id);
            if(is_exist){
               active_users[is_exist.index].socket.push(socket.id);
               socket.emit('join chat',{msg: 'join the chat with another device', data: active_users[is_exist.index], status: 200});
            }else 
            Users.findOne({where: {id: data.id}}).then((user)=>{
             if(user){  
               let data = {
                  id: user.id, 
                  firstname: user.firstname,
                  lastname: user.lastname, 
                  socket: [socket.id],
                  picture: user.picture,
                  active: true
               }
               active_users.push(data);
               socket.emit('join chat',{msg:'you join the chat successfully', data: data, status:200});
               socket.broadcast.emit(`active users`,data);
             }else{
               socket.emit('join chat',{msg:'you are not registered', data: null, status:400});  
             } 
            });
         });

         //  G E T   A C T I V E   U S E R S 
         socket.on(`active users`,function(data){
            socket.emit(`active users`, {
                msg:'successfully get active users', 
                data: getActiveUsers(data.id), 
                status: 200
            });
         });
         
         //  D I S C O N N E C T   F R O M   T H E   C H A T
         socket.on('disconnect',function(){
             console.log(`user disconnected: ${socket.id}`);
         });

     }); 
 }


 function getSocketId(id){
    for(let i = 0 ; i < active_users.length ; ++i){
        if(active_users[i].id = id){
           return {
              data: active_users[i],
              index: i
           } 
        }
    } 
    return;
 } 

 function getActiveUsers(id){
    let users = [] 
    for(let i = 0 ; i < active_users.length ; ++i){
       if(active_users[i].id === id) continue; 
       users.push({
          firstname: active_users[i].firstname,
          lastname: active_users[i].lastname,
          email: active_users[i].email,
          picture: active_users[i].picture,
          id: active_users[i].id
       });
    } 
    return users;
 }

 module.exports = main_chat;