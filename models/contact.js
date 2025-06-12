const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contact = sequelize.define(
  'Contact',
  {
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    linkedId: DataTypes.INTEGER,
    linkPrecedence: {
      type: DataTypes.ENUM('primary', 'secondary'),
      defaultValue: 'primary',
    },
    deletedAt: DataTypes.DATE,
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);

module.exports = Contact;
