import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Redirect root to home or login based on auth status
  {
    path: '/',
    redirect: '/home',
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

  // Main app routes
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/HomePage.vue'),
      },
    ],
  },

  // Visitor QR route
  {
    path: '/visitor',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'visitor',
        component: () => import('pages/VisitorPage.vue'),
      },
    ],
  },

  {
    path: '/qrHistory',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'qrHistory',
        component: () => import('pages/QRHistoryPage.vue'),
      },
    ],
  },

  // Profile route
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('pages/ProfilePage.vue'),
      },
    ],
  },

  // Dashboard routes (redirect to home for backward compatibility)
  {
    path: '/dashboard',
    redirect: '/home',
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
