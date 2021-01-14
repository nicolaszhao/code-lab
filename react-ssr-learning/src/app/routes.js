import Home from '../pages/Home';
import Popular from '../pages/Popular';
import { fetchPopularRepos } from '../api';

const routes = [
  {
    path: '/',
    redirectTo: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Popular,
    fetchInitialData: (path = '') => fetchPopularRepos(
      path.split('/').pop(),
    ),
  },
];

export default routes;
