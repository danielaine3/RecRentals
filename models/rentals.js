'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rentals = sequelize.define('Rentals', {
    item: DataTypes.STRING,
    rate: DataTypes.STRING,
    owner: DataTypes.STRING,
    location: DataTypes.STRING,
    category: DataTypes.STRING,
    imgURL: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Rentals.associate = function(models) {
    // associations can be defined here
  };
  return Rentals;
};