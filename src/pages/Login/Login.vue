<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Mint外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button class="get_verification" :disabled="!rightphone"
                      :class="{right_phone:rightphone}" @click.prevent="getCode">
                {{computeTime>0 ? `已发送(${computeTime}s)`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册Mint外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-show="showpwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码"  v-show="hidepwd" v-model="pwd">
                <div class="switch_button" :class="showpwd?'on':'off'" :disabled="canclick"
                     @click.prevent="showpwd=!showpwd;hidepwd=!hidepwd">
                  <div class="switch_circle" :class="{right:showpwd}"></div>
                  <span class="switch_text" >{{showpwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" :src="captchasrc" alt="captcha"
                @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <!--利用$router.back()返回上一级路由 -->
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou4"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqPwdLogin, reqSendCode, reqSmsLogin} from '../../api'
    export default {
      data(){
          return{
            loginWay:true,  //true 代表 短信登录 false 代表 用户名登录
            computeTime:0,   // 倒计时时间
            showpwd:false,
            hidepwd:true,
            phone:'',  //手机号
            code:'',   //短信验证码
            name:'',   //用户名
            pwd: '',   //密码
            captcha: '',  //图形验证码
            captchasrc:'http://localhost:4000/captcha',  //图形验证码地址
            alertText: '',  //提示文本
            showAlert:false, //  默认不显示错误警告框
          }

      },
      computed:{
        //检验手机号是否合法  合法 增加right_phone类 使文本显示为黑色  否则还为灰色
        rightphone(){
          return /^1\d{10}$/.test(this.phone)
        },
        //密码  演示与隐藏
        canclick(){
          if(this.pwd==""){
            return true
          }else{
            return false
          }
        }
      },
      methods:{
        //异步获取验证码
        async getCode(){
          //启动计时
          // 停止计时有两类条件  1.无论当前是否获取到验证码，当computeTime为0时清除计时器
          //2. 当手机号不正确result.code===1 时 alerTip显示错误 并清除 计时器
          if(this.computeTime===0){  //当倒计时时间 等于0  时才能再次点击
            this.computeTime = 30
            this.intervalId=setInterval(()=>{
              this.computeTime--
              if(this.computeTime===0){  // 时间 减为0 清除计时器
                clearInterval(this.intervalId)
              }
            },1000)
            //发送ajax请求  (向指定手机发送验证码)
            const result = await reqSendCode(this.phone)
            if(result.code===1){
              //显示错误信息
              this.Showalert(result.msg)
              //停止计时
              if(this.computeTime){
                this.computeTime=0
                clearInterval(this.intervalId)
                this.intervalId= undefined
              }
            }
          }
        },
        //将提示框封装成公共方法
        Showalert(alertText){
          this.showAlert=true
          this.alertText=alertText
        },
        //  表单验证
        async login(){
          let result
          //前台表单验证
          if(this.loginWay){  //短信登录
            const {rightphone,phone,code}=this
            if(!this.rightphone){
              //手机号不正确
                //this.showAlert=true
              //this.alertText="手机号不正确"
              this.Showalert("手机号不正确")
              return
            }else if(!/^\d{6}$/.test(this.code)){
              //验证码不正确
              this.Showalert("验证码不正确")
              return
            }
            //  短信信息检测 成功后发送ajax请求  得到 用户信息result
             result = await reqSmsLogin(phone,code)
          }else{ //用户名登录
           const {name,pwd,captcha}=this
            if(!this.name){
              //用户名必须指定
              this.Showalert("用户名必须指定")
              return
            }else if(!this.pwd){
              //密码必须指定
              this.Showalert("密码必须指定")
              return;
            }else if(!this.captcha){
              //图形验证码必须指定
              this.Showalert("图形验证码必须指定")
              return;
            }
            //  以上 正确后 发送ajax请求
            result = await reqPwdLogin({name,pwd,captcha})
          }
          //条件都正确 发送ajax请求后 停止计时
          if(this.computeTime){   //成功  当前时间可能为1-29s  所以压迫将时间置为0  并清楚定时器
            this.computeTime=0
            clearInterval(this.intervalId)
            this.intervalId= undefined
          }
          //将得到的数据进行处理
          if(result.code===0){     //登录 操作正确
            const user = result.data
            //1.将user  保存到vuex 中的state
            this.$store.dispatch('recordUser',user)
            // 2.去个人中心界面
            this.$router.replace('/profile')  // 不需返回用replace
          }else{  //当返回code=1  即 登录有误    做两件事
            this.Showalert(result.msg)
            //重新获取图形验证码
            this.getCaptcha()
          }
        },
        //  @closeTip="closeTip"侦听子组件中自定义的事件
        //关闭警告框  父组件中定义一个closeTip()方法
        closeTip(){
          this.showAlert=false
          this.alertText=''
        },
        //切换图形验证码
        getCaptcha(){
          //alert(111)
          this.captchasrc='http://localhost:4000/captcha?time'+Date.now()
        },

      },
      components:{
        AlertTip
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          display flex
          justify-content center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            float left
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float left
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
