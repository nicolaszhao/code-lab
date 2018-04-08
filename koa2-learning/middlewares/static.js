const mount = require('koa-mount');
const server = require('koa-static');

module.exports = (fromPath, toPath) => {
  return mount(fromPath, server(toPath));
};