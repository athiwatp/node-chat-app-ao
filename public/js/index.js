var socket = io();
socket.on('connect', function () {
    console.log('Connect to Server !');

})
socket.on('disconnect', function () {
    console.log('Disconnected to Server !!');
});

socket.on('newMessage', function (message) {
    console.log('new Message : ', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#list-message').append(li);
})

// socket.emit('createMessage', {from: "Ao", text: "text"}
//     , function (msg) {
//         console.log(msg);
//     })

jQuery('#message-form').on('submit' , function (e) {
    e.preventDefault();
    socket.emit('createMessage' , {
        from:'User' ,
        text:jQuery('[name=message]').val()
    } , function (e) {
        console.log(`e => ${e}`);
    })
});