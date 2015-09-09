var http = require('http'),
	fs = require('fs');
	
var server;
	
server = http.createServer(function(req, res) {
	if (req.url === '/') {
		res.end('Hi, Nicolas!');
	}
})

server.listen(8888);
