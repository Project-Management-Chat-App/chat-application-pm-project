// schemas are used to define the structure of our database tables

// first import our sequelize instance and datatypes class
const sequelize = require('../database/sequelize').sqlConnection;
const { DataTypes } = require('sequelize');

// define the user schema
const Conversation = sequelize.define('Conversation', {
    // can be either 'private' or 'group'
    conversationType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'private',
        validate: {
            isIn: [['private', 'group']]
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
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
    // disable the default timestamp fields (createdAt and updatedAt)
    timestamps: false,
});

module.exports = Conversation;