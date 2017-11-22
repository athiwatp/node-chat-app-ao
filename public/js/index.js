var socket = io();
socket.on('connect', function () {
    console.log('Connect to Server !');

})
socket.on('disconnect', function () {
    console.log('Disconnected to Server !!');
});

socket.on('newMessage', function (message) {
    var formatTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: formatTime
    });
    jQuery('#list-message').append(html);

})

socket.on('newLocationMessage', function (newLocation) {
    var formatTime = moment(newLocation.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        text: newLocation.text,
        from: newLocation.from,
        createAt: formatTime,
        url: newLocation.url
    })
    // var li = jQuery('<li></li>');
    // var a = jQuery(' <a target="_blank"> My Location</a>');
    //
    // li.text(`${newLocation.from} at ${formatTime}`);
    // a.attr('href', `${newLocation.url}`);
    //
    // li.append(a);
    //
    jQuery('#list-message').append(html);
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var tvMessage = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: tvMessage.val()
    }, function () {
        tvMessage.val('');
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled', 'disabled')
        .text("Sending Location . . . ");
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text("Send Location");
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
        locationButton.removeAttr('disabled').text("Send Location");
    });
});