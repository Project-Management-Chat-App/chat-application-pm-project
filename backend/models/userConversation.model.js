// make the model methods available to the server
// this is to restrict the server from directly accessing the database
// something like a repository pattern


const Conversation = require('./models/conversation.model');
const User = require('./models/user.model');
const UserConversation = require('./models/userConversation.model');

// the repository pattern is used to restrict the server from directly accessing the database
const UserConversationRepository = new class {
    async createUserConversation(userConversation) {
        // validate user conversation data

        // if data is empty, throw error
        if (!userConversation) {
            throw new Error('User conversation data is empty');
        }

        // if userId is empty, throw error
        if (!userConversation.userId) {
            throw new Error('User conversation userId is empty');
        }

        // if conversationId is empty, throw error
        if (!userConversation.conversationId) {
            throw new Error('User conversation conversationId is empty');
        }

        // verify if user conversation exists
        const userConversationExists = await this.getUserConversationByUserIdAndConversationId(userConversation.userId, userConversation.conversationId);
        if (userConversationExists) {
            throw new Error('User conversation already exists');
        }

        return await UserConversation.create(userConversation);
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