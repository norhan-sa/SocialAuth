 const  router   =   require('express').Router();
 const  axios    =   require('axios');
 const  Users    =   require('../config/db').Users;


 //ــــــــــــــF A C E B O O K   A U T H E T I C A T I O Nــــــــــ

 router.post('/facebook', async(req,res)=>{

   try{        
     let {fb_token}  =  req.body;

     let is_exist = await axios.get(`https://graph.facebook.com/me?access_token=${fb_token}&fields=id,first_name,last_name,email,picture`);
     
     let email = is_exist.data.email? is_exist.data.email : req.body.email;
     let firstname = is_exist.data.first_name? is_exist.data.first_name : req.body.first_name;
     let lastname = is_exist.data.last_name? is_exist.data.last_name : req.body.last_name;
     let picture = is_exist.data.picture? is_exist.data.picture.data.url : null;
     let fb_id = is_exist.data.id;

     let data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      picture: picture,
      facebook_id: fb_id
    }

     let is_used_email = await Users.findOne({ where: { email: email} }); 
     if(is_used_email) return res.status(400).send({msg:'هذا الايميل مستخدم بالفعل', data:null, status:400}); 
    
     if(req.body.phone){
      let is_used_phone = await Users.findOne({where: {phone: req.body.phone} });
      if(is_used_phone) return res.status(400).send({msg:'رقم الهاتف مستخدم بالفعل', data:null, status:400});
    }
     let is_reg = await Users.findOne({ where: {facebook_id: fb_id}});
     if(is_reg){
       data.id = is_reg.id;
       data.phone = is_reg.phone;
       return res.send({msg:'تم تسجيل الدخول بنجاح', data: data, status:200 });
     }else{
       data.phone = req.body.phone;
       let user  =  await Users.create(data); 
       data.id = user.id;
       return res.send({msg:'تم تسجيل العضوية بنجاح', data: data, status:200 });      
     }

   }catch(err){
     console.log(err.message);
     return res.status(400).send({msg:'token not valid', data: null , status: 500});       
   } 
 });

 
 
 // ــــــــــــــــــــG O O G L E   A U T H E N T I C A T I O N ـــــــــــــ

  router.post('/google', async(req,res)=>{

   try{        
   
    let {google_token}  =  req.body;

    let is_exist = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${google_token}`); 
    console.log(is_exist); 

    let email = is_exist.data.email? is_exist.data.email : req.body.email;
    let firstname = is_exist.data.given_name? is_exist.given_name : req.body.first_name;
    let lastname = is_exist.data.family_name? is_exist.family_name : req.body.last_name;
    let picture = is_exist.data.picture? is_exist.data.picture : null;
    let google_id = is_exist.data.sub;

    let data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      picture: picture,
      google_id: google_id
    }

    let is_used_email = await Users.findOne({ where: { email: email} }); 
    if(is_used_email) return res.status(400).send({msg:'هذا الايميل مستخدم بالفعل', data:null, status:400}); 
    
    if(req.body.phone){
      let is_used_phone = await Users.findOne({where: {phone: req.body.phone} });
      if(is_used_phone) return res.status(400).send({msg:'رقم الهاتف مستخدم بالفعل', data:null, status:400});
    }

    let is_reg = await Users.findOne({ where: {google_id: google_id}});
    if(is_reg){

      data.id = is_reg.id;
      data.phone = is_reg.phone;
      return res.send({msg:'تم تسجيل الدخول بنجاح', data: data, status:200 });

    }else{

     data.phone = req.body.phone; 
     let user  =  await Users.create(data); 
     data.id = user.id;
  
     return res.send({msg:'تم تسجيل العضوية بنجاح', data: data, status:200 }); 

    }    
   }catch(err){
     console.log(err.message);
     return res.status(500).send({msg:'حدث خطأ ما', data: null , status: 500});       
   } 

 });



 module.exports   =   router;