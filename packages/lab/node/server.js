const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');

var root = path.resolve('.');

console.log('Static root dir: ' + root);

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = path.join(root, pathname);

  fs.stat(filePath, (err, stats) =>{
    if (err) {
      console.log(`404 ${req.url}`);
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }

    console.log(`200 ${req.url}`);

    if (stats.isFile()) {
      res.writeHead(200);
      fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      res.writeHead(200);
      fs.createReadStream(path.resolve(filePath, 'index.html')).pipe(res);
    }
  });
});

const port = 8888;

server.listen(port);

console.log(`Server is running at http://localhost:${port}`);