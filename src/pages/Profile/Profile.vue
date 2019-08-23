<template>
  <div class="profile">
    <HeaderTOP title="我的"/>
    <div class="profile-number">
      <!-- 利用router-link实现到Login组件的跳转 先用div代替-->
      <router-link :to="userInfo._id ? '/userinfo':'/login'" class="profile-link">
        <div class="profile_image">
          <i class="iconfont icon-tubiaozhizuomoban"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-if="!userInfo.phone">{{userInfo.name || '登录/注册'}}</p>
          <p>
            <span class="user-icon">
              <i class="iconfont icon-44"></i>
            </span>
            <span class="icon-mobile-number">{{userInfo.phone || '暂无绑定手机号'}}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou"></i>
        </span>
      </router-link>
    </div>
    <div class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </div>
    <div class="profile_my_order border-1px">
    <!-- 我的订单 -->
      <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-dingdan1"></i>
          </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
              <i class="iconfont icon-icon_jiantou-you"></i>
            </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-jifen"></i>
          </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
              <i class="iconfont icon-icon_jiantou-you"></i>
            </span>
        </div>
      </a>
      <!-- 会员卡 -->
      <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-huiyuan"></i>
          </span>
        <div class="my_order_div">
          <span>硅谷外卖会员卡</span>
          <span class="my_order_icon">
              <i class="iconfont icon-icon_jiantou-you"></i>
            </span>
        </div>
      </a>
      <!-- 服务中心 -->
      <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-fuwuzhongxin"></i>
          </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
              <i class="iconfont icon-icon_jiantou-you"></i>
            </span>
        </div>
      </a>
      <a href='javascript:' class="my_order">
         <mt-button type="danger" style="width: 100%;margin-top: 10px" v-if="userInfo._id"
         @click="logout"
         >退出登录</mt-button>
      </a>
    </div>

  </div>
</template>

<script>
  import HeaderTOP from '../../components/HeaderTop/HeaderTop'
  import {mapState} from 'vuex'
  import { MessageBox,Toast } from 'mint-ui'
  export default {
    methods:{
      logout(){
        MessageBox.confirm('确认退出吗?').then(
          action => {
            //请求退出
            this.$store.dispatch('logout')
            Toast('退出成功!')
          },
          action => {
            console.log('点击了取消')
          }
          );
      },
    },
    //  login 登陆后  recordUser  保存了用户信息userInfo  这里直接用mapState 直接取数据即可
    computed:{
      ...mapState(['userInfo'])
    },
    components:{
      HeaderTOP
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .profile
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
        font-size 25px
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
  .profile-number
    margin-top 45.5px
    width 100%
    .profile-link
      clearFix()
      display block
      background #02a774
      padding 20px 10px
      .profile_image
        float left
        width 60px
        height 60px
        border-radius 50%
        overflow hidden
        margin-right 8px
        vertical-align top
        .icon-tubiaozhizuomoban
          background #e4e4e4
          font-size 62px
      .user-info
        width 50%
        height 60px
        color: #fff
        float left
        p
          font-size 16px
          margin-bottom 7px
        .user-icon
          margin-left -6px
          float left
          .icon-44
            font-size 30px
        .icon-mobile-number
          line-height 30px
          float left
      .arrow
        height 17px
        float right
        color: #fff
        .icon-jiantou
          line-height 60px
  .profile_info_data
    bottom-border-1px(#e4e4e4)
    width 100%
    background #fff
    overflow hidden
    .info_data_list
      clearFix()
      a
        text-decoration none
      .info_data_link
        float left
        width 33%
        text-align center
        border-right 1px solid #f1f1f1
        .info_data_top
          display block
          width 100%
          font-size 14px
          color #333
          padding 15px 5px 10px
          span
            display inline-block
            font-size 30px
            color #f90
            font-weight 700
            line-height 30px
        .info_data_bottom
          display inline-block
          font-size 14px
          color #666
          font-weight 400
          padding-bottom 10px
      .info_data_link:nth-of-type(2)
        .info_data_top
          span
            color #ff5f3e
      .info_data_link:nth-of-type(3)
        border 0
        .info_data_top
          span
            color #6ac20b
  .profile_my_order
    background #fff
    .my_order
      font-size 16px
      text-decoration none
      .iconfont
        font-size 20px
      .icon-dingdan1
        color #6ac20b
        margin-left 15px
      .icon-jifen
        color indianred
        margin-left 15px
      .icon-huiyuan
        color darkorange
        margin-left 15px
      .icon-fuwuzhongxin
        color forestgreen
        margin-left 15px
      .icon-icon_jiantou-you
        color gray
        font-size 13px
      span
        line-height 50px
        height 50px
        margin-top 5px
        float left
      .my_order_div
        border-bottom 1px solid #e4e4e4
        span:nth-of-type(1)
          color black
          margin-left 15px
        .my_order_icon
          color #666
          margin-right 10px
          float right
</style>
