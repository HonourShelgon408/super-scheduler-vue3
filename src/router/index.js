import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/assets',
    name: 'Assets',
    component: () => import('@/views/Assets.vue')
  },
  {
    path: '/contactus',
    name: 'ContactUs',
    component: () => import('@/views/ContactUs.vue')
  },
  {
    path: '/bugreport',
    name: 'BugReport',
    component: () => import('@/views/BugReport.vue')
  },
  {
    path: '/sendnotifications',
    name: 'SendNotifications',
    component: () => import('@/views/SendNotifications.vue')
  },
  {
    path: '/bugs',
    name: 'Bugs',
    component: () => import('@/views/Bugs.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
