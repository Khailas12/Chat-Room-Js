const client = io();


client.on('message', message => {
    console.log(message);
});