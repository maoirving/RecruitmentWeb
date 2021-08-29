import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/job',
    name: 'Job',
    component: () => import('@/views/job/index')
  },
  {
    path: '/company',
    name: 'company',
    component: () => import('@/views/company/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
