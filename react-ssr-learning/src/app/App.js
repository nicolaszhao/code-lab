import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import './app.css';
import Navbar from './Navbar';
import routes from './routes';
import Counter from '../features/counter/Counter';

// 服务端渲染的路由组件，会带上 staticContext 的 prop，你可以设置一个 status，让 server 知道该怎么做
function StatusRoute({ status, children }) {
  return (
    <Route 
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = status;
        }
        return children;
      }}
    />
  );
}

// 这里用配置的 routes 动态生成 Route 并不是唯一的实践方式，但为了处理 server 端初始化数据，似乎这样挺优雅
// 官方示例：https://reactrouter.com/web/guides/server-rendering/data-loading
const App = () => (
  <main className="container">
    <Navbar />
    <Switch>
      {routes.map(({ path, exact, redirectTo, fetchInitialData, component: Component }) => (
        redirectTo
          ? <Route key={path} exact path={path}>
              <StatusRoute status={302}>
                <Redirect to={redirectTo} />
              </StatusRoute>
            </Route>
          : <Route key={path} path={path} exact={exact} render={(props) => (
              <Component fetchInitialData={fetchInitialData} {...props} />
            )} />
      ))}
      <Route>
        <StatusRoute status={404}>
          <h2>404</h2>
        </StatusRoute>
      </Route>
    </Switch>
    <footer>
      <Counter />
    </footer>
  </main>
);

export default hot(App);
