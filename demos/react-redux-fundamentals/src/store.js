import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from './addons/middleware';
import { monitorReducerEnhancer } from './addons/enhancers';
import rootReducer from './reducers';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [logger, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducerEnhancer]
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
