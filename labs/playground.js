const http = require('http');
class Context {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
}

class Application {
  middlewares = [];

  use(fn) {
    this.middlewares.push(fn);
  }

  listen(port) {
    const server = http.createServer(async (req, res) => {
      const ctx = new Context(req, res);
      const run = compose(this.middlewares);
      await run(ctx);
      ctx.res.end(ctx.body);
    });
    server.listen(port);
  }
}

function compose(middlewares) {
  return (ctx) => {
    function dispatch(i) {
      if (i < middlewares.length) {
        return middlewares[i](ctx, () => dispatch(i + 1));
      }
    }
    dispatch(0);
  };
}
