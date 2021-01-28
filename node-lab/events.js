const EventEmitter = require('events');

class A extends EventEmitter {

}

const a = new A();
a.on('data', function(data) {
  setImmediate(() => console.log('触发了 data 事件，%s', data));
});

a.emit('data', 'fuck~');