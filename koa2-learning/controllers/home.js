module.exports = [{
  match: '/',
  method: 'get',
  controller: async function(ctx, next) {
    await ctx.render('home', { title: 'Home' });
  }
}];