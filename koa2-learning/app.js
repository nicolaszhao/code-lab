const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const logger = require('./middlewares/logger');
const views = require('./middlewares/view');
const controller = require('./middlewares/controller');
const static = require('./middlewares/static');


const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(views(path.join(__dirname, 'views')));
app.use(controller(path.join(__dirname, 'controllers')));
app.use(static('/static', path.join(__dirname, 'assets')));

const port = '3031';

app.listen(port);
console.log(`App started at port ${port}...`);
