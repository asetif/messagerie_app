'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {

    associate : function(models) {
    // associations can be defined here
    models.User.hasmany(models.Message);
    }
  
});
  return User;
};