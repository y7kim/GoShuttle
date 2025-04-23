import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home.vue';
import CreateRally from '../pages/CreateRally.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CreateRally',
    name: 'Create Rally',
    component: CreateRally
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;