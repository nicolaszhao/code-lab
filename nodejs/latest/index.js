var fs = require('fs'),
	path = require('path'),
	express = require('express'),
	cookieParser = require('cookie-parser'),
	app = express();

var dataSourcePath = path.join(__dirname, 'data');

var getUserInfo = function(id, cb) {
	var file = path.join(dataSourcePath, 'user-' + id + '.json');

	fs.readFile(file, (err, data) => {
		if (err) {
			throw err;
		}

		cb(data.toString());
	});
};

app.use(cookieParser());
app.use(express.static('static'));

app.get('/user/:id', function(req, res) {
	getUserInfo(req.params.id, function(data) {
		res.json(data);
	});
});

app.listen(3344);

