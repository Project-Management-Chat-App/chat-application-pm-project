// make the model methods available to the server
// this is to restrict the server from directly accessing the database
// something like a repository pattern


const Message = require('./repositories/message.repository');

// the repository pattern is used to restrict the server from directly accessing the database

const MessageRepository = new class {
    async createMessage(message) {
        // validate message data

        // if data is empty, throw error
        if (!message) {
            throw new Error('Message data is empty');
        }

        // if messageType is empty, throw error
        if (!message.messageType) {
            throw new Error('Message type is empty');
        }

        // if messageType is not 'text', 'image', or 'file', throw error
        if (message.messageType !== 'text' && message.messageType !== 'image' && message.messageType !== 'file') {
            throw new Error('Message type is invalid, must be either \'text\', \'image\', or \'file\'');
        }

        // if content is empty, throw error
        if (!message.content) {
            throw new Error('Message content is empty');
        }

        // if conversationId is empty, throw error
        if (!message.conversationId) {
            throw new Error('Message conversationId is empty');
        }

        // if ownerId is empty, throw error
        if (!message.ownerId) {
            throw new Error('Message ownerId is empty');
        }

        return await Message.create(message);
    }

    async getMessagesByConversationId(conversationId) {
        // if conversationId is empty, throw error
        if (!conversationId) {
            throw new Error('Conversation id is empty');
        }

        return await Message.findAll({
            where: {
                conversationId: conversationId
            }
        });
    }

    async getMessageById(id) {
        // if id is empty, throw error
        if (!id) {
            throw new Error('Message id is empty');
        }

        return await Message.findByPk(id);
    }

    async updateMessage(id, message) {
        // validate message data

        // if data is empty, throw error
        if (!message) {
            throw new Error('Message data is empty');
        }

        // if messageType is empty, throw error
        if (!message.messageType) {
            throw new Error('Message type is empty');
        }

        // if messageType is not 'text', 'image', or 'file', throw error
        if (message.messageType !== 'text' && message.messageType !== 'image' && message.messageType !== 'file') {
            throw new Error('Message type is invalid, must be either \'text\', \'image\', or \'file\'');
        }

        // if content is empty, throw error
        if (!message.content) {
            throw new Error('Message content is empty');
        }

        // if conversationId is empty, throw error
        if (!message.conversationId) {
            throw new Error('Message conversationId is empty');
        }

        // if ownerId is empty, throw error
        if (!message.ownerId) {
            throw new Error('Message ownerId is empty');
        }

        // if id is empty, throw error
        if (!id) {
            throw new Error('Message id is empty');
        }

        const messageExists = await this.getMessageById(id);
        if (!messageExists) {
            throw new Error('Message not found');
        }

        // update message
        return await Message.update(message, {
            where: {
                id: id
            }
        });
    }
}

module.exports = MessageRepository;