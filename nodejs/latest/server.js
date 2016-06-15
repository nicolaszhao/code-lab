var http = require('http'),
	url = require('url');

var start = function(route, handle) {
	var requestHandler = function(req, res) {
		var pathname = url.parse(req.url).pathname;

		console.log('Request for ' + pathname + ' received.');

		route(handle, pathname, res, req);
	};

	http.createServer(requestHandler).listen(9999);

	console.log('Server has started.');
};

module.exports = {
	start: start
};