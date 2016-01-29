var fs = require('fs'),
	path = require('path'),
	http = require('http');

var MIME = {
	'.css': 'text/css',
	'.js': 'application/javascript'
};

var validateFiles = function(pathnames, callback) {
	var len = pathnames.length;

	var next = function(i) {
		if (i < len) {
			fs.stat(pathnames[i], function(err, stats) {
				if (err) {
					return callback(err);
				} else if (!stats.isFile()) {
					return callback(new Error());
				}

				next(i + 1);
			});
		} else {
			callback(null, pathnames);
		}
	};

	next(0);
};

var outputFiles = function(pathnames, writer) {
	var len = pathnames.length;

	var next = function(i) {
		var reader;

		if (i < len) {
			reader = fs.createReadStream(pathnames[i]);
			reader.pipe(writer, {end: false});
			reader.on('end', function() {
				next(i + 1);
			});
		} else {
			writer.end();
		}
	};

	next(0);
};

var parseUrl = function(root, url) {
	var base, pathnames, parts;

	if (url.indexOf('??') === -1) {
		url = url.replace('/', '??');
	}

	parts = url.split('??');
	base = parts[0];
	pathnames = parts[1].split(',').map(function(val) {
		return path.join(root, base, val);
	});

	return {
		mini: MIME[path.extname(pathnames[0])] || 'text/plain',
		pathnames: pathnames
	};
};

var main = function(conf) {
	var config = JSON.parse(fs.readFileSync(conf, 'utf-8')),
		root = config.root || '.',
		port = config.port || 80;

	http.createServer(function(req, res) {
		var urlInfo = parseUrl(root, req.url);

		combineFiles(urlInfo.pathnames, function(err, data) {
			if (err) {
				res.writeHead(404);
				res.end(err.message);
				return;
			}

			res.writeHead(200, {
				'Content-Type': urlInfo.mini
			});

			res.end(data);
		});
	}).listen(port, '127.0.0.1');
};

main(process.argv.slice(2)[0]);