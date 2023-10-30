// schemas are used to define the structure of our database tables

// first import our sequelize instance and datatypes class
const sequelize = require('../database/sequelize').sqlConnection;
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// bcrypt variables
const SALT_ROUNDS = 10;


// define the user schema
const User = sequelize.define('User', {
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    dateUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, { 

    // add hook before adding user hash password, using bcrypt library
    hooks: {
        beforeCreate: (user) => {
            // use bcrypt to hash password
            user.passwordHash = bcrypt.hashSync(user.passwordHash, SALT_ROUNDS);
        }
    },

    // hash the password on password update
    validate: {
        beforeUpdate: (user) => {
            if (user.passwordHash) {
                // use bcrypt to hash password
                user.passwordHash = bcrypt.hashSync(user.passwordHash, SALT_ROUNDS);
            }
        }
    },
    
    // disable the default timestamp fields (createdAt and updatedAt)
    timestamps: false,
});

module.exports = User;