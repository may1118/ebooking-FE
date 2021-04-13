import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Index from '../layout/Index.vue';
import Login from '../layout/Login.vue';
import Register from '../layout/Register.vue';
import HotelRegister from '../layout/HotelRegister.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/hotelRegister',
    name: 'HotelRegister',
    component: HotelRegister,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
