// make the model methods available to the server
// this is to restrict the server from directly accessing the database
// something like a repository pattern


const Conversation = require('../schema/conversation.schema');
const User = require('../schema/user.schema');
const UserConversation = require('../schema/userConversation.schema');


// this schema is used to store the user conversation associations
const UserConversationRepository = new class {
    async createUserConversation(userId, conversationId) {
        // validate user conversation data

        
        // if userId is empty, throw error
        if (!userId) {
            throw new Error('User conversation userId is empty');
        }

        // if conversationId is empty, throw error
        if (!conversationId) {
            throw new Error('User conversation conversationId is empty');
        }

        // verify if user conversation exists
        const userConversationExists = await this.getUserConversationByUserIdAndConversationId(userId, conversationId);
        if (userConversationExists) {
            throw new Error('User conversation already exists');
        }

        return await UserConversation.create({
            userId: userId,
            conversationId: conversationId
        });
    }

    async getUserConversationByUserIdAndConversationId(userId, conversationId) {
        // if userId is empty, throw error
        if (!userId) {
            throw new Error('User conversation userId is empty');
        }

        // if conversationId is empty, throw error
        if (!conversationId) {
            throw new Error('User conversation conversationId is empty');
        }

        return await UserConversation.findOne({
            where: {
                userId: userId,
                conversationId: conversationId
            }
        });
    }

    async getUserConversationsByUserId(userId) {
        // if userId is empty, throw error
        if (!userId) {
            throw new Error('User conversation userId is empty');
        }

        return await UserConversation.findAll({
            where: {
                userId: userId
            }
        });
    }

    // this is used for group conversations, we get all user conversations associations by conversationId
    async getUserConversationsByConversationId(conversationId) {
        // if conversationId is empty, throw error
        if (!conversationId) {
            throw new Error('User conversation conversationId is empty');
        }

        return await UserConversation.findAll({
            where: {
                conversationId: conversationId
            }
        });
    }

    async deleteUserConversation(userId, conversationId) {
        // if userId is empty, throw error
        if (!userId) {
            throw new Error('User conversation userId is empty');
        }

        // if conversationId is empty, throw error
        if (!conversationId) {
            throw new Error('User conversation conversationId is empty');
        }

        return await UserConversation.destroy({
            where: {
                userId: userId,
                conversationId: conversationId
            }
        });
    }

};

module.exports = UserConversationRepository;