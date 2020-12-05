 const Sequelize = require('sequelize');

 module.exports = (sequelize, type) => {
   return sequelize.define('Groups', {
       id: {
         type: type.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       name:{
         type: type.STRING,
         allowNull: true,       
       },
       created_at: {
         type: type.DATE,
         allowNull: false,
         defaultValue: new Date()       
       }
   });
 }