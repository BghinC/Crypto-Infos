import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import(/* webpackChunkName: "about" */ './views/Details.vue'),
    },
    {
      path: '/randomizer',
      name: 'randomizer',
      component: () => import(/* webpackChunkName: "about" */ './views/Randomizer.vue'),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
