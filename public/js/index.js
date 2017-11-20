var socket = io();
socket.on('connect', function () {
    console.log('Connect to Server !');
})
socket.on('disconnect', function () {
    console.log('Disconnected to Server !!');
});



//Receive
socket.on('newEmail', function (email) {
    console.log('New Email ' , email);
});
socket.on('sendMsg' , function (msg) {
    console.log('sendMsg : ' , msg);
    // if(msg[0].from('Ao')) {
    //     socket.emit('receiveMsg' , {
    //         to:"server" ,
    //         text:" สบายดี "
    //     })
    // }
});

//Send
socket.emit("createEmail" , {
    to : " to server ",
    text : "Text from ..."
});