// this will be the main socket.io controller
const { createServer } = require("http");
const { Server } = require("socket.io");


// make a dummy conversationObj array to store conversations, this will be provisional while we make the database sync
let messageArray = [
    {
        conversationType: 'text',
        content: 'hello',
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        conversationId: 1,
        author: 'asdasd',
        ownerId: 1
    },
    {
        conversationType: 'text',
        content: 'world',
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        conversationId: 1,
        author: 'dssdsd',
        ownerId: 1
    }
];

// in general, this is an HTTP server that will be used by socket.io, among other things
const httpServer = createServer();


// this will be used to add new socket.io events
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
    rejectUnauthorized: false,
    
});

// this is the main socket.io event listener, it scans for new connections
// when a new connection is made, it will log a message to the console
io.on('connection', async (socket) => {
    console.log('a user connected');

    // when a new connection is made, it will send the messageArray to the client
    await socket.emit('push-messages-to-client', messageArray)


    // when a user disconnects, it will log a message to the console
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // listening for incoming chat messages from the server
    socket.on('create-new-message', async (messageObj) => {
        // use interface to type the messageObj
        let conversation = new Object();

        // check if the user entered a text message correctly, only text, image, and file are allowed, else default to text
        if (messageObj.conversationType === 'text' || messageObj.conversationType === 'image' || messageObj.conversationType === 'file') {
            conversation.conversationType = messageObj.conversationType;
        } else {
            conversation.conversationType = 'text';
        }

        // add the rest of the conversation
        conversation.content = messageObj.content;
        conversation.dateCreated = Date.now();
        conversation.dateUpdated = Date.now();
        conversation.conversationId = 1;
        conversation.ownerId = 1;
        // name the author of the message as the socket id
        conversation.author = socket.id + "saasas";

        // add the messageObj to the messageArray
        await messageArray.push(conversation);

        // return the message array to the client using server emit
        await io.emit('push-messages-to-client', messageArray);

    });
});





module.exports = {
    io,
    httpServer,
}
