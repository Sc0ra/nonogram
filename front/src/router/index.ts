import Vue from 'vue';
import VueRouter from 'vue-router';
import Level from '../views/Level.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/level/:levelId',
    name: 'Level',
    component: Level,
    props: true,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
