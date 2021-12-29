const client = io();


client.on('messageFromServer', message => {
    console.log(message);
});