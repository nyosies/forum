import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import('../views/timeline.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/blog.vue')
  },
  {
    path:'/hot/details',
    component:()=>import('../components/details/details')
  },
  {
    path:'/*',
    component:()=>import('@/views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
