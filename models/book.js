const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db.js'); // assuming database.js is in the same directory

class Book extends Model {}

Book.init({
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avail : {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  published_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  sequelize, // passing the `sequelize` instance is required
  modelName: 'Book', // We need to choose the model name
  // Other model options go here
});

module.exports = Book;