const http = require('http');

class Context {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
}

class Application {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  listen(port = 3003) {
    const server = http.createServer(async (req, res) => {
      const ctx = new Context(req, res);
      const fn = compose(this.middlewares);
      await fn(ctx);
      ctx.res.end(ctx.body);
    });
    server.listen(port);
  }
}

function compose(middlewares) {
  return (ctx) => {
    const dispatch = (i) => {
      if (i === middlewares.length) {
        return;
      }
      return middlewares[i](ctx, () => dispatch(i + 1));
    };
    return dispatch(0);
  };
}

const app = new Application();

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('logger beging...');
  try {
    await next();
  } catch (err) {
    console.log(`System Error, `, err);
  }
  console.log('logger end!', '消耗时间: ', Date.now() - start);
});

app.use(async (ctx, next) => {
  ctx.body = 'fuck!!!';
  await next();
})

app.listen();
