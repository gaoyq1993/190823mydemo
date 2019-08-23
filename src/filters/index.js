import Vue from 'vue'
//import moment from 'moment'
import format from 'date-fns/format'
//自定义时间过滤器
Vue.filter('date-format',function(value,formatstr='yyyy-MM-dd HH:mm:ss'){
  //return moment(value).format(formatstr)
  return format(value,formatstr)
})

