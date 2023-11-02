// this will be the main socket.io controller
const { createServer } = require("http");
const { Server } = require("socket.io");

const socketIOPort = 8081;

const httpServer = createServer();

const socketIOServer = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

socketIOServer.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

module.exports = {
    socketIOServer,
    httpServer,
}
