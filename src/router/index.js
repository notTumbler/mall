import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/home/Home')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('views/category/category')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('views/cart/cart')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('views/mine/mine')
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: () => import('views/detail/Detail')
  },
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
