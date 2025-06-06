import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Redirect root to login
  {
    path: '/',
    redirect: '/auth/login',
  },

  // Authentication routes
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('src/features/auth/pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('src/features/auth/pages/RegisterPage.vue'),
      },
    ],
  },

  // Main app routes (will be populated later)
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        name: 'dashboard',
        component: () => import('pages/IndexPage.vue') 
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
