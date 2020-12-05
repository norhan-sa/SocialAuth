 const Sequelize = require('sequelize');

 module.exports = (sequelize, type) => {
   return sequelize.define('Group_members', {
       id: {
         type: type.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       group_id:{
         type: type.INTEGER,
         allowNull: false       
       },
       user_id: {
         type: type.INTEGER,
         allowNull: false 
       }
   });
 }