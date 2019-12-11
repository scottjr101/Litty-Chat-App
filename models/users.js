module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: 
      DataTypes.STRING,
    email: 
      DataTypes.STRING,
    password: 
      DataTypes.STRING
  });
  return Users;
};