
 const  router   =   require('express').Router();
 const  Users    =   require('../config/db').Users;
 const jwt_token =   require('../config/jwt');
 const  bcrypt   =   require('bcrypt');

 router.post('/signup',async(req, res)=>{
  try{

   let {firstname , lastname , email , phone , password}   = req.body;
   
   if(!(firstname && lastname && email && phone && password)) 
     return res.status(400).send({msg:'please check all data', data: null, status: 400});

   let is_used_email = await Users.findOne({ where: {email: email}});  
   if(is_used_email)
     return res.status(400).send({msg: 'email is already used', data: null, status: 400});

   let is_used_phone = await Users.findOne({ where: {phone: phone}});  
   if(is_used_phone)
     return res.status(400).send({msg: 'phone is already used', data: null, status: 400});   
     
   let salt = await bcrypt.genSalt(10);
   let hashed_password = await bcrypt.hash(password, salt);
   
   let user  =  await Users.create({
             firstname: firstname,
             lastname: lastname,
             email: email,
             phone: phone,
             password: hashed_password
   });

   return res.send({msg: 'تم تسجيل العضوية بنجاح', data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone
    }, status: 200
 });

  }catch(err){
     console.log('lOCAL SIGNUP ERROR : '+err.message);
     return res.status(500).send({msg:'حدث خطأ ما', data: null, status: 500});       

  }      
 });


  router.post('/login',async(req, res)=>{
  try{

   let {email, password}   = req.body;
   
   if(!(email && password)) 
     return res.status(400).send({msg:'please check all data', data: null, status: 400});

   let is_used_email = await Users.findOne({ where: {email: email}});  
   if(!is_used_email)
     return res.status(400).send({msg: 'this email not registered', data: null, status: 400});


     let is_correct_password = bcrypt.compare(password, is_used_email.password);
     if(!is_correct_password)
       return res.status(400).send({msg:'الرجاء التحقق من كلمة المرور', data: null, status: 400})
   
     let user = is_used_email;  

   return res.send({msg: 'تم تسجيل الدخول بنجاح', data: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone
    }, status: 200
 });

  }catch(err){
     console.log('lOCAL LOGIN ERROR : '+err.message);
     return res.status(500).send({msg:'حدث خطأ ما', data: null, status: 500});       

  }      
 });

 module.exports = router;