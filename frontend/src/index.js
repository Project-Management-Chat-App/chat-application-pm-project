// using es6 modules
import $ from "jquery";
import { io } from "socket.io-client";

// do some jquery stuff
// $('body').css('font-size', '1.15rem');
// $('body').css('font-family', 'sans-serif');

// create a socket.io instance and establish a connection to the server 
const socket = io('http://localhost:8081');

// reference DOM items
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
});

socket.on("connect", () => {
    // console.log(socket.id);
});


// listen for form submission
form.addEventListener('submit', async (e) => {
    // prevent app page refresh on submission
    e.preventDefault();

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

// this listens for new messages from the server event "pull-messages-from-server"
// the server triggers this event, for example on app refresh, or
// when a new message is created
socket.on('push-messages-to-client', (messagesArray) => {

    // remove all the messages from the DOM first
    messages.innerHTML = '';

    // loop through the messages array and display each message
    for (let message of messagesArray ){
        // create a new list item to display the message
        const item = document.createElement('p');
        const content = document.createElement('span');
        const breakLine = document.createElement('br');
        const author = document.createElement('strong');
        
        // if it's a text message, create a text message item
        if (message.conversationType === 'text') {
            // display the author as the first 5 characters of the socket id
            author.textContent = new String(message.author).substring(0, 5) + " wrote: ";
            content.textContent = message.content;
        }

        item.appendChild(author);
        item.appendChild(breakLine);
        item.appendChild(content);

        // add the message item to the list of messages
        messages.appendChild(item);
    }

    // message appears at the bottom of the screen
    window.scrollTo(0, document.body.scrollHeight);
});
