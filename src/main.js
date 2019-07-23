/*
入口JS
 */
//document.write('<h1>Hello World!</h1>');

import Vue from 'vue'
import App from './App.vue'
//引入路由器
import router from './router'
new Vue({
  el:'#app',
  render:h=>h(App),
  //配置路由器
  router
})






