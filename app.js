
 const  express  =  require('express');
 const  social   =  require('./routes/social');
 const  local    =  require('./routes/testAuth');
 const   cors    =  require('cors');
 const    app    =  express();
 
 app.use(express.json());
 app.use(express.static('public'));


 app.use(cors());
 app.all((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT , POST , PATCH , DELETE , GET');
      return res.status(200).json({});
  }
    next();
 });

 app.use('/',social);
 app.use('/', local);
 
 app.get('/',(req,res)=>{
   return res.send('We Are Connected');
 });

 
 module.exports = app ;