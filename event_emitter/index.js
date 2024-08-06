const EventEmitter = require('events');

const chat = new EventEmitter();

chat.on('start', () => {
    console.log('Started');
});

chat.on('start', () => {
    console.log('Started');
});

chat.on('start', () => {
    console.log('Started');
});

console.log(chat.listenerCount('start'));

console.log(chat.eventNames());

console.log(chat.listeners());

chat.emit('start');

chat.removeAllListeners('start');

chat.emit('start');