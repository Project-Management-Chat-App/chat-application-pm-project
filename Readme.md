# Chat Application

## Backend

### Index.js on the root
This file executes on server starts. This initiates the rest of the parts of the backend code, such as routes, socket, database. Focus on socket dir for the moment.

### Socket.io server
This server will listen to 'create-new-message' events, which are triggered from the client. Receives the message object, save it into the messages array (or database). It finally emits or triggers event 'push-messages-to-client', which sends the messages to the client socket.io. Socket code is stored in the backend subdirectory called "socket" and there is only one file for the moment called mainSocketController.js. This is called from the index.js on the root of the backend directory.

### The message object
To get this project running, we are using an array instead of a database to store the messages, they are not compartamentalized into conversations and users either. Any user with access to the account can post it's request. The object structure of the message item is the following:
- messageType: string, choices ['text', 'image', 'file'], defaults to 'text'
- content: string
- dateCreated: Date, defaults to current date (and time)
- dateUpdated: Date, defaults to current date (and time)
- conversationId: foreign key for the conversation, integer, for the moment this defaults to 1 and doesn't do anything 
- ownerId: foreign key for the owner of the message, integer, for the moment this defaults to 1 and doesn't do anything 
- author: this is the username of the owner, for the moment it defaults to the first 5 characters of client socket id

### The express server
Will make use of this later. 

## Frontend

### Socket.io client
The client will listen to 'push-messages-to-client' socket event. The function will receive the message array from the server and store the values in the fronend browser DOM. This event is triggered on connection starts (when user enters or refresh the page ) and when a new comment is posted. This array of messages is stored in the server as a dummy array for now. We will store these in the database on future versions. 

## Socket functionality
For making new socket.io event handlers, please refer to the documentation to https://socket.io/docs/v4/. This consist of two parts, client and server drivers. These may function differently and have slightly different methods from each other. 

For the moment focus on these two methods socket.on('trigger-event-name', callback function) and socket.emit('trigger-event-name', function params). 

The socket.on will listen to events with the name specified in 'trigger-event-name', may or may not receive parameters in it's callback function. 

The event will be triggered by using socket.emit function. A client that calls this method will trigger the event listener on server, and vice versa. Takes the arguments 'trigger-event-name' and the arguments of the event listener callback function. Both socket.on and socket.emit work the same in client and server. 