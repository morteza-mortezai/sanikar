import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomeView,
      meta:{
        auth:true
      }
    },
    {
      path: '/auth',
      component: () => import('../layouts/authLayout.vue'),

      children: [
        {
          path: 'login',
          name: 'loginPage',
          component: () => import('../views/auth/loginPage.vue'),
        },
        {
          path: 'register',
          name: 'registerPage',
          component: () => import('../views/auth/registerPage.vue'),
        },
      ],
    },
  ],
})
router.beforeEach((route) => {
  if (route.meta.auth) {
    const authStore = useAuthStore()
    // const accessToken = SessionStorage.getItem('access_token');
    const accessToken = authStore.token
    if (!accessToken) {
      // SessionStorage.set('return', String(route.name));
      return { name: 'loginPage' }
    }
  }
})
export default router
