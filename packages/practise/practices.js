export function deepMerge(target, ...sources) {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();
  Object.keys(source).forEach(key => {
    if (typeof target[key] === 'object' && typeof source[key] === 'object') {
      deepMerge(target[key], source);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  });
  return deepMerge(target, ...sources);
}

export class Events {
  constructor() {
    this.handlers = {};
  }
  on(type, handle) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handle);
  }
  trigger(type, ...data) {
    if (this.handlers[type]) {
      this.handlers[type].forEach(handle => {
        handle.call(this, ...data);
      });
    }
  }
  off(type, handle) {
    if (!handle) {
      delete this.handlers[type];
    } else if (this.handlers[type]) {
      this.handlers[type] = this.handlers[type].filter(cb => cb !== handle);
    }
  }
}
