import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home'
import Login from '../components/Login'
import Assignments from '../components/Assignments'
import Assignment from '../components/Assignment'

import storeConf from '../store'

const router = new VueRouter({
  pageRouting: true,
    routes: [
        {
          path: '/login',
          component: Login,
          meta: { hiddenActionBar: true }
        },
        {
          path: '/home',
          component: Home,
          meta: { requiresAuth: true }
        },
        {
          path: '/assignments/:id',
          component: Assignments,
          meta: { requiresAuth: true }
        },
        {
          path: '/assignment/:id',
          component: Assignment,
          meta: { requiresAuth: true }
        },
        { path: '*', redirect: '/login' }
      ]
});

router.replace('/home');

module.exports = router;
