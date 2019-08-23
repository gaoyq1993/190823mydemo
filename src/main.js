/*
入口JS
 */
//document.write('<h1>Hello World!</h1>');

import Vue from 'vue'
import App from './App.vue'
import {Button} from 'mint-ui'
//注册全局组件标签
Vue.component(Button.name,Button)  //<mt-button>
//引入路由器
import router from './router'
import store from './store'
//加载mockServer即可
import './mock/mockServer'
//引入图片懒加载
import VueLazyload from 'vue-lazyload'
//申明使用
import loading from './common/imgs/loading.gif'

//加载过滤器
import './filters'
Vue.use(VueLazyload,{  //内部自定义了一个指定lazy
  loading
})
new Vue({
  el:'#app',
  render:h=>h(App),
  //配置路由器
  router,//使用上vue-router
  store,  //使用上vuex
})






