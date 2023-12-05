// -------------------------------------------- express server 
// import express module and session module
const express = require('express');
const cookieSession = require('cookie-session');

// import http routes module, it is in the same directory as this file named routes.js
const routes = require("./routes");

const expressPort = 8080; // port 8080 is the default port for express

// this will be needed to ensure that we have a public directory in our project
const ensureImageDirectoryExists = require("./socket/mainSocketController").ensureImageDirectoryExists;

// imports for retrieving public images
const fs = require('fs');
const path = require('path');


// initiate express
const expressApp = express();

// use cookie session
expressApp.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
    httpOnly: true,
    secure: false,
    domain: 'localhost',
}));
  
// this is used to parse the request body on express server calls as json
expressApp.use(express.json());

// import routes module
expressApp.use("", routes);

// make sure we have a public image directory
ensureImageDirectoryExists();

// Serve static files from the public directory
expressApp.use(express.static(path.join(__dirname, 'public')));


// start the express server
expressApp.listen(expressPort, () => {
    console.log(`listening on port ${expressPort}`);
});



// ---------------------------------------------------------------
// socket.io server
const io = require('./socket/mainSocketController').io;
const httpServer = require('./socket/mainSocketController').httpServer;

const socketIOPort = 8081; // port 8081 is the default port for socket.io

// start the socket.io server on port 8081
io.listen(socketIOPort, () => {
    console.log(`socket.io listening on port ${socketIOPort}`);
});


// postgressql drivers ----------------------------------------------------

// initiate sequelize from connection on the database directory
const sequelize = require('./database/sequelize');


// const connection = sequelize.sqlConnection;
sequelize.syncDatabase();

// // sync the database
// connection.sync();


sequelize.testConnection();