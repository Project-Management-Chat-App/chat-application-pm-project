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
const imageInput = document.getElementById('imageInput');
const messages = document.getElementById('messages');
// add author

let currentUserSocketId;

socket.on("connect_error", (err) => {
    //   console.log(`connect_error due to ${err.message}`);
});

socket.on("connect", () => {
    currentUserSocketId = socket.id;
});


// listen for form submission
form.addEventListener('submit', async (e) => {
    // prevent app page refresh on submission
    e.preventDefault();

    // Check for text message
    const textMessage = input.value;

    // Check for image file
    const imageFile = imageInput.files && imageInput.files[0] ? imageInput.files[0] : null;

    // Handle text message
    if (textMessage) {
        const myMessageObj = {
            conversationType: 'text',
            content: input.value,
            dateCreated: Date.now(),
            dateUpdated: Date.now(),
            // conversationId: 1,
            // ownerId: 1
            // author: "user1",
        };
        await socket.emit('create-new-message', myMessageObj);
        input.value = ''; // Clear the text input
    }

    // Handle image file
    if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = async function () {
            const myMessageObj = {
                conversationType: 'image',
                content: reader.result, // Base64 string
                dateCreated: Date.now(),
                dateUpdated: Date.now(),
                // conversationId: 1,
                // ownerId: 1
                // author: "user1",

            };
            
            await socket.emit('create-new-message', myMessageObj);
            imageInput.value = ''; // Clear the image input
        };
        let imageName = reader.readAsDataURL(imageFile);
        console.log("imageName: ", imageName);
    } 
});

// this listens for new messages from the server event "pull-messages-from-server"
// the server triggers this event, for example on app refresh, or
// when a new message is created

socket.on('push-messages-to-client', (messagesArray) => {

    // remove all the messages from the DOM first
    messages.innerHTML = '';

    // loop through the messages array and display each message
    for (let message of messagesArray) {
        // create a new list item to display the message
        const item = document.createElement('p');
        const content = document.createElement('p');

        content.className='message-content';

        const breakLine = document.createElement('br');
        const author = document.createElement('strong');
        const timestamp = document.createElement('span');
        // *** add line below
        timestamp.className = 'message-timestamp';


        // check if the message is today's message for timestamp formatting
        const messageDate = new Date(message.dateCreated);
        const today = new Date();
        const isToday = messageDate.getDate() === today.getDate() &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getFullYear() === today.getFullYear();




        // Formatting the date and time
        const timeFormatOptions = { hour: 'numeric', minute: 'numeric' };
        const dateFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
        if (isToday) {
            timestamp.textContent = messageDate.toLocaleTimeString([], timeFormatOptions);
        } else {
            timestamp.textContent = messageDate.toLocaleDateString([], dateFormatOptions) + ', ' +
                messageDate.toLocaleTimeString([], timeFormatOptions);
        }

        // if it's a text message, create a text message item
        if (message.messageType === 'text') {
            // display the author as the first 5 characters of the socket id
            author.textContent = new String(message.author).substring(0, 5) + " wrote: ";
            content.textContent = message.content;
        }

        if (message.messageType === 'image') {
            const image = document.createElement('img');
            // the image's base64 string
            image.src = message.content;
            image.alt = 'Received image';
            item.appendChild(image);
        }

        // assign the correct color to the message
        // (self = 
        if (message.author.startsWith(currentUserSocketId)) {
            // self messages
            item.style.backgroundColor = 'lightsteelblue';
        } else {
            // others' messages
            item.style.backgroundColor = 'peachpuff';
        }


        item.appendChild(author);
        item.appendChild(breakLine);
        item.appendChild(content);
        item.appendChild(timestamp);

        // add the message item to the list of messages
        messages.appendChild(item);
    }

    // message appears at the bottom of the screen
    window.scrollTo(0, document.body.scrollHeight);
});
