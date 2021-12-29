const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const client = io();


client.on('message', message => {   // msg frm server
    console.log(message);
    outputMessage(message);
 
    chatMessages.scrollTop = chatMessages.scrollHeight;    // auto scroll
});

chatForm.addEventListener('submit', e => {   // e - event
    e.preventDefault();

    const msg = e.target.elements.msg.value;    // text msg
    client.emit('chatMessage', msg);

    // clear input
    e.target.elements.msg.value = '';    
    e.target.elements.msg.focus();
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

    document.querySelector('.chat-messages').appendChild(div);
});