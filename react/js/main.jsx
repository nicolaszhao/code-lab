var React = require('react'),
	ReactDOM = require('react-dom');

ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById('example')
);

var A = React.createClass({
	render: function() {
		return (<p>Nicolas.</p>);
	}
});