import fs from 'fs';
import { promisify } from 'util';

import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../src/features/counter/counterSlice';

// 序列化 JS 变量，注入 html
import serialize from 'serialize-javascript';

import App from '../src/app/App';
import routes from '../src/app/routes';

const readFile = promisify(fs.readFile);

const PORT = process.env.PORT || 3006;
const app = express();

// 配置 /build 目录为静态资源目录
app.use(express.static(
  './build',
  // 保证 index.html 的内容都是经过路由处理过的
  { index: false }
));

app.get('*', async (req, res) => {
  try {

    // 从前端配置的路由中，确定哪些需要获取初始数据的，如果没有，该方法返回 undefined
    const initialData = await fetchInitialData(req.path);

    // 把获取的初始数据注入到前端路由的 staticContext prop 中，方便各路由按需获取
    const context = { data: initialData };

    // 这是 redux server render 的示例，获取一个 1 到 100 见的随机值作为 counter 的初始数据状态
    const counter = await fetchCounter();
    // 这里也可以通过 redux 的 createStore 来配置，但需要注意 reducer 需要用 combineReducers 来包装一下
    const store = configureStore({ 
      reducer: {
        counter: counterReducer,
      },
      preloadedState: {
        counter: { value: counter },
      },
    });

    // 这里不用解释了吧，react 的 renderToString 将虚拟 Dom 序列化为 string，
    // 注意：前端导出的 App 不能包含 BrowserRouter 或者 HashRouter 
    // - Provider 和前端一样
    // - StaticRouter 用来替换前端的 BrowserRouter，详细查看官方示例：https://reactrouter.com/web/guides/server-rendering
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    // 如果配置的路由重定向了，context 的引用会新增 url 等字段，表示 310 或 302 等
    // context 的 status 可以通过前端层设置，具体官方示例：https://reactrouter.com/web/example/static-router
    if (context.url) {
      return res.status(context.status).location(context.url).end();
    }

    // 如果是 404 路由，应该继续返回完整 html 内容
    if (context.status) {
      res.status(context.status);
    }

    const body = await renderBody(html, store.getState(), initialData);
    
    res.send(body);
  } catch (err) {
    throw err;
  }
});

app.use(error);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

function error(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send('Internal Server Error');
}

function fetchInitialData(path) {
  const activeRoute = routes.find(route => matchPath(path, route));
  return activeRoute && activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(path)
    : Promise.resolve();
}

async function renderBody(html, preloadedState, initialData) {
  const body = await readFile('./build/index.html', 'utf8');
  return body.replace(
    '<div id="root"></div>',
    `
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${serialize(preloadedState)};
      window.__INITIAL_DATA__ = ${serialize(initialData)};
    </script>
    `
  );
}

function randomCounter(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function fetchCounter() {
  return Promise.resolve(randomCounter(1, 100));
}
