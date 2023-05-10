const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db.js'); // assuming database.js is in the same directory

class Book extends Model {}

Book.init({
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  isbn: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  published_date: {
    type: DataTypes.DATE
    // allowNull defaults to true
  },
  // Add other fields as necessary
}, {
  sequelize, // passing the `sequelize` instance is required
  modelName: 'Book', // We need to choose the model name
  // Other model options go here
});

module.exports = Book;
