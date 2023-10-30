// make the model methods available to the server
// this is to restrict the server from directly accessing the database
// something like a repository pattern

const Conversation = require('./models/conversation.model');
const User = require('./models/user.model');
const UserConversation = require('./models/userConversation.model');

// the repository pattern is used to restrict the server from directly accessing the database
// this is to make the code more modular and easier to maintain
const ConversationRepository = new class {
    async createConversation(conversation) {
        // validate conversation data

        // if data is empty, throw error
        if (!conversation) {
            throw new Error('Conversation data is empty');
        }

        // if title is empty, throw error
        if (!conversation.title) {
            throw new Error('Conversation title is empty');
        }

        // if conversation type is empty, throw error
        if (!conversation.conversationType) {
            throw new Error('Conversation type is empty');
        }

        // if conversation type is not 'private' or 'group', throw error
        if (conversation.conversationType !== 'private' && conversation.conversationType !== 'group') {
            throw new Error('Conversation type is invalid, must be either \'private\' or \'group\'');
        }

        // verify if conversation exists
        const conversationExists = await this.getConversationByTitle(conversation.title);
        if (conversationExists) {
            throw new Error('Conversation already exists');
        }

        return await Conversation.create(conversation);
    }

    async getConversationById(id) {
        // if conversation is not found, throw error
        if (!id) {
            throw new Error('Conversation id is empty');
        }

        const conversation = await Conversation.findByPk(id);
        if (!conversation) {
            throw new Error('Conversation not found');
        }

        return conversation;
    }

    async getConversationByTitle(title) {
        // if title is empty, throw error
        if (!title) {
            throw new Error('Conversation title is empty');
        }

        const conversation = await Conversation.findOne({ where: { title: title } });
        if (!conversation) {
            throw new Error('Conversation not found');
        }

        return conversation;
    }

    async updateConversation(conversation) {
        // if conversation data is empty, throw error
        if (!conversation) {
            throw new Error('Conversation data is empty');
        }

        // if conversation id is empty, throw error
        if (!conversation.id) {
            throw new Error('Conversation id is empty');
        }

        // update conversation data
        return await Conversation.update(conversation, { where: { id: conversation.id } });
    }

    async deleteConversation(id) {
        // if conversation id is empty, throw error
        if (!id) {
            throw new Error('Conversation id is empty');
        }

        // delete conversation
        return await Conversation.destroy({ where: { id } });
    }

    async getConversationsByUserId(userId) {
        // if user id is empty, throw error
        if (!userId) {
            throw new Error('User id is empty');
        }

        // get all conversations for the user
        return await Conversation.findAll({
            include: [{
                model: User,
                where: { id: userId }
            }]
        });
    }

    // use the UserConversation model to get all conversations for a user
    async getConversationListForUser(userId) {
        // if user id is empty, throw error
        if (!userId) {
            throw new Error('User id is empty');
        }

        // get all conversations for the user
        const userConversations = await UserConversation.findAll({ where: { userId } });

        // get all conversation ids and store them in an array
        const conversationIds = userConversations.map(userConversation => userConversation.conversationId);

        // get all conversations for the user
        return await Conversation.findAll({ where: { id: conversationIds } });
    }
};

module.exports = ConversationRepository;