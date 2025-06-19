import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'src/stores/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Route guards
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    // Debug navigation attempts to /home
    if (to.path === '/home') {
      console.log('Navigation to /home requested:', {
        isAuthenticated: authStore.isAuthenticated,
        user: !!authStore.user,
        token: !!authStore.token,
        from: from.path
      });
    }
    
    // Routes that don't require authentication
    const publicRoutes = ['/auth/login', '/auth/register'];
    
    if (publicRoutes.includes(to.path)) {
      // If already authenticated, redirect to home
      if (authStore.isAuthenticated) {
        console.log('Redirecting authenticated user from auth page to /home');
        next('/home');
      } else {
        next();
      }
    } else {
      // Routes that require authentication
      if (authStore.isAuthenticated) {
        console.log('Allowing access to protected route:', to.path);
        next();
      } else {
        console.log('Redirecting unauthenticated user to /auth/login');
        next('/auth/login');
      }
    }
  });

  return Router;
});
