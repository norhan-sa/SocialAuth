 const  router   =   require('express').Router();
 const  axios    =   require('axios');


 //ــــــــــــــF A C E B O O K   A U T H E T I C A T I O Nــــــــــ

 router.post('/facebook', async(req,res)=>{

   try{        
     let {fb_token}  =  req.body;

     let is_exist = await axios.get(`https://graph.facebook.com/me?access_token=${fb_token}&fields=id,first_name,last_name,email,picture`); 
     if(!is_exist) return res.status(400).send({msg:'facebook token is not valid' , data:null , status: 400});

     console.log(is_exist.data);
     return res.send({msg:'successfully connected', data: is_exist.data});

   }catch(err){
     console.log(err.message);
     return res.status(500).send({msg:'حدث خطأ ما', data: null , status: 500});       
   } 
 });

 
 
 // ــــــــــــــــــــG O O G L E   A U T H E N T I C A T I O N ـــــــــــــ

  router.post('/google', async(req,res)=>{

   try{        
   
    let {google_token}  =  req.body;

    let is_exist = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${google_token}`); 
    if(!is_exist) return res.status(400).send({msg:'google token is not valid' , data:null , status: 400});
    
    console.log(is_exist.data);
    return res.send({msg:'successfully connected', data: is_exist.data});
    
   }catch(err){
     console.log(err.message);
     return res.status(500).send({msg:'حدث خطأ ما', data: null , status: 500});       
   } 

 });



 module.exports   =   router;