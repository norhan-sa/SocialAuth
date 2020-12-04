const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstname: {
          type: Sequelize.STRING(50)       
        },
        lastname: {
          type: Sequelize.STRING(50)   
        },
        email: {
          type: Sequelize.STRING(254)   
        },
        phone: {
          type: Sequelize.STRING(13)        
        },
        picture: {
          type: type.STRING        
        },
        reg_date: {
          type: type.DATE        
        }
    });
}