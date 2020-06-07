<template>
  <div class="home">
    <nav-bar class="home-nav" bgcolor="skyblue">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
      class="tab-control" :titles="titles" 
      @tabClick="tabClick" ref="tabControlTwo"
      v-show="isFixed" ></tab-control>
    <Scroll
      class="contentone" ref="chen"
      :probe-type="3"
      @scrollPosition="scrollPosition"
      :pull-up-load="true"
      @loadMore="loadMore"
    >
      <home-swiper class="home-swiper" :banners="banners"
        @swipperimageLoad = 'swipperimageLoad'
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <rage-view></rage-view>
      <tab-control 
       :titles="titles" 
      @tabClick="tabClick" ref="tabControl"  
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </Scroll>
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import RageView from "./childComps/RageView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin,backTopMixin } from "common/mixin"
// import { debounce } from "common/debounce"
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    RageView,
    TabControl,
    GoodsList,
    Scroll,
    // 后来给抽到mixins里了
    // BackTop
  },
  mixins:[itemListenerMixin,backTopMixin],

  data() {
    return {
      // 将请求来的res分解细化为banner等等
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      // 流行、新款、精选 -> 分而治之
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      // showBackTop: false,在minxins里
      tabOffSetTop:0,
      isFixed:false,
      // 保存离开时的Y值
      saveY:0,
      // itemImgListener:null
    };
  },

  created() {
    // 请求数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // 用了keep-alive distoryed失效了,
  // destroyed() { 
  //   console.log('destoryed');
  // },

  // 后面给放到mixins里去了，因为detail页面里也是用来Scroll,在Scroll里的图片加载完成的时候，会发送总线事件来完成scroll的刷新，这能影响到首页里的总线接受事件
  // mounted() { 
    // 先是放在created里的，但是通过$refs和document.querySelector获取DOM元素的情况下，最好是放在mounted里

    // 防抖 已封装至common/debounce.js中
    // const refreshResult = debounce(this.$refs.chen.ScrollRefresh, 600);
    // 图片加载完成，收到GoodsListItem中的$bus.$emit()事件
    // this.$bus.$on("imgLoadFinish", () => {
    //   refreshResult();
    // });
  // },
  methods: {
   
    getHomeMultidata() {
      // 1、请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 2、请求流行、新款、精选的数据
      const page = this.goods[type].page + 1; //*妙极 type是变量 只能[]来取
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // scroll到底，重置上拉到底事件
        this.$refs.chen.FinshPullUp();
      });
    },
    // 事件监听相关事件
    // 改变展示的数据（流行、精选、新款）
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlTwo.currentIndex = index;
    },
    //后来~他又被抽到mixins里去了  返回顶部
    // backClick() {
    //   // 还有第三个参数time,但是给了默认值500,此处可不传
    //   this.$refs.chen.ScrollTozero(0, 0);
    // },
    // 获取当前滚动条的位置
    scrollPosition(position) {
      // 1.判断backTop是否显示
      this.showBackTop = -position.y > 1000;
      
      // 2.决定tabControl吸顶效果
      this.isFixed = (-position.y > 609);
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      // this.$refs.chen.FinshPullUp();
      
    },
    // 监听轮播图图片加载完毕
    swipperimageLoad(){
      // 通过$el拿到组件的offsettop
    this.tabOffSetTop = this.$refs.tabControl.$el.offsetTop;
    // console.log(this.tabOffSetTop);
    }
  },
    //因为batter-scroll,keepalive可能会拉胯(后来证明，那确实是拉胯了)
  // home页面在其它页面间来回切换时保存下scroll.position.y
  //通过进入activated时获取Y值,离开deactivated时保存Y值来达到类keepalive的效果
  activated() {
    // 先后顺序很重要啊 必须先刷新再定位，老师的可以，我的不行 难受
    this.$refs.chen.ScrollRefresh();
    this.$refs.chen.ScrollTozero(0,this.saveY,0);
  },
  deactivated() {
    this.saveY = this.$refs.chen.getY();
    // console.log(this.saveY);
    // 此处王老师好像忽略了
    this.$bus.$off('imgLoadFinish',this.itemImgListener);
  },

};
</script>
<style scoped>
.home {
  /* 不然轮播图会将屏幕宽高强行放大 */
  width: 100vw;
  height: 100vh;
  /* position: relative; */
}
/* .home-nav { 终究是在'真假切换栏'这关陨落了
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999; */
/* } */
/* .home-swiper {
  margin-top: 44px;
} */
/* 后来被包在scroll里，这个属性就失效了 */
/* .tab-control {
  position: sticky;
  top: 44px;
} */
.contentone {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control{
  position: relative;
  z-index: 9999;
}
</style>