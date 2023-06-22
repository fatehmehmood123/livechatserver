const io = require('socket.io')(3000);
users = {};
io.on('connection', socket =>{
    socket.on('user-added',userName=>{
        users[socket.id]=userName;
        socket.broadcast.emit('user-joined',userName);
    });
    socket.on('send-chat-message',(message)=>{
        socket.broadcast.emit("chat-message",message,users[socket.id]);
    });
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('disconnected',users[socket.id]);
        delete users[socket.id]
    });
});