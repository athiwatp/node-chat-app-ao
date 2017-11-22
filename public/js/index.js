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

socket.on('newLocationMessage' , function (newLocation) {
    console.log('newLocation : ' , newLocation);
    var li = jQuery('<li></li>');
    var a = jQuery(' <a target="_blank">My Location</a>');

    li.text(`${newLocation.from}`);
    a.attr('href', `${newLocation.url}`);

    li.append(a);

    jQuery('#list-message').append(li);
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (e) {
        console.log(`e => ${e}`);
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    });
});