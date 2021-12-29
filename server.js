const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');


const expressApp = express();
const port = 3000 || process.env.PORT;
const server = http.createServer(expressApp);
const socketIo = socketio(server);

expressApp.use(express.static(path.join(__dirname, 'public')));     // static folder


socketIo.on('connection', socket => {
    console.log('Client connected')
});    // runs when client connects


server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});