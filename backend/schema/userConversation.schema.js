// schemas are used to define the structure of our database tables
// this is a pivot table for the many to many relationship between users and conversations
//

// first import our sequelize instance and datatypes class
const sequelize = require('../database/sequelize').sqlConnection;
const { DataTypes } = require('sequelize');

// define the user conversation schema
const UserConversation = sequelize.define('UserConversation', {
    // Model attributes are defined here
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // disable the default timestamp fields (createdAt and updatedAt)
    timestamps: false,

    // now define relationships
    associate: (models) => {
        UserConversation.belongsTo(models.User, { foreignKey: 'userId' });
        UserConversation.belongsTo(models.Conversation, { foreignKey: 'conversationId' });
    }
});

module.exports = UserConversation;
