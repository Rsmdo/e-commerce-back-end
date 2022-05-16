const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: { //need different id for each category 
      type: DataTypes.INTEGER, //interger
      allowNull:false, 
      primaryKey:true, 
      autoIncrement: true//auto increase
    }, 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
