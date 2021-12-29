const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');


const expressApp = express();
const port = 3000 || process.env.PORT;
const server = http.createServer(expressApp);
const io = socketio(server)

// static folder access
const publicDirectoryPath = path.join(__dirname, '/public');
expressApp.use(express.static(publicDirectoryPath));


 // runs when client connects
io.on('connection', (client) => {
    io.emit('message', 'Welcome to WayCord');

    client.broadcast.emit('message', 'User joined the Chat');    // Broadcast when a single user connects

    client.on('disconnet', () => {
        io.emit('message', 'User Left the Chat')    
    });

    client.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });
}); 


server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});