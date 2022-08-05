import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/login/login'
import register from '../views/register.vue'
import bindMobile from '../views/login/bindMobile'
import Layout from '../views/main/Layout.vue'
import classify from '../views/main/classify.vue'
import twoclassify from '../views/main/TwoClassify/TwoClassify.vue'
import bookinfo from '../views/main/TwoClassify/bookinfo.vue'
import jwtDecode from 'jwt-decode'
import home from '../views/main/home/home.vue'
import listitem from '../views/main/home/listitem.vue'
import search from '../views/main/home/search.vue'
import bookself from '../views/main/bookself/bookself.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',  component: Login,name:Login, meta: { title:"登录"} 
  },
  {
    path: '/register',  component: register,name:register, meta: { title:"登录" } 
  },
  {
    path: '/twoclassify',  component: twoclassify, meta: { title:"登录",isLogin:true   } 
  },
  {
    path: '/search', name:'search', component: search, meta: { title:"登录",isLogin:true   } 
  },
  {path: '/listitem',  component: listitem, meta: { title:"登录",isLogin:true } },
  {
    path:'/bookinfo/:bookid',component: bookinfo, meta: { title:"登录",isLogin:true   } 
    , name:'bookinfo',
  },
  {
    path: '/',  component: Layout , meta: { title:"登录",isLogin:true,keepAlive:false   } ,
    children:[ //二级路由。对应App.vue
      {path: '',  redirect: '/classify'},
      {path: '/index',  component: Index, meta: { title:"登录",isLogin:true } },
      {path: '/home',  component: home, meta: { title:"登录",isLogin:true } },
      {path: '/bookself',  component: bookself, meta: { title:"登录",isLogin:true } },
      // {path: '/u/bindMobile',  component: bindMobile, meta: { title:"绑定手机" } },
      {
        path: '/classify',  component: classify, meta: { title:"登录",isLogin:true } 
      },
    ], 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior: () => {
  //   history.pushState(null, null, document.URL)
  //  } 
})
 //全局前置路由
 router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){
    // console.log(localStorage.getItem('tuitui'))
    // jwtDecode(localStorage.getItem('tuitui'))
    var token=localStorage.getItem('tuitui')
    // token=jwtDecode(token)
    // console.log("www",jwtDecode(token))
    if(token)
    {
      token=jwtDecode(token)
      if(token.uid)
      // console.log("jjjjjjjjjj")
      next()
      else
      next('/Login')
    }
    else
    {
      console.log("jjjjjjjjjj")
      next('/Login')
    }
  }
  else{
    next()
  }
})


export default router
