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

    //DisConnect
    socketio.on('disconnect', () => {
        console.log("User was disconnected ");
    });

    //Send to Front End
    // socketio.emit('newEmail', {
    //     "from": "server => ",
    //     "text": " text from server",
    //     createAt: 123
    // });

    socketio.emit("sendMsg" , {
        from:"Ao" ,
        text:"สวัสดี สบายดีไหม ..." ,
        createAt: 1234
    })

    //Receivce From Front End
    socketio.on('createEmail' , (createEmail) => {
        console.log("create Email " , createEmail);
    });

    socketio.on('receiveMsg' , (msg) => {
        console.log("Server receiveMsg " , msg);
    })
});


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

console.log(publicPath);



