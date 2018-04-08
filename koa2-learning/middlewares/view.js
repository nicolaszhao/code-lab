const koaNunjucks = require('koa-nunjucks-2');

module.exports = (viewsPath) => {
  return koaNunjucks({
    ext: 'html',
    path: viewsPath,
    nunjucksConfig: {
      trimBlocks: true,
      noCache: process.env.NODE_ENV === 'development'
    }
  });
};