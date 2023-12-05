// schemas are used to define the structure of our database tables

// first import our sequelize instance and datatypes class
const sequelize = require('../database/sequelize').sqlConnection;
const { DataTypes } = require('sequelize');

// define the user schema
const Message = sequelize.define('Message', {
    // Model attributes are defined here
    messageType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'text',
        validate: {
            isIn: [['text', 'image', 'file']]
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagePath:{
        type: DataTypes.STRING,
        allowNull: true
    },
    imageAlt:{
        type: DataTypes.STRING,
        allowNull: true
    },
    filePath:{
        type: DataTypes.STRING,
        allowNull: true
    },
    fileAlt:{
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
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // conversationId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // ownerId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
}, {
    // // add association to conversation model (id field on conversation) with foreign key for conversationId and user model (id field on user) with foreign key for ownerId
    // associate: (models) => {
    //     Message.belongsTo(models.Conversation, { foreignKey: 'conversationId' });
    //     Message.belongsTo(models.User, { foreignKey: 'ownerId' });
    // },

    // // for every created message, update the conversation dateUpdated field
    // hooks: {
    //     afterCreate: async (message) => {
    //         const conversation = await sequelize.models.Conversation.findByPk(message.conversationId);
    //         conversation.dateUpdated = Date.now();
    //         await conversation.save();
    //     }
    // },

    // disable the default timestamp fields (createdAt and updatedAt)
    timestamps: false,
});

module.exports = Message;