console.log("Hello World!");

// import io from 'socket';


// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// using es6 modules
import $ from "jquery";
import { io } from "socket.io-client";

// do some jquery stuff
// $('body').css('font-size', '1.15rem');
// $('body').css('font-family', 'sans-serif');

// create a socket.io instance and establish a connection to the server 
// const socket = io();
const socket = io('http://localhost:8081');

// reference DOM items
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("connect", () => {
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL

});


// listen for form submission
form.addEventListener('submit', async (e) => {
    // prevent app page refresh on submission
    e.preventDefault();

    console.log('form submitted');

    // check if the user entered a text message
    if (input.value) {
        const message = {
            conversationType: 'text',
            content: input.value,
            dateCreated: Date.now(),
            dateUpdated: Date.now(),
            conversationId: 1,
            ownerId: 1
        };

        // "emit" the chat chat event with the message content, save the return value in a variable
        await socket.emit('create-new-message', message);
        
        // clear the text message input field
        input.value = '';
    }
});


socket.on('pull-messages-from-server', (messagesArray) => {
    
    console.log('pulling messages from server');
    // create a new list item to display the message
    const item = document.createElement('p');

    // if it's a text message, create a text message item
    if (messagesArray.conversationType === 'text') {
        item.textContent = messagesArray.content;
    }

    // add the message item to the list of messages
    messages.appendChild(item);

    // message appears at the bottom of the screen
    window.scrollTo(0, document.body.scrollHeight);
});
