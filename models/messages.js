 const Sequelize = require('sequelize');

 module.exports = (sequelize, type) => {
   return sequelize.define('Messages', {
       id: {
         type: type.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       msg: {
         type: type.STRING 
       },
       from_id:{
         type: type.STRING,
         allowNull: true,       
       },
       time: {
         type: type.DATE,
         allowNull: false,
         defaultValue: new Date()       
       },
       type: {
         type: type.ENUM(['user', 'group'])        
       },
       destination_id: {
         type: type.INTEGER
       }
   });
 }