'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    likes: DataTypes.INTEGER
  });
  Message.associate = function (models) {
    Message.belongsTo(models.User, {
      foreignKey: {
        allownull : false
      }
  });

  }
  
  return Message;
};

