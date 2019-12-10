// const Sequelize = require('sequelize');

// var Litty = sequelize.define('Litty', {
//   // attributes
//   Name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   Message: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// }, {
//   // options
// });

// module.exports = Litty;

module.exports = function(sequelize, DataTypes) {
  var Litty = sequelize.define("Litty", {
    name: DataTypes.STRING,
    message: DataTypes.TEXT
  });
  return Litty;
};
