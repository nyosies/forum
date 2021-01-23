import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      iscache: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      iscache: false
    }
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import('../views/timeline.vue'),
    meta: {
      iscache: false
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/blog.vue'),
    meta: {
      iscache: false
    }
  },
  {
    path: '/hot/details',
    component: () => import('../components/details/details'),
    meta: {
      iscache: true
    }
  },
  {
    path: '/error',
    component: () => import('@/views/error.vue'),
    meta: {
      iscache: false
    }
  },
  {
    path: '/notFound',
    component: () => import('@/views/notFound.vue'),
    meta: {
      iscache: false
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: {
      iscache: false
    }
  },
  {
    path: '/register',
    component: () => import('@/views/register.vue'),
    meta: {
      iscache: false
    }
  },
  {
    path: '/node',
    component: () => import('@/admin/views/node.vue'),
    meta: {
      iscache: false
    }
  },
  // admin
  {
    path: '/admin/index.vue',
    component: () => import('@/admin/views/index.vue'),
    children:[
      {path:'/admin/user',component:()=>import('@/admin/views/user.vue')},
      {path:'/admin/article',component:()=>import('@/admin/views/article.vue')},
      {path:'/admin/role',component:()=>import('@/admin/views/role.vue')},
      {path:'/admin/addArticle',component:()=>import('@/admin/views/addArticle.vue')}
    ],
    meta: {
      iscache: false
    }
  },
  {
    path: '/*',
    component: () => import('@/views/404.vue'),
    meta: {
      iscache: false
    }
  },

]

const router = new VueRouter({
  routes
})
/**
 * 全局路由守卫
 */
router.beforeEach((to, from, next) => {
   const userToken = localStorage.getItem('userToken')
  if (to.path == '/admin/index.vue' && !userToken) return next('/login')
  //放行
  next()
})
export default router
