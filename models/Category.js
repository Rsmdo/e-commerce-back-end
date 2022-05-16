const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: { //need different id for each category 
      type: DataTypes.INTEGER, //interger
      allowNull:false, 
      primaryKey:true, 
      autoIncrement: true//auto increase
    }, 
    category_name: {
      type: DataTypes.STRING, //for strings
      allowNull: false
  }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
