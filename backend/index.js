
// ---------------------------------------------------------------
// express server
const express = require('express');
const expressApp = express();
const expressPort = 8080;

// import routes module
const routes = require("./routes")

// expressApp.get('/', (req, res) => {
//     res.send('<h1>get response for the chat app</h1>');
// });

expressApp.use(express.json())
expressApp.use("", routes);

expressApp.listen(expressPort, () => {
    console.log(`listening on port ${expressPort}`);
});

// ---------------------------------------------------------------
// socket.io server
const io = require('./socket/mainSocketController').socketIOServer;
const httpServer = require('./socket/mainSocketController').httpServer;

// const { createServer } = require("http");
// const { Server } = require("socket.io");

const socketIOPort = 8081;
// const httpServer = createServer();
// const io = new Server(httpServer, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     })
// });

httpServer.listen(socketIOPort, () => {
    console.log(`socket.io listening on port ${socketIOPort}`);
});


// postgressql drivers ----------------------------------------------------

// initiate sequelize from connection on the database directory
const sequelize = require('./database/sequelize');


sequelize.testConnection();