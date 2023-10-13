import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';
import { el } from 'date-fns/locale';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
      name: 'index',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  if (to.meta['requireAuth'] && !isAuthenticated()) next({ name: 'login', query: { from: to.fullPath }, });
  else if (to.meta['requireGuest'] && isAuthenticated()) next({ path: '/' });
  next();
});

export { router };
