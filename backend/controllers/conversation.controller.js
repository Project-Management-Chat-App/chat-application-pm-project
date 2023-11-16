// import repositories
const e = require("express");
const conversationRepository = require("../repositories/conversation.repository.js");
const userConversationRepository = require("../repositories/userConversation.repository.js");



// the controllers for conversation
async function getAllConversationsByUserId(req, res) {
    // get the user id from the session
    const userId = req.session.user;

    try {

        // get the conversations by user id
        const conversations = await conversationRepository.getConversationListForUser(userId);
        
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
    } catch (error) {
        console.error("request or db error: ", error.message);
        return res.status(500).json({ 
            "message": "Something went wrong: could not get conversations",
        });
    }
}


async function createConversation(req, res) {
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

    // check if conversation type is valid
    if (payload.conversationType !== "private" && payload.conversationType !== "group") {
        return res.status(400).json({ // bad request, if user is not logged in, we send this error
            "message": "Conversation type is invalid",
        });
    }

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

    if (req.body.addedUsers?.length > 0 && payload.conversationType === "private") {
        return res.status(400).json({ // bad request, if user is not logged in, we send this error
            "message": "Only one user can be added to private conversations",
        });
    }

    try {

        // create conversation
        const conversation = await conversationRepository.createConversation(payload);


        if (!conversation) {
            return res.status(500).json({ 
                "message": "Something went wrong: could not create conversation",
            });
        }

        // create user conversation association
        const userConversation = await userConversationRepository.createUserConversation(userId, conversation.id);

        // if addedUser list exists, add users as userConversation associations
        if (req.body.addedUsers) { // added users should be an array of user ids
            req.body.addedUsers.forEach(async (addedUser) => {
                const userConversation = await userConversationRepository.createUserConversation(addedUser, conversation.id);
            });
        }

        // return success message
        return res.status(201).json({
            "message": "Conversation created",
            "conversation": conversation,
        });
    } catch (error) {
            
        // // if conversation is not created, throw error
        // if (!conversation) {
            return res.status(500).json({ // internal server error, if something goes wrong with the server, we send this error, like could not connect or save this user
                "message": "Something went wrong: could not create conversation",
                // "error": error.message || "Unknown error",
            });
        // }
    }

    
}

async function getConversationById(req, res) {
    // get the user id from the session
    const userId = req.session.user;

    try {

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

    } catch (error) {
        console.error("request or db error: ", error.message);
        return res.status(500).json({ 
            "message": "Something went wrong: could not get conversation",
        });
    }

}


module.exports = {
    getAllConversationsByUserId,
    createConversation,
    getConversationById,
};