import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/defaultLayout.vue'),

      meta:{
        auth:true
      },
      children:[
        {
          name:'tasksPage',
          path:'',
          component: () => import('../views/tasks/tasksIndex.vue'),
        },
        {
          name:'createTaskPage',
          path:'create',
          component: () => import('../views/tasks/addEditTask.vue'),
        },
        {
          name:'editTaskPage',
          path:'edit/:taskId',
          component: () => import('../views/tasks/addEditTask.vue'),
          props:true
        }
      ]
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
    const accessToken = authStore.token
    if (!accessToken) {
      return { name: 'loginPage' }
    }
  }
})
export default router
