
// const store = createStore(reducer, null, applyMiddleware(logger1, logger2));

function Provider({ store, children }) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  return React.cloneElement(children, { state, dispatch: store.dispatch });
}

const logger1 = store => next => action => {
  console.log('before logger1');
  next(action);
  console.log('after logger1');
};

const logger2 = store => next => action => {
  console.log('before logger2');
  next(action);
  console.log('after logger2');
};

{/* <Provider store={store}>
  <App />
</Provider> */}
