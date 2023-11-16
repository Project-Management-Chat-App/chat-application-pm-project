// import repositories
const conversationRepository = require("../repositories/conversation.repository.js");



// the controllers for conversation
async function getAllConversationsByUserId(req, res) {
    // get the user id from the session
    const userId = req.session.user;

    // if no user id, throw error
    if (!userId) {
        return res.status(401).json({ // unauthorized, if user is not logged in, we send this error
            "message": "User is not logged in",
        });
    }

    // get the conversations by user id
    const conversations = await conversationRepository.getAllConversationsByUserId(userId);

    // if no conversations, throw error
    if (!conversations) {
        return res.status(404).json({ // not found, if user is not found, we send this error
            "message": "Conversations not found",
        });
    }

    // return the conversations
    return res.status(200).json({
        "message": "Conversations found",
        "conversations": conversations,
    });
}


async function createConversationController(req, res) {
    // get the user id from the session
    const userId = req.session.user;

    // if no user id, throw error
    if (!userId) {
        return res.status(401).json({ // unauthorized, if user is not logged in, we send this error
            "message": "User is not logged in",
        });
    }

    // get the conversation data from the request body
    const payload = {
        "conversationType": req.body.conversationType,
        "title": req.body.title,
        "description": req.body.description || "", // this is optional
    };

    // check required fields
    if (!payload.conversationType) {
        return res.status(400).json({ // bad request, if user is not logged in, we send this error
            "message": "Conversation type is required",
        });
    }

    // check, for conversation type group, if title must be present
    if (payload.conversationType === "group" && !payload.title) {
        return res.status(400).json({ // bad request, if user is not logged in, we send this error
            "message": "Conversation title is required for group conversations",
        });
    }

    // create conversation
    const conversation = await conversationRepository.createConversation(userId, payload);

    // if conversation is not created, throw error
    if (!conversation) {
        return res.status(500).json({ // internal server error, if something goes wrong with the server, we send this error, like could not connect or save this user
            "message": "Something went wrong: could not create conversation",
        });
    }

    // return the conversation
    return res.status(201).json({
        "message": "Conversation created",
        "conversation": conversation,
    });
}

async function getConversationById(req, res) {
    // get the user id from the session
    const userId = req.session.user;

    // if no user id, throw error
    if (!userId) {
        return res.status(401).json({ // unauthorized, if user is not logged in, we send this error
            "message": "User is not logged in",
        });
    }

    // get the conversation id from the request params
    const conversationId = req.params.conversationId;

    // if no conversation id, throw error
    if (!conversationId) {
        return res.status(400).json({ // bad request, if user is not logged in, we send this error
            "message": "Conversation id is required",
        });
    }

    // get the conversation by id
    const conversation = await conversationRepository.getConversationById(conversationId);

    // if no conversation, throw error
    if (!conversation) {
        return res.status(404).json({ // not found, if user is not found, we send this error
            "message": "Conversation not found",
        });
    
    }

    // return the conversation
    return res.status(200).json({
        "message": "Conversation found",
        "conversation": conversation,
    });
}

async function updateConversation(req, res) {
    // get the user id from the session
    const userId = req.session.user;

    // if no user id, throw error
    if (!userId) {
        return res.status(401).json({ // unauthorized, if user is not logged in, we send this error
            "message": "User is not logged in",
        });
    }

    // get the conversation id from the request params
    const conversationId = req.params.conversationId;

    // if no conversation id, throw error
    if (!conversationId) {
        return res.status(400).json({ // bad request, if user is not logged in, we send this error
            "message": "Conversation id is required",
        });
    }

    // get the conversation data from the request body
    const payload = {};

    if (req.body.title) {
        payload.title = req.body.title;
    }

    if (req.body.description) {
        payload.description = req.body.description;
    }

    // update conversation
    const conversation = await conversationRepository.updateConversation(conversationId, payload);

    // if conversation is not updated, throw error
    if (!conversation) {
        return res.status(500).json({ // internal server error, if something goes wrong with the server, we send this error, like could not connect or save this user
            "message": "Something went wrong: could not update conversation",
        });
    }

    // return the conversation
    return res.status(200).json({
        "message": "Conversation updated",
        "conversation": conversation,
    });
}

async function deleteConversation(req, res) {
    // get the user id from the session
    const userId = req.session.user;

    // if no user id, throw error
    if (!userId) {
        return res.status(401).json({ // unauthorized, if user is not logged in, we send this error
            "message": "User is not logged in",
        });
    }

    // get the conversation id from the request params
    const conversationId = req.params.conversationId;

    // if no conversation id, throw error
    if (!conversationId) {
        return res.status(400).json({ // bad request, if user is not logged in, we send this error
            "message": "Conversation id is required",
        });
    }

    // delete conversation
    const conversation = await conversationRepository.deleteConversation(conversationId);

    // if conversation is not deleted, throw error
    if (!conversation) {
        return res.status(500).json({ // internal server error, if something goes wrong with the server, we send this error, like could not connect or save this user
            "message": "Something went wrong: could not delete conversation",
        });
    }

    // return the conversation
    return res.status(200).json({
        "message": "Conversation deleted",
        "conversation": conversation,
    });

}

module.exports = {
    getAllConversationsByUserId,
    createConversationController,
    getConversationById,
    updateConversation,
    deleteConversation,
};