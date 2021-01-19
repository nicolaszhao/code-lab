import Vue from "vue";
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('./views/Home.vue'),
      },
      {
        path: '/product/:id',
        component: () => import('./views/Product.vue'),
      },
    ],
  });
}
