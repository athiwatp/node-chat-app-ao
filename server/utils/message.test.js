var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some Message';
        var message = generateMessage(from, text);

        expect(typeof(message.createdAt)).toEqual('number')
        //expect(message).toEqual({from, text});

    });
});