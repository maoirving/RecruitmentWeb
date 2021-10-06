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
        path: '/account/interview',
        name: 'interview',
        component: () => import('@/views/account/interview')
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
    path: '/management/login',
    name: 'LoginManagement',
    component: () => import('@/views/login/index')
  },
  {
    path: '/management',
    name: 'Management',
    component: () => import('@/views/management/index'),
    children: [
      {
        path: '/management/job',
        name: 'JobManagement',
        component: () => import('@/views/management/job')
      },
      {
        path: '/management/company',
        name: 'CompanyManagement',
        component: () => import('@/views/management/company')
      },
      {
        path: '/management/application',
        name: 'ApplicationManagement',
        component: () => import('@/views/management/application')
      },
      {
        path: '/management/interview',
        name: 'InterviewManagement',
        component: () => import('@/views/management/interview')
      },
      {
        path: '/management/user',
        name: 'UserManagement',
        component: () => import('@/views/management/user')
      },
      {
        path: '/management/profile',
        name: 'ProfileManagement',
        component: () => import('@/views/management/profile')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
