 require('dotenv').config();
 const Sequelize    =   require('sequelize');
 const user_model   =   require('../models/users');

 const db_url     =   process.env.DB_URL; 
 const sequelize  =   new Sequelize(db_url);

 const Users = user_model(sequelize, Sequelize); 

 sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });

 exports.Users = Users;