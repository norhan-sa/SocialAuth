
 

 function chat_connect(nsp){

   nsp.on('connection', (socket)=>{
     socket.on('private', ()=>{      
   });

     socket.on('disconnect',()=>{
        console.log('user dosconnected');
     });  
   
   });    

 }

