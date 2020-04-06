const connect = require('connect');
const app = connect();

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function hello(req, res) {
  foo();
  res.setHeader('Content-type', 'text/plain');
  res.end('hello world');
}

function errorHandler(err, req, res, next) {
  res.statusCode = 500;
  console.log(`Error`);
  console.log(err);
  res.setHeader('Content-type', 'application/json');
  res.end(JSON.stringify(err));
}

app.use(logger);
app.use(hello);
app.use(errorHandler);
app.listen(3000);
