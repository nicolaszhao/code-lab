module.exports = [{
  match: '/profile',
  method: 'post',
  controller: async function(ctx, next) {
    const { username = '', password = '' } = ctx.request.body;
  
    console.log(`Sign in with username: ${username}, password: ${password}`);
  
    if (username === 'koa' && password === '123456') {
      await ctx.render('profile', {
        isValid: true,
        username,
        password,
        title: 'Profile'
      });
    } else {
      await ctx.render('profile', {
        isValid: false,
        title: 'Profile'
      })
    }
  }
}];