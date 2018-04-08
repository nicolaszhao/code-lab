var fs = require('fs'),
	path = require('path');

var rexthtml = /\.html?$/,
	rhtmlattrs = /<html([^>]+)>/i,
	rhtmlhead = /<head>((?:(?!<\/head>)[\S\s])+)<\/head>/i,
	rhtmltitle = /<title>((?:(?!<\/title>).)*)<\/title>/i;

var headTmpl, htmlAttrs,
	successCount = 0,
	errCount = 0,
	errFiles = [];

var rewriteHtml = function(src, dist, callback) {
	fs.readFile(src, function(err, data) {
		var file, head, title;

		if (err) {
			errCount++;
			errFiles.push(src + ' -- ' + JSON.stringify(err));
			return;
		}

		if (rexthtml.test(path.extname(src))) {
			file = data.toString();

			head = rhtmlhead.exec(file);
			head = head ? head[1] : '';

			title = rhtmltitle.exec(head);
			title = title ? title[1] : '';

			head =  headTmpl.replace(rhtmltitle, '<title>'+ title +'</title>');
			file = file.replace(rhtmlhead, '<head>' + head + '</head>');

			if (htmlAttrs) {
				file = file.replace('<html>', '<html' + htmlAttrs + '>');
			}

			fs.writeFile(dist, file, function(err) {
				if (err) {
					errCount++;
					errFiles.push(src + ' -- ' + JSON.stringify(err));
					return;
				}

				successCount++;
				callback();
			});
		} else {
			callback();
		}
	});
};

var findHtml = function(src, dist, done) {
	var srcFile, distFile, len;

	fs.readdir(src, function(err, files) {
		if (err) {
			errCount++;
			errFiles.push(src + ' -- ' + JSON.stringify(err));
			return;
		}

		len = files.length;

		var next = function(i) {
			var file;

			if (i < len) {

				process.stdout.write('.');

				file = files[i];
				srcFile = path.join(src, file);
				distFile = path.join(dist, file);

				fs.stat(srcFile, function(err, stats) {
					if (err) {
						errCount++;
						errFiles.push(srcFile + ' -- ' + JSON.stringify(err));
						return;
					}

					if (stats.isDirectory()) {
						fs.stat(distFile, function(err, stats) {
							if (err && err.code === 'ENOENT') {
								fs.mkdirSync(distFile);
							}

							findHtml(srcFile, distFile, function() {
								next(i + 1);
							});
						});
					} else {
						rewriteHtml(srcFile, distFile, function() {
							next(i + 1);
						});
					}
				});
			} else {
				done();
			}
		};

		next(0);
	});
};

var startTime = new Date();

var start = function(dir) {
	var tmplFile = path.join(dir, '/LibraryTemplate.html'),
		srcDir = path.join(dir, '/res'),
		distDir = path.join(dir, '/dist');

	fs.stat(tmplFile, function(err, stat) {
		if (err && err.code === 'ENOENT') {
			console.log('缺少模板文件：LibraryTemplate.html');
			return;
		}

		fs.readFile(tmplFile, function(err, data) {
			data = data.toString();
			var match = rhtmlhead.exec(data),
				attrs = rhtmlattrs.exec(data);

			if (match && match[1]) {
				headTmpl = match[1].replace(/\{0\}/g, '../../../');

				if (attrs && attrs[1]) {
					htmlAttrs = attrs[1];
				}

				fs.stat(srcDir, function(err, stats) {
					if (err && err.code === 'ENOENT') {
						console.log('缺少资源目录：res/');
						return;
					}

					fs.stat(distDir, function(err, stats) {
						if (err && err.code === 'ENOENT') {
							fs.mkdirSync(distDir);
						}

						findHtml(srcDir, distDir, function() {
							process.stdout.write(new Date() - startTime + 'ms\n');

							console.log('Success files: %d', successCount);
							console.log('Error files: %d', errCount);

							if (errFiles.length) {
								console.log('Error files list: ');

								errFiles.forEach(function(file) {
									console.log(file);
								});
							}
						});
					});
				});
			}
		});
	});
};

start('./');