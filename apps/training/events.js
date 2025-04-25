class Events {
  constructor() {
    this.callbacks = {};
  }
  on(type, handler) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }
    this.callbacks[type].push(handler);
  }
  off(type) {
    if (this.callbacks[type]) {
      delete this.callbacks[type];
    }
  }
  trigger(type, ...data) {
    if (this.callbacks[type]) {
      this.callbacks[type].forEach((cb) => cb(...data));
    }
  }
}

const event = new Events();
event.on('click', (message) => {
  console.log('trigger click event & receive message: ', message);
});
event.trigger('click', 'hi');
