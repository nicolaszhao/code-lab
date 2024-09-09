const Router = require('koa-router');
const koaCompose = require('koa-compose');
const fs = require('fs');
const path = require('path');


const router = Router();

module.exports = (controllersPath) => {
  const files = fs.readdirSync(controllersPath);
  const modules = files.filter(file => file.endsWith('.js'));
  let mappings = [];

  for (let moduleName of modules) {
    const mapping = require(path.join(controllersPath, moduleName));

    mappings = [...mappings, ...mapping];
  }

  for (let mapping of mappings ) {
    router[mapping.method](mapping.match, mapping.controller);
  }

  return koaCompose([router.routes(), router.allowedMethods()]);
};