
// -------------------------------------------- express server
const express = require('express');
const expressApp = express();
const expressPort = 8080;
const routes = require("./routes");

const cookieSession = require('cookie-session');

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

// import routes module
expressApp.use("", routes);


expressApp.listen(expressPort, () => {
    console.log(`listening on port ${expressPort}`);
});



// ---------------------------------------------------------------
// socket.io server
const io = require('./socket/mainSocketController').socketIOServer;
const httpServer = require('./socket/mainSocketController').httpServer;

const socketIOPort = 8081;


io.listen(socketIOPort, () => {
    console.log(`socket.io listening on port ${socketIOPort}`);
});


// postgressql drivers ----------------------------------------------------

// initiate sequelize from connection on the database directory
const sequelize = require('./database/sequelize');


// const connection = sequelize.sqlConnection;
// sequelize.syncDatabase();

// // sync the database
// connection.sync();


sequelize.testConnection();