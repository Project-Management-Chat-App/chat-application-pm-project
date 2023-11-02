// this will be the main socket.io controller
const { createServer } = require("http");
const { Server } = require("socket.io");

const socketIOPort = 8081;

// in general, this is an HTTP server that will be used by socket.io, among other things
const httpServer = createServer();

// this will be used to add new socket.io events
const socketIOServer = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// this is the main socket.io event listener, it scans for new connections
// when a new connection is made, it will log a message to the console
socketIOServer.on('connection', (socket) => {
    console.log('a user connected');
    // when a user disconnects, it will log a message to the console
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

module.exports = {
    socketIOServer,
    httpServer,
}
