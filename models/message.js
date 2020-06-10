'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    idUsers: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    models.Message.belongsTo(models.user,{
      foreigneKey:{
        allowNull: false
      }
    })
  };
  return Message;
};