// here we create a route module, 
// user makes requests to the server, server has defined routes
// and logics mapped in here

const express = require("express");
const { loginController, registerController, getUserProfile } = require("./controllers/user.controller.js");
const router = express.Router();

// the routes here, mapped as address string, function(request object, response object)

// dummy request
router.get('/', function(req, res) {
    res.send('<h1>get response for the chat app</h1>');
});

// the login route
router.post("/login", loginController);

// the register route
router.post("/register", registerController);


// the get user profile route
router.get("/profile", getUserProfile);

// get a list of the conversations of the current user
router.get("/conversations", function(req, res) {
    // this should include header with bearer token, same as on /profile route
    // based on the user ID it will show all the user's conversations
    res.status(200).json({
        "conversations": [
            {
                "id": "1", // some row id
                "conversationType": "private", // choice 'private' or 'group'
                "title": "conversation 1", // this is not necessary for private conversations and will not be showed on screen except for group conversations
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti reiciendis assumenda velit, aliquid vel error hic.", // this is not necessary for private conversations and will not be showed on screen except for group conversations
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
            },
            {
                "id": "2", // some row id
                "conversationType": "group", // choice 'private' or 'group'
                "title": "conversation 2", // this is not necessary for private conversations and will not be showed on screen except for group conversations
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti reiciendis assumenda velit, aliquid vel error hic.", // this is not necessary for private conversations and will not be showed on screen except for group conversations
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
            },
            {
                "id": "3", // some row id
                "conversationType": "private", // choice 'private' or 'group'
                "title": "conversation 3", // this is not necessary for private conversations and will not be showed on screen except for group conversations
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti reiciendis assumenda velit, aliquid vel error hic.", // this is not necessary for private conversations and will not be showed on screen except for group conversations
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
            },
        ]
    });
});

// this will not be necessary later on as we will be pushing the messages to the client
// using socket.io as well as pushing the messages to the server and database
router.get("/conversations/:conversationId/messages", function(req, res) {
    // this should include header with bearer token, same as on /profile route
    // based on the user ID it will show all the user's conversations
    res.status(200).json({
        "messages": [
            {
                "id": "1", // some row id
                "messageType": "text", // choices 'text', 'image', 'file'
                "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit facilis quibusdam eius dolorem. Tempore doloribus, fuga eveniet rerum assumenda obcaecati.",
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
                "conversationId": "1",
                "ownerId": "1",
            },
            {
                "id": "2", // some row id
                "messageType": "image", // choices 'text', 'image', 'file'
                "content": "https://www.some-random-website.com/some-image.jpg",
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
                "conversationId": "1",
                "ownerId": "1",
            },
            {
                "id": "3", // some row id
                "messageType": "text", // choices 'text', 'image', 'file'
                "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit facilis quibusdam eius dolorem. Tempore doloribus, fuga eveniet rerum assumenda obcaecati.",
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
                "conversationId": "1",
                "ownerId": "1",
            },
            {
                "id": "4", // some row id
                "messageType": "text", // choices 'text', 'image', 'file'
                "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit facilis quibusdam eius dolorem. Tempore doloribus, fuga eveniet rerum assumenda obcaecati.",
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
                "conversationId": "1",
                "ownerId": "1",
            },
            {
                "id": "5", // some row id
                "messageType": "file", // choices 'text', 'image', 'file'
                "content": "https://www.some-random-website.com/some-file.pdf",
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
                "conversationId": "1",
                "ownerId": "1",
            },
            {
                "id": "6", // some row id
                "messageType": "text", // choices 'text', 'image', 'file'
                "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit facilis quibusdam eius dolorem. Tempore doloribus, fuga eveniet rerum assumenda obcaecati.",
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
                "conversationId": "1",
                "ownerId": "1",
            },       
        ]
    });
});

// this route search a string on the content of the current user's conversations (if authenticated)
// and search user's email and usernames on the network, mostly to connect
router.get("/search", function (req, res) {
    // this is the search string format
    // ?q='some-string' 
    res.status(200).json({
        "users": [
            {
                "id": "1", // some row id
                "email":"user@email.com",
                "username": "username",
                "profilePicture": "https://www.some-random-website.com/some-image.jpg",
            },
            {
                "id": "2", // some row id
                "email":"user@email.com",
                "username": "username",
                "profilePicture": "https://www.some-random-website.com/some-image.jpg",
            },
            {
                "id": "3", // some row id
                "email":"user@email.com",
                "username": "username",
                "profilePicture": "https://www.some-random-website.com/some-image.jpg",
            },
        ],
        "conversations": [
            {
                "id": "1", // some row id
                "title":"title",
                "description":"description",
                "matchedSnippet": "some-string lalalalalalalalala", // this is a snippet of the conversation content, only the text messages content is allowed on the search, this will be 50 characters starting from the search string, only will show content that matches. Search is not case-sensitive
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
            },
            {
                "id": "2", // some row id
                "title":"title",
                "description":"description",
                "matchedSnippet": "some-string lalalalalalalalala", // this is a snippet of the conversation content, only the text messages content is allowed on the search, this will be 50 characters starting from the search string, only will show content that matches. Search is not case-sensitive
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
            },
            {
                "id": "3", // some row id
                "title":"title",
                "description":"description",
                "matchedSnippet": "some-string lalalalalalalalala", // this is a snippet of the conversation content, only the text messages content is allowed on the search, this will be 50 characters starting from the search string, only will show content that matches. Search is not case-sensitive
                "dateCreated": "01/02/2022-12:00:00 (non formatted yet)",
                "dateUpdated": "01/02/2022-12:00:00 (non formatted yet)",
            },
        ],
    });
});


module.exports = router;