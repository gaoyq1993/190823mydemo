<template>

  <div id="app">
    <router-view/>   <!-- 路由组件-->

    <FooterGuide v-show="$route.meta.showFooter"/>  <!-- 引用FooterGuide 映射的标签-->
  </div>

</template>

<script>
  //引入底部组件FooterGuide
    import FooterGuide from "./components/FooterGuide/FooterGuide";
    //底部组件FooterGuide 映射为标签
    export default {
      components: {FooterGuide}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background red
</style>
