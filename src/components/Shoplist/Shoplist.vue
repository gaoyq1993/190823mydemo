<template>

    <div class="home">
      <div v-if="shops.length">
        <div class="home_container" v-for="(shop,index) in shops" :key="index" @click="$router.push('/shop')">
          <img src="./images/a1.jpg">
          <div class="home_container_main">
            <div class="main_top">
              <span>品牌</span>
              <p class="ellipsis">{{shop.name}}</p>
              <ul>
                <li v-for="(support,index) in shop.supports" :key="index">
                  {{support.icon_name}}
                </li>
              </ul>
            </div>
            <div class="main_content">
              <Star :score="shop.rating" :size="24"/>
              <span class="rating">{{shop.rating}}</span>
              <span class="ordernum">月销{{shop.recent_order_num}}单</span>
              <span class="deliverytxt">{{shop.delivery_mode.text}}</span>
            </div>
            <div class="main_footer">
            <span>
              ￥{{shop.float_minimum_order_amount}}起送
              /配送费约￥{{shop.float_delivery_fee}}
            </span>
            </div>
          </div>
        </div>
      </div>
      <ul v-else>
        <li v-for="item in 6">
          <img src="./images/shop_back.svg" alt="back">
        </li>
      </ul>
    </div>

</template>

<script>
  import {mapState} from 'vuex'
  import Star from '../Star/Star'
    export default {
    data(){
      return{
        // baseImgUrl+shop.image_path 图片地址 无效,  用本地图片代替
        baseImgUrl:'http://cangdu.org:8001/img/'
      }
    },
      computed:{
          ...mapState(['shops'])
      },
      components:{
        Star
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .mSite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    margin-bottom 67px
    background #fff
    .shop_header
      padding 10px 10px 0
      .icon-xuanxiang
        float left
      .shop_icon
        color #999
      .shop_header_title
        margin-left 8px
        float left
        color #999
        font-size 14px
        line-height 20px
    .home
      width 100%
      height 100%
      .home_container
        width 100%
        img
          float left
          display block
          width 100px
          height 100px
          margin 10px
        .home_container_main
          margin-left 1%
          margin-top 10px
          width calc(100% - 140px)
          float left
          .main_top
            height 32px
            width 100%
            span:nth-of-type(1)
              font-size 13px
              margin-top 8px
              background-color #FFD700
              float: left
            p
              line-height 32px
              width 45%
              font-weight:bold
              font-size 100%
              margin-left 2%
              float: left
            ul
              letter-spacing:8px
              font-size 13px
              color #A9A9A9
              float: right
              li
                line-height 32px
                float left
                list-style-type:none
          .main_content
            height 32px
            width 100%
            span
              font-size 10px
            .rating
              color darkorange
              font-weight:bold
              margin-left 2%
              line-height 32px
              font-size 12px
              float: left
            .ordernum
              color #A9A9A9
              margin-left 3%
              line-height 32px
              float: left
            .deliverytxt
              margin-right 1%
              margin-top 5px
              display block
              border 1px solid #02a774
              font-size 12px
              color #02a774
              float: right
          .main_footer
            height 32px
            width 100%
            span
              letter-spacing:1px
              font-size 13px
              line-height 32px
              color: #808080





</style>
