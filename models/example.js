module.exports = function(sequelize, DataTypes) {
  var Litty = sequelize.define("Litty", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Litty;
};
