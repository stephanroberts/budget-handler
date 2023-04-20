import { createRouter, createWebHistory } from 'vue-router'
import CookieService from '@/services/CookieService'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/list/:id',
      name: 'expenseGroupList',
      component: () => import('../views/ExpenseGroupListView.vue')
    }
  ]
})

router.beforeEach(async(to, from) => {
  const cookieService = new CookieService();
  if (!cookieService.token && to.name !== 'login') {
    return { name: 'login'};
  }
})

export default router
