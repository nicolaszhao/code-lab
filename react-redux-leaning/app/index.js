import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app.js';
import reducers from './reducers'

let store = createStore(reducers);

let rootElement = document.createElement('div');
rootElement.id = 'app';
document.body.appendChild(rootElement);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
