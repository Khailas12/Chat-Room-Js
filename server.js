const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');


const expressApp = express();
const port = 3000 || process.env.PORT;
const server = http.createServer(expressApp);
const io = socketio(server)

// static folder access
const publicDirectoryPath = path.join(__dirname, '/public');
expressApp.use(express.static(publicDirectoryPath));

const botName = 'WayCord Bot';

// runs when client connects
io.on('connection', (client) => {
    client.on('joinRoom', ({ username, room }) => {

        io.emit('message', formatMessage(botName, 'Welcome to WayCord'));   // welcome msg

        client.broadcast.emit('message', formatMessage(botName, 'User joined the Chat'));    // Broadcast when a single user connects
    });

    client.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('user', msg));
    });

    client.on('disconnet', () => {
        io.emit('message', formatMessage(botName, 'User Left the Chat'));
    });
});


server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});