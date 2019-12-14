module.exports = function (sequelize, DataTypes) {
  var Litty = sequelize.define("Litty", {
    name: DataTypes.STRING,
    message: DataTypes.TEXT
  });
  return Litty;
};