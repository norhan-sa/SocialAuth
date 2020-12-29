 const Sequelize = require('sequelize');

 module.exports = (sequelize, type) => {
    return sequelize.define('Users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstname: {
          type: Sequelize.STRING(50),
          allowNull: false,       
        },
        lastname: {
          type: Sequelize.STRING(50),
          allowNull: false,   
        },
        email: {
          type: Sequelize.STRING(254),
          allowNull: false,   
        },
        phone: {
          type: Sequelize.STRING(13),
          allowNull: false,        
        },
        picture: {
          type: type.STRING,
          allowNull: true,        
        },
        facebook_id: {
          type: type.STRING,
          allowNull: true, 
        },
        google_id: {
          type: type.STRING,
          allowNull: true, 
        },
        reg_date: {
          type: type.DATE,
          allowNull: false,
          defaultValue: new Date()       
        },
        password: {
          type: type.STRING,
          allowNull: true
        }
    });
 }