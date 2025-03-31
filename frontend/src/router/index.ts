import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      component: () => import('../layouts/authLayout.vue'),

      children:[
        {
          path:'login',
          name:'loginPage',
          component: () => import('../views/auth/loginPage.vue'),
        },
        {
          path:'register',
          name:'registerPage',
          component: () => import('../views/auth/registerPage.vue'),
        }
      ]
    },
  ],
})

export default router
