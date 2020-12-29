
 require('dotenv').config();

 const     Sequelize        =    require('sequelize');
 const     user_model       =    require('../models/users');
 const    groups_model      =    require('../models/groups');
 const group_members_model  =    require('../models/group_members');
 const   messages_model     =    require('../models/messages');
    
 const db_url     =   process.env.DB_URL; 
 const sequelize  =   new Sequelize(db_url);

 const   Users       =   user_model(sequelize, Sequelize); 
 const   Groups      =   groups_model(sequelize, Sequelize);
 const Group_members =   group_members_model(sequelize, Sequelize); 
 const   Messages    =   messages_model(sequelize, Sequelize);

 sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  });

 exports.Users         =    Users;
 exports.Groups        =    Groups;
 exports.Group_members =    Group_members;
 exports.Messages      =    Messages;