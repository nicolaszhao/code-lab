export function createSubscribe() {
  const listeners = [];

  function subscribe(cb) {
    listeners.push(cb);
  }

  function dispatch() {
    listeners.forEach((listener) => listener())
  }

  return {
    subscribe,
    dispatch,
  };
}
