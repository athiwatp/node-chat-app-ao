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

    // socketio.broadcast.emit('newMessage' , {
    //     from:"Admin" ,
    //     text:"New User to joined" ,
    //     createAt : new Date().getTime()
    // });

    socketio.on('createMessage', (message) => {
        console.log('createMessage : ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socketio.broadcast.emit('newMessage' , {
        //     from:message.from,
        //     text:message.text,
        //     createAt:new Date().getTime()
        // })
    });

    //DisConnect
    socketio.on('disconnect', () => {
        console.log("User was disconnected ");
    });
});


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

console.log(publicPath);



