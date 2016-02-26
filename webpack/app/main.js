import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './component';

var main = function() {
	ReactDOM.render(<Hello />, document.getElementById('app'));
};

main();