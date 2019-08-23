<template>

  <div id="app">
    <router-view/>   <!-- 路由组件-->

    <FooterGuide v-show="$route.meta.showFooter"/>  <!-- 引用FooterGuide 映射的标签-->
  </div>

</template>

<script>
  import  {mapActions} from 'vuex'
  //引入底部组件FooterGuide
    import FooterGuide from "./components/FooterGuide/FooterGuide";
    //import  {reqFoodCategorys} from "./api";

  export default {
     mounted(){
        //触发某个action调用
        //this.$store.dispatch('getAddress')
     // const  result = await  reqFoodCategorys()
       //console.log(result)
       this.getAddress()
       this.getUserInfo()
      },
      methods:{
       ...mapActions(['getAddress','getUserInfo'])
      },

      //底部组件FooterGuide 映射为标签
      components: {
       FooterGuide
     }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
</style>
