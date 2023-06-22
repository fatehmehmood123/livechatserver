const io = require('socket.io')(3000,{
    cors:{
        origin:["https://fatehmehmood123.github.io","http://localhost:5500"]
    }
});
var onlineCount = 1;
let users = {};
io.on('connection', socket =>{
    socket.on('user-added',userName=>{
        users[socket.id]=userName;
        onlineCount++;
        socket.broadcast.emit('user-joined',userName,onlineCount);
    });
    socket.on('send-chat-message',(message)=>{
        socket.broadcast.emit("chat-message",message,users[socket.id]);
    });
    socket.on('disconnect', ()=>{
        onlineCount--;
        socket.broadcast.emit('disconnected',users[socket.id],onlineCount);
        delete users[socket.id]
    });
});