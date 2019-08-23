<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--  current 标识当前分类 -->
          <li class="menu-item" v-for="(good,index) in goods" :key="index"
              :class="{current:index===currentindex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodUL">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index"
              @click="showFood(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售 {{food.sellCount}} 份</span>
                  <span>好评率 {{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"/>
                </div>
              </div>
            </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart :food="food"/>
    </div>
    <Food :food="food" ref="Food"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import  BScroll from 'better-scroll'
  import cartcontrol from '../../../components/cartcontrol/cartcontrol'
  import shopCart from '../../../components/shopCart/shopCart'
  import Food from '../../../components/Food/Food'
  export default {
    data(){
      return{
        scrollY:0, //右侧滑动的Y  轴坐标
        tops:[],  //右侧所有Li的top组成的数组
        food:{}  //  需要显示的food即当前点击的食物的信息
      }
    },
    mounted(){
      //this.$store.dispatch('getShopGoods')
      this.$store.dispatch('getShopGoods',()=>{
        //列表数据更新后执行
        this.$nextTick(()=>{
          this._initsctoll()
          this._inittops()
        })

      })
    },
    computed:{   //1.初始时执行 2.  相关数据发生变化时也执行
      ...mapState(['goods']),
      currentindex(){
        //得到数据
        const {scrollY,tops} = this
        //根据滚动的y轴距离scrollY  和 tops 中 的top 比较看在哪个区间内并返回下标
        const index = tops.findIndex((top,index)=>{
          return scrollY>=top&&scrollY<tops[index+1]
        })
        return index
      }
    },
    methods:{   //里面放事件回调函数 相关的方法
      //初始化滚动
      _initsctoll(){
        //列表显示之后创建
        new BScroll('.menu-wrapper',{
          click:true  // 默认值为false，则不会触发 click 事件 反之.
        })
        this.foodscroll = new BScroll('.foods-wrapper',{
          click:true,
          probeType: 2, //惯性 滑动不会触发
        })
        this.foodscroll.on('scroll',(event)=>{   // 利用on 监听scroll 获取 x y
          this.scrollY = Math.abs(event.y)
          //console.log(this.scrollY )
        })
        // 利用on 监听scrollEnd 获取 y  解决probeType: 3时惯性滑动 当惯性滑动截止时的scrollY和top比较
        this.foodscroll.on('scrollEnd',(event)=>{
          this.scrollY = Math.abs(event.y)
          //console.log('scrollEnd',this.scrollY )
        })
      },
      //初始化tops
      _inittops(){
        const tops=[]
        let top=0
        tops.push(top)
        //选中所有的li
        const lis = this.$refs.foodUL.getElementsByClassName('food-list-hook')
        //将伪数组lis 变为真数组后forEach遍历
        Array.prototype.slice.call(lis).forEach(li=>{
          top+= li.clientHeight   //表示的是可视区域的高度，不包含border和滚动条
          tops.push(top)  //每遍历一个 就加到tops 中去
        })
        //更新 tops
        this.tops= tops
        //console.log(tops)
      },
      //根据当前鼠标点击的li 的下标 去控制右侧foodscroll的top 的距离
      clickMenuItem(index){
        //console.log(index)
        const y = this.tops[index]
        //滚动到 一个x,y 坐标 这里x=0  y为top  menu-wrapper向上移动为负（平滑滚动右侧列表）
        this.foodscroll.scrollTo(0,-y,300)
        // 根据点击得到的当前下标得到当前top 即为当前foodscroll的scrollY  再根据currentindex判断index
        this.scrollY = this.tops[index]
      },
      showFood(food){
        //需要显示的 foodshow  用food  赋初值
        this.food = food
        //父组件调用子组件的方法
        this.$refs.Food.toogleShow()
      }
    },
    components:{
      cartcontrol,
      Food,
      shopCart
    }
    /*  // 使用watch 监听数据显示后再创建BScroll
    watch:{
      goods(value){
        this.$nextTick(()=>{
          new BScroll('.menu-wrapper')
        })
      }
    }*/
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            span
              float left
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
