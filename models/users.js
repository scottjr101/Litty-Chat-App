const Sequelize = require('sequelize');

var User = sequelize.define('users', {
  // attributes
  Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  // options
});

module.exports = User;

// module.exports = function(sequelize, DataTypes) {
//   var Users = sequelize.define("Users", {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   });
//   return Users;
// };