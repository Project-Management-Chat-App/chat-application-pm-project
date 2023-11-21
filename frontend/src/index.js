console.log("Hello World!");

// import io from 'socket';


import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// using es6 modules
import $ from "jquery";

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

// listen for form submission
form.addEventListener('submit', (e) => {
    // prevent app page refresh on submission
    e.preventDefault();

    // check if the user entered a text message
    if (input.value) {
        const message = {
            type: 'text',
            content: input.value,
        };

        // "emit" the chat chat event with the message content
        socket.emit('chat message', message);

        // clear the text message input field
        input.value = '';
    }
});

// listening for incoming chat messages from the server
socket.on('chat message', (msg) => {
    const messages = document.getElementById('messages');

    // create a new list item to display the message
    const item = document.createElement('p');

    // if it's a text message, create a text message item
    if (msg.type === 'text') {
        item.textContent = msg.content;
    }

    // add the message item to the list of messages
    messages.appendChild(item);

    // message appears at the bottom of the screen
    window.scrollTo(0, document.body.scrollHeight);

});

socket.listen(8081);
