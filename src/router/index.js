/*
*
* 路由器对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'  //引入VueRouter构造函数
import MSite from '../pages/MSite/MSite.vue';
import Search from '../pages/Search/Search.vue';
import Profile from '../pages/Profile/Profile.vue';
import Order from '../pages/Order/Order.vue';
import Login from "../pages/Login/Login";



//申明使用插件
Vue.use(VueRouter)
//创建路由对象并配置路由规则
export  default  new VueRouter({
  //所有路由
  //mode: 'history',    //路由模式history
  routes:[
    {
      path:'/mSite',
      component:MSite,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/',
      redirect:'/mSite'  //默认显示mSite
    }
  ]
})
