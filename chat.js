



 function main_chat(nsp){
      
     nsp.on('connection',function(socket){
         console.log(`user connected ${socket.id}`);
     });     

 }

 module.exports = main_chat;