var socket = io();
socket.on('connect', function () {
    console.log('Connect to Server !');

})
socket.on('disconnect', function () {
    console.log('Disconnected to Server !!');
});

socket.on('newMessage' , function (message) {
    console.log('new Message : ' , message );
})