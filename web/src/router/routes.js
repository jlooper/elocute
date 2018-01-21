import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import About from '@/components/About';
import Auth from '@/components/Auth';
import TeacherHome from '@/components/TeacherHome';
import ClassroomHome from '@/components/ClassroomHome';
import AssignmentHome from '@/components/AssignmentHome';
import StudentHome from '@/components/StudentHome';

import { store } from '@/store/store';

import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/auth',
      name: 'login',
      component: Auth,
    },
    {
      path: '/home',
      name: 'home',
      component: TeacherHome,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/classroomhome/:id',
      name: 'ClassroomHome',
      component: ClassroomHome,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/assignmenthome/:classId/:id',
      name: 'AssignmentHome',
      component: AssignmentHome,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/studenthome/:id',
      name: 'StudentHome',
      component: StudentHome,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !store.state.user) next('auth');
  else
    //else if (!requiresAuth && currentUser) next('home');
    next();
});
export default router;
