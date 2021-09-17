import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/demo/index')
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
    path: '/job/detail',
    name: 'JobDetail',
    component: () => import('@/views/job/detail')
  },
  {
    path: '/company',
    name: 'Company',
    component: () => import('@/views/company/index')
  },
  {
    path: '/company/detail',
    name: 'CompanyDetail',
    component: () => import('@/views/company/detail')
  },
  {
    path: '/account',
    name: 'Account',
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
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/login/index')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/index'),
    children: [
      {
        path: '/admin/job',
        name: 'AdminJob',
        component: () => import('@/views/admin/job')
      },
      {
        path: '/admin/company',
        name: 'AdminCompany',
        component: () => import('@/views/admin/company')
      },
      {
        path: '/admin/message',
        name: 'AdminMessage',
        component: () => import('@/views/admin/message')
      },
      {
        path: '/admin/user',
        name: 'AdminUser',
        component: () => import('@/views/admin/user')
      },
      {
        path: '/admin/profile',
        name: 'AdminProfile',
        component: () => import('@/views/admin/profile')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
