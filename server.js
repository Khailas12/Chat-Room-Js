const express = require('express');
const port = 3000 || process.env.PORT;
const path = require('path');
const http = require('http');


const app = express();
const server = http.createServer();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});