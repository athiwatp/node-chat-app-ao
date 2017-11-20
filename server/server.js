const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socketio) => {
    console.log('New use Connected');


    socketio.emit('newMessage', generateMessage('Admin', 'Welcom to the chat app'));
    socketio.broadcast.emit('newMessage', generateMessage('Admin', 'New User to joined'));

    socketio.on('createMessage', (message , callback) => {
        console.log('createMessage : ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from Server');
    });

    //DisConnect
    socketio.on('disconnect', () => {
        console.log("User was disconnected ");
    });
});


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});





