/*
* 通过mutation 间接更新state的多个方法的对象
* */
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
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShop
} from "../api";

export default {
 //异步获取地址
  async getAddress({commit,state}){
    //发送异步ajax请求
    const  geohash = state.latitude + ',' + state.longitude   // 参数
    const  result = await reqAddress(geohash)  //调用函数 得到promise对象
    //提交一个mutation
    if(result.code===0){   //判断数据  code=0为正常
      const  address = result.data    //取出promise 对象中的数据data
      commit(RECEIVE_ADDRESS,{address})  // 使用commit提交mutation来修改state
    }
  },
  //异步获取食品分类列表
  async getCategorys({commit}){
    //发送异步ajax请求
    const  result = await  reqFoodCategorys()  //调用函数 得到promise对象
    //提交一个mutation
    if(result.code===0){   //判断数据  code=0为正常
      const  categorys = result.data     //取出promise 对象中的数据data
      commit(RECEIVE_CATEGORYS,{categorys})  // 使用commit提交mutation来修改state
    }
  },

  //异步获取商家列表
  async getShops({commit,state}){
    //发送异步ajax请求
    const {longitude,latitude} = state
    const  result = await  reqShops(longitude,latitude)  //调用函数 得到promise对象
    //提交一个mutation
    if(result.code===0){   //判断数据  code=0为正常
      const  shops = result.data     //取出promise 对象中的数据data
      commit(RECEIVE_SHOPS,{shops})  // 使用commit提交mutation来修改state
    }
  },
 //同步记录用户信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USERINFO,{userInfo})
  },

  //异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code===0){
      const userInfo = result.data
      commit(RECEIVE_USERINFO,{userInfo})
    }
  },
  //异步退出登录
  async logout({commit}){
    const result = await reqLogout()
    if(result.code===0){
      commit(RESET_USERINFO)
    }
  },
  //异步获取商品数组
  async getShopGoods({commit},callback){
    const result = await reqShopGoods()
    if(result.code===0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      //数据更新通知组件
      callback && callback()
    }
  },
  //异步获取用户数组
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  },
  //异步获取评价数组
  async getShopRatings({commit},callback){
    const result = await reqShopRatings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      //数据更新通知组件
      callback && callback()
    }
  },
  //同步更新food 中的count
  updatefoodcount({commit},{isAdd,food}){
    if(isAdd===1){
      commit(INCRE_FOODCOUNT,{food})  // 方法(加或者减等), 参数(要传的)
    }else if(isAdd===2){
      commit(DECRE_FOODCOUNT,{food})  // 调用mutation 中的 DECRE_FOODCOUNT方法, 参数(要传的)
    }else if(isAdd===3){
      commit(CLEAR_CAETFOOD,{food})
    }

  },
  //同步清空购物车
  clearcart({commit}){
    commit(CLEAR_CAETFOOD)
  },

  // 异步获取商家商品列表
  async searchShops({commit, state}, keyword) {

    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
}
