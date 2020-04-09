function createStore(reducer, initState, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer, initState);
  }
  let listeners = [];
  let state;

  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  const subscribe = (cb) => {
    listeners.push(cb);
    return () => listeners = listeners.filter((listener) => listener !== cb);
  }

  dispatch({ type: `@@redux/__INIT__${Math.random()}` });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

function combineReducer(reducers) {
  return (state = {}, action) => {
    const nextState = {};
    let hasChanged = false;
    Object.keys(reducers).forEach((key) => {
      const previousStateForKey = state[key];
      const nextStateForKey = reducers[key](previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || previousStateForKey !== nextStateForKey;
    });
    return hasChanged ? nextState : state;
  };
}

function applyMiddlerware(...middlerwares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    const middles = middlerwares.map((middlerware) => middlerware(store));
    const dispatch = compose(...middles)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}

function compose(...func) {
  if (!func.length) {
    return args => args;
  }
  if (func.length === 1) {
    return func[0]
  }
  return func.reduce((prev, next) => (...args) => prev(next(...args)));
}

// FOR TEST
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

const reducer = combineReducer({
  counter: counterReducer
});

const logger1 = store => next => action => {
  console.log(`logger 1 start...`);
  next(action);
  console.log(`logger 1 end...`);
}

const logger2 = store => next => action => {
  console.log(`logger 2 start...`);
  next(action);
  console.log(`logger 2 end...`);
}

const store = createStore(
  reducer,
  null,
  applyMiddlerware(logger1, logger2),
);

store.subscribe(() => {
  console.log(`state change: 
  ${JSON.stringify(store.getState(), null, 2)}
  `);
});

const delay = (time) => new Promise((r) => setTimeout(r, time));
store.dispatch({ action: 'INCREMENT' });
delay(1000).then(() => {
  store.dispatch({ type: 'INCREMENT' });
  return delay(500);
}).then(() => {
  store.dispatch({ type: 'DECREMENT' });
});

