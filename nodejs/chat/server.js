var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	mime = require('mime'),
	cache = {};
	
var send404 = function(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
};

var sendFile = function(response, filePath, fileContents) {
	response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
	response.end(fileContents);
};

var serveStatic = function(response, cache, absPath) {
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.exists(absPath, function(exists) {
			if (exists) {
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send404(response);
					} else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			} else {
				send404(response);
			}
		});
	}
};

var server = http.createServer(function(request, response) {
	var filePath = false,
		absPath;
	
	if (request.url === '/') {
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + request.url;
	}
	
	absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
	console.log('server listening on port 3000.');
});

var charServer = require('./lib/chat_server');
charServer.listen(server);
