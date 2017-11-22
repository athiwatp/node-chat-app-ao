var moment = require('moment');
var date = moment();
console.log(date.format('h:mm a'));

var date = moment(new Date().getTime());
console.log(date);