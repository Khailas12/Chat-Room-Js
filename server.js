const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');


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

        const user = userJoin(client.id, username, room);
        client.join(user.room);

        io.emit('message', formatMessage(botName, 'Welcome to WayCord'));   // welcome msg

        client.broadcast
            .to(user.room)
            .emit('message', 
            formatMessage(botName, `${user.username} joined the Chat`));    // Broadcast when a single user connects
    });
    
    client.on('chatMessage', (msg) => {
        const user = getCurrentUser(client.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    client.on('disconnet', () => {
        const user = userLeave(client.id);
        
        if (user) {
            io.to(user.room).
            emit(
                'message', 
                formatMessage(botName, `${user.username} Left the Chat`)
            );
        }
    });
});


server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});