const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// fetching username and room from cdnqs in chat.html
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});
const client = io();


client.emit('joinRoom', { username, room });

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
    <p class="meta">${message.username} 
    <span>${message.time}</span>
    </p>

    <p class="text">
        ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
});