const fs = require('fs');
const path = require('path');
const { promisify } = require('util');


const readFile = promisify(fs.readFile);

module.exports = [{
  match: '/file/:name',
  method: 'get',
  controller: async function(ctx, next) {
    const { name } = ctx.params;
    const content = await readFile(path.resolve(__dirname, '../', name));
  
    await ctx.render('file', { title: 'File', name, content });
  }  
}];