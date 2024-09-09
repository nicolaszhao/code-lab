export function createStore(reducer, preloadedState, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let state;
  let listeners = [];
  const getState = () => state;
  const subscribe = (cb) => {
    listeners.push(cb);
    return () => listeners = listeners.filter(listener => listener !== cb);
  };
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  dispatch({ type: `@@redux/__INIT__${Math.random()}` });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export function combineReducers(reducers) {
  return (state = {}, action) => {
    let nextState = {};
    let hasChanged = false;
    Object.keys(reducers).forEach(key => {
      const previousStateForKey = state[key];
      const nextStateForKey = reducers[key](previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    });
    return hasChanged ? nextState : state;
  };
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    let store = createStore(...args);
    let middles = middlewares.map(middleware => middleware(store));
    let dispatch = compose(...middles)(store.dispatch);
    return {
      ...store,
      dispatch,
    }
  };
}

export function compose(...funcs) {
  if (!funcs.length) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((prev, current) => (...args) => prev(current(...args)));
}
