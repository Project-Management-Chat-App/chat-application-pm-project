// postgressql drivers ----------------------------------------------------

// use the sequelize ORM to connect to the database
const { Sequelize } = require('sequelize');

// pass the .env variables to the connection string
const CONN_STRING = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const sqlConnection = new Sequelize(CONN_STRING) 


// test the connection function
async function testConnection() {
    try {
        await sqlConnection.authenticate();
        console.log('Connection with the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    sqlConnection,
    testConnection
}
