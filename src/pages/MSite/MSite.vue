<template>
  <div class="mSite">
    <HeaderTOP :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-tubiaozhizuomoban"></i>
        </span>
      </router-link>
    </HeaderTOP>
    <!--首页导航轮播图-->
    <nav class="mSite_nav">
      <!-- swiper的容器div -->
      <div class="swiper-container" v-if="categorys.length">
        <!-- swiper的包裹层div -->
        <div class="swiper-wrapper">
          <!-- swiper的轮播div -->
          <div class="swiper-slide"  v-for="(categorys,index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- swiper轮播图圆点 -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家列表-->
    <div class="mSite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <Shoplist></Shoplist>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HeaderTOP from '../../components/HeaderTop/HeaderTop'
  import Shoplist from '../../components/Shoplist/Shoplist'
  export default {
    data(){
      return{
        baseImageUrl:'https://fuss10.elemecdn.com',
      }
    },
    mounted(){   //使用生命周期里的mounted 使页面已经加载了

      ////更新状态
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },
    computed:{
      //读状态
      ...mapState(['address','categorys','userInfo']),

      //根据拿到的categorys  一维数组 变为二维数组 一维数组长度8(轮播单页显示8个)
      categoryArr(){
        const  {categorys} = this
        const categoryArr=[]   //定义一个空二维数组
        const n=8  // 最多显示8个
        const  len = categorys.length
        const lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 )
        for (let i = 0; i < lineNum; i++) {
   // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
          const temp = categorys.slice(i*n, i*n+n)

          categoryArr.push(temp)
        }
        return categoryArr
      }
    },
    watch:{
      categorys(value){
        /*setTimeout(()=>{
          //创建一个Swiper实例实现轮播
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        },100)*/
      //界面更新就立即创建swiper  100ms  不准确
        this.$nextTick(()=>{   //一旦完成界面更新立即调用，应在数据更新之后
          //创建一个Swiper实例实现轮播
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }

    },
    components:{
      HeaderTOP,
      Shoplist
    }

  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.mSite  //首页
  width 100%
  .header
    width 100%
    height 45px
    position fixed
    z-index 100
    left 0
    top 0
    background-color #02a774
    display flex
    justify-content center
    text-align center
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .iconfont
        font-size 20px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
        i
          font-size 20px
  .mSite_nav
    bottom-border-1px(#e4e4e4)
    width 100%
    margin-top 50px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
          a
            text-decoration none
          .food_container
              display block
              margin-top 5px
              width 100%
              text-align center
              padding-bottom 5px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774




</style>
