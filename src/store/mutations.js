/*
直接更新state的多个方法对象
* */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCRE_FOODCOUNT,
  DECRE_FOODCOUNT,
  CLEAR_CAETFOOD,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
 [RECEIVE_ADDRESS](state,{address}){  //传包含address 的对象
    state.address = address
 },
  [RECEIVE_CATEGORYS](state,{categorys}){  //传包含categorys的对象
  state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}){  //传包含shops 的对象
    state.shops = shops
  },
  [RECEIVE_USERINFO](state,{userInfo}){  //  存用户信息
    state.userInfo = userInfo
  },
  [RESET_USERINFO](state){  //  重置用户信息  赋值空对象
    state.userInfo = {}
  },
  [RECEIVE_GOODS](state,{goods}){  //
    state.goods = goods
  },
  [RECEIVE_RATINGS](state,{ratings}){  //
    state.ratings = ratings
  },
  [RECEIVE_INFO](state,{info}){  //
    state.info = info
  },

  [INCRE_FOODCOUNT](state,{food}){  //  food为action 中传过来的参数
    if(!food.count){   //没有count  则点击+后初始为1
      //food.count=1  //  新增属性没有数据绑定
      //  利用数据绑定中的set函数(数据变化更新视图)
      Vue.set(food,'count',1)
      //将food 添加到cartFoods 中
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },
  [DECRE_FOODCOUNT](state,{food}){  //
    if(food.count>0){
      food.count--
      if(food.count===0){
        // 找到count 为0 的food 的下标 将food 从cartFoods 中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CAETFOOD](state){

    //  遍历购物车中存在的食物  将food  里面的count 置 0
    // 将food中的count重置为0
      state.cartFoods.forEach(
        food=>food.count=0
      )
    //清空购物车
    state.cartFoods=[]

  },
  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },
}
