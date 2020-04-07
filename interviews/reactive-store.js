// const ReactiveStore = require('reactive-store');
// window = global;

class ReactiveStore {
  constructor(data = {}) {
    this.data = data;
  }
  set(key, val) {
    this.data[key] = val;
  }
  get(key) {
    return this.data[key];
  }
  dump(key) {
    if (key) {
      return this.get(key);
    }
    return this.data;
  }
  load(data) {
    this.data = data;
  }
  wipe() {
    this.data = {};
    return this.data;
  }
}

const reactiveStore = new ReactiveStore();
reactiveStore.set('a', 'A');
reactiveStore.set('b', 'B');
