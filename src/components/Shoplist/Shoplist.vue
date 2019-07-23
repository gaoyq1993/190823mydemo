<template>

    <div class="home">
      <div class="home_container">
        <img src="./images/a2.jpg">
        <div class="home_container_main">
          <p class="evaluate">好评</p>
          <span>甜品饮品1</span>
          <span>评分3.6</span>
          <span>售价$20</span>
        </div>
      </div>
      <div class="home_container">
        <img src="./images/a3.jpg">
        <div class="home_container_main">
          <p class="evaluate">好评</p>
          <span>甜品饮品2</span>
          <span>评分3.2</span>
          <span>售价$21</span>
        </div>
      </div>
      <div class="home_container">
        <img src="./images/a4.jpg">
        <div class="home_container_main">
          <p class="evaluate">中评</p>
          <span>甜品饮品3</span>
          <span>评分3.9</span>
          <span>售价$20</span>
        </div>
      </div>
      <div class="home_container">
        <img src="./images/a4.jpg">
        <div class="home_container_main">
          <p class="evaluate">差评</p>
          <span>甜品饮品7</span>
          <span>评分4.1</span>
          <span>售价$20</span>
        </div>
      </div>
    </div>

</template>

<script>
    export default {
        name: "Shoplist"
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
          margin-top 10px
          width 65%
          float left
          span
            display block
            margin-left 15px
            margin-bottom 10px
            width 60%
            font-size 16px
            color #666
          .evaluate
            float right
            width 20%





</style>
