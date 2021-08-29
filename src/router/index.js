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
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/account/index'),
    children: [
      {
        path: '/account/profile',
        name: 'profile',
        component: () => import('@/views/account/profile')
      },
      {
        path: '/account/resume',
        name: 'resume',
        component: () => import('@/views/account/resume')
      },
      {
        path: '/account/application',
        name: 'application',
        component: () => import('@/views/account/application')
      },
      {
        path: '/account/message',
        name: 'message',
        component: () => import('@/views/account/message')
      },
      {
        path: '/account/favorite',
        name: 'favorite',
        component: () => import('@/views/account/favorite')
      },
      {
        path: '/account/resetPassword',
        name: 'resetPassword',
        component: () => import('@/views/account/resetPassword')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
