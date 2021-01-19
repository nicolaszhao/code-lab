const Express = require('express');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const { renderToString } = createBundleRenderer(/* serverBundle */, {
  template: fs.readFileSync('./public/index.html', 'utf-8'),
  runInNewContext: false,
  clientManifest,
});
const createApp = require('./dist/entry-server');

const server = Express();
const PORT = 3003;

server.get('*', async (req, res) => {
  const context = { url: req.url };

  try {
    const app = await createApp(context);
    const html = await renderToString(app);

    res.end(html);
  } catch (err) {
    if (err.code === 404) {
      res.status(404).end('Page not found');
    } else {
      res.status(500).end('Internal  Server Error');
    }
  }
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



