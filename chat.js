 const  Users      =    require('./config/db').Users;
 let active_users  =    [];


 function main_chat(nsp){
      
     nsp.on('connection',function(socket){
         console.log(`user connected ${socket.id}`);

         //  J O I N   T H E   C H A T (get user data from the db)
         socket.on('join chat', function(data){
            Users.findOne({where: {id: data.id}}).then((user)=>{
               let data = {
                  id: user.id, 
                  firstname: user.firstname,
                  lastname: user.lastname, 
                  socket: socket.id,
                  picture: user.picture,
                  active: true
               }
               active_users.push(data);
               socket.emit('join chat',{msg:'you join the chat successfully', data: data, status:200});
               socket.broadcast.emit(`active users`,data);
            });
         });

         //  G E T   A C T I V E   U S E R S 
         socket.on(`active users`,function(){
            socket.emit(`active users`, {
                msg:'successfully get active users', 
                data: active_users, 
                status: 200
            });
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
        return;
    } 
 } 

 module.exports = main_chat;