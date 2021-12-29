const client = io();
const chatForm = document.getElementById('chat-form');


client.on('message', message => {   // msg frm server
    console.log(message);
    outputMessage(message);
});

chatForm.addEventListener('submit', (e) => {   // e - event
    e.preventDefault();

    const msg = e.target.elements.msg.value;    // text msg
    client.emit('chatMessage', msg);
});

// output msg to DOM
const outputMessage = ((message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    
    div.innerHTML = `
    <p class="meta">Bruce <span>7.26pm</span></p>
    <p class="text">
        ${message}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div)
});