import Vue from 'vue';
import VueRouter from 'vue-router';
import Level from '../views/Level.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/level/:levelIdText',
    name: 'Level',
    component: Level,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
