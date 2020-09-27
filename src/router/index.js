import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
let router = new Router({
  linkActiveClass: "active",
  state: {},
  routes: [
    {
      path: '/login', component: () => import('@/view/login'), meta: { title: "登录" }
    },
    {
      path: '/',
      component: () => import('@/view/Layout'), meta: { title: "xxx管理系统" },
      redirect:"/index",
      children: [
        {
          path: '/index', component: () => import('@/view/Index'), meta: { title: "后台首页" }
        },
        { path: '/menu', component: () => import('@/view/System/menu'), meta: { title: "菜单管理" } },

        { path: '/role', component: () => import('@/view/System/role'), meta: { title: "权限管理" } },
        { path: '/banner', component: () => import('@/view/Shop/Banner'), meta: { title: "轮播管理" } },
        { path: '/category', component: () => import('@/view/Shop/Category'), meta: { title: "类别管理" } },
        { path: '/shop', component: () => import('@/view/Shop/Goods'), meta: { title: "商品管理" } },
        { path: '/specs', component: () => import('@/view/Shop/Specs'), meta: { title: "规格管理" } },
        { path: '/seckill', component: () => import('@/view/Shop/Seckill'), meta: { title: "秒杀管理" } },
        { path: '/user', component: () => import('@/view/System/User'), meta: { title: "用户管理" } },
        { path: '/member', component: () => import('@/view/Shop/Memeber'), meta: { title: "会员管理" } },
       
      ]


    },
    


  ]
})
router.beforeEach((to,from,next)=>{
  if (to.path=="/login"){  // 1、要去的地址是登录页面！
    document.title = to.meta.title
    next();   
  }else{  // 2、不是登录页面！就需要判断是否登录了！登录了才可以访问！
    if(localStorage.getItem("userinfo")){  // 登录了！
      let whiteList = store.getters['user/menus_url'];
      whiteList.push('/index')
      if(whiteList.includes(to.path)){  // 去的地址在 该用户可以访问的地址池中！
        document.title = to.meta.title
        next();
      }
    }else{ // 没有登录就想访问是直接跳转到登录页面！
      next('/login')
    }
  }
})
export default router;
