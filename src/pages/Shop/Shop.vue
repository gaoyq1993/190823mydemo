<template>
  <div>
    <ShopHead/>
    <div class="tab">
      <div class="tab-item" @click="current=1">
        <router-link to="/shop/goods" :class="current===1?'current':'off'" replace>点餐</router-link>
      </div>
      <div class="tab-item" @click="current=2">
        <router-link to="/shop/rating" :class="current===2?'current':'off'" replace>评价</router-link>
      </div>
      <div class="tab-item" @click="current=3">
        <router-link to="/shop/info" :class="current===3?'current':'off'" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>

<script>
  import ShopHead from '../../components/ShopHead/ShopHead'
    export default {
    data(){
      return{
        current: 1,
      }
    },
    methods:{
    } ,
    mounted(){
      this.$store.dispatch('getShopInfo')
    },
    components:{
      ShopHead
    }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    margin-left 10%
    width 80%
    border-bottom 1px solid #E8E8E8
    position relative
    .tab-item
      margin-top 10px
      margin-bottom 5px
      height 21px
      width 32px
    div:nth-of-type(1)
      float left
    div:nth-of-type(2)
      position absolute
      left 50%
      transform translateX(-50%)
    div:nth-of-type(3)
      float right
    .current
      color #42b983
      &:after
        margin 5px 0px 4px -4px
        display block
        width 40px
        border-bottom 1px solid #42b983
</style>
