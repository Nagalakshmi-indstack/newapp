const socket = io('/http://localhost:3000');
socket.on('chat-messege', data => {
    console.log(data)
})