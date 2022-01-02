const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const leaveRoom = document.getElementById('leave-btn')


// fetching username and room from cdnqs in chat.html
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});
const client = io();


client.emit('joinRoom', { username, room });

client.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputRoomName(users);
}
);    // get room users


client.on('message', message => {   // msg frm server
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;    // auto scroll
});

chatForm.addEventListener('submit', (e) => {   // e - event
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


// add roomName to DOM
const outputRoomName = ((room) => {
    roomName.innerText = room;
});

// add users to DOM
const outputUsers = ((users) => {
    userList.innerHTML = '';

    users.forEach((user) => {
        const li = document.createElement('li');

        li.innerText = user.username;
        userList.appendChild(li);
    })
    
})

leaveRoom.addEventListener('click', () => {
    const leaveBtn = confirm('Are you sure you wanna leave the ChatRoom?');

    if (leaveBtn) {
        window.location = './index.html';
    }
    else {

    }
})
