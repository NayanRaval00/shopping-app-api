const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs'); // For password hashing

const sequelize = require('../src/db/conn');

const User = sequelize.define('users', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Use Sequelize's built-in validation
    },
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // Add validation for mobile number format if needed
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [6, 255], // Minimum and maximum password length
    },
  },
  created_at: {
    allowNull: true,
    type: Sequelize.DATE
  },
  updated_at: {
    allowNull: true,
    type: Sequelize.DATE
  }
},{
  timestamps: false
}, {
  hooks: {
    beforeCreate: async (user, options) => {
      const salt = await bcrypt.genSalt(10); 
      user.password = await bcrypt.hash(user.password, salt); 
    },
  },
});

module.exports = User;

