const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EPI = sequelize.define('EPI', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tamanho: {
    type: DataTypes.STRING,
    allowNull: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'epis',
  timestamps: false
});

module.exports = EPI;