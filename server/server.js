const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socketio) => {
    console.log('New use Connected');


    socketio.emit('newMessage' , {
       from:"Admin" ,
       text:"Welcome to the chat app" ,
        createAt : new Date().getTime()
    });

    socketio.broadcast.emit('newMessage' , {
        from:"Admin" ,
        text:"New User to joined" ,
        createAt : new Date().getTime()
    });

    socketio.on('createMessage', (message) => {
        console.log('createMessage : ', message);
        // io.emit('newMessage', {
        //     from: "Bot",
        //     text: "สบายดี คุณล่ะ สบายดีไหม",
        //     createAt: new Date().getTime()
        // });
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



