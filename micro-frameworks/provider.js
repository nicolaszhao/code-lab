
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

{/* <Provider store={store}>
  <App />
</Provider> */}
