const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cookieSession = require('cookie-session');
const routes = require("./routes");
// const sequelize = require('./database/sequelize'); // Database-related code

const expressApp = express();
const expressPort = 8080;
const httpServer = http.createServer(expressApp);
const io = socketIO(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

// Serve static files from 'public' directory
expressApp.use(express.static('public'));

expressApp.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
    httpOnly: true,
    secure: false,
    domain: 'localhost',
}));

expressApp.use(express.json());
expressApp.use("", routes);

// Socket.io setup
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(expressPort, () => {
    console.log(`Server listening on port ${expressPort}`);
});

// sequelize.testConnection(); // Uncomment if using database
