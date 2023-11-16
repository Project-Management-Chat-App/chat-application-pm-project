// here we create a route module, 
// user makes requests to the server, server has defined routes
// and logics mapped in here

const express = require("express");
const { loginController, registerController, getUserProfile, logoutController } = require("./controllers/user.controller.js");
const router = express.Router();


// auth middleware  
const { validateUserIsAuthenticated } = require("./middlewares/auth.middleware");
const { getAllConversationsByUserId, getConversationById, createConversation } = require("./controllers/conversation.controller.js");

// the routes here, mapped as address string, function(request object, response object)

// dummy request
router.get('/', function(req, res) {
    res.send('<h1>get response for the chat app</h1>');
});

// the login route
router.post("/login", loginController);

// the register route
router.post("/register", registerController);


// the get user profile route, use authentication middleware
router.get("/profile", validateUserIsAuthenticated, getUserProfile);

router.post("/logout", validateUserIsAuthenticated, logoutController);

// the conversation routes
router.get("/conversations", validateUserIsAuthenticated,  getAllConversationsByUserId); // list conversations by user

router.post("/conversations/create", validateUserIsAuthenticated,  createConversation); // create a conversation

router.get("/conversations/by-id/:conversationId", validateUserIsAuthenticated,  getConversationById); // get a conversation details by id 







module.exports = router;