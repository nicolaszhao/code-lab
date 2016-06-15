var queryString = require('querystring'),
	fs = require('fs'),
	formidable = require('formidable');

var start = function(res) {
	console.log('Request handler "start" was called.');

	var body = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<title></title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
		</head>
		<body>
			<form action="/upload" method="post" enctype="multipart/form-data">
				<p>
					<input type="file" name="upload">
				</p>
				<button type="submit">Upload</button>
			</form>
		</body>
		</html`;

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(body);
	res.end();
};

var upload = function(res, req) {
	console.log('Request handler "upload" was called.');

	var form = new formidable.IncomingForm();

	console.log('about to parse');

	form.parse(req, function(err, fields, files) {
		console.log('parsing done');

		fs.renameSync(files.upload.path, 'tmp/test.png');
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(`<h4>received image:</h4><img src="/show" />`);
		res.end();
	});
};

var show = function(res, postData) {
	console.log('Request handler "show" was called.');

	fs.readFile('tmp/test.png', 'binary', function(err, file) {
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.write(err);
		} else {
			res.writeHead(200, {'Content-Type': 'image/png'});
			res.write(file, 'binary');
		}

		res.end();
	});
};

module.exports = {
	start: start,
	upload: upload,
	show: show
};