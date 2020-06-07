<template>
  <div class="detail">
    <detail-nav-bar class="detailnavbar"   
    ref='detailnavbar'
    @DNBtiltleClick="DNBtiltleClick" />
    <scroll class="content" ref="chen"
      :probeType='3' @scrollPosition='detailscroll'
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="ParamInfo" />
      <detailCommentInfo ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

import { itemListenerMixin,backTopMixin } from "common/mixin"
import { debounce } from "common/debounce"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import detailNavBar from "./childDetails/detailNavBar";
import detailSwiper from "./childDetails/detailSwiper";
import detailBaseInfo from "./childDetails/detailBaseInfo";
import detailShopInfo from "./childDetails/detailShopInfo";
import detailGoodsInfo from "./childDetails/detailGoodsInfo";
import detailParamInfo from "./childDetails/detailParamInfo";
import detailCommentInfo from "./childDetails/detailCommentInfo";
import detailBottomBar from "./childDetails/detailBottomBar"

export default {
  name: "detail",
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    Scroll,
    detailGoodsInfo,
    detailParamInfo,
    detailCommentInfo,
    GoodsList,
    detailBottomBar
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      // 不能用goods:null 因为goods是以对象的形式绑定到子组件里的
      goods: {},
      shop: {},
      detailInfo: {},
      ParamInfo: {},
      commentInfo: {},
      recommend: [],
      tabOffsetTop:[],
      getTabOffsetTop:null,
      currentIndex:0,
    };
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid请求数据
    this.getDetailData();
    // 请求推荐数据
    this.getRecommendData();
    // 获取参数、评论等组件的offsetTop值,
    // 在creted里DOM未渲染完成，mounted里图片未加载完成，得到的值不正确；
    // 在$nextTick()里也不行，DOM刚渲染完毕，但是图片的高度并没有被计算在内，得到的值也不正确
    // 所以放在图片加载完成之后，下面先用防抖函数封装一下，再在图片加载完成监听事件里调用
    this.getTabOffsetTop = debounce(() => {
      this.tabOffsetTop = [];
      this.tabOffsetTop.push(0);
      this.tabOffsetTop.push(this.$refs.params.$el.offsetTop-44);
      this.tabOffsetTop.push(this.$refs.comment.$el.offsetTop-44);
      this.tabOffsetTop.push(this.$refs.recommend.$el.offsetTop-44);
      this.tabOffsetTop.push(Number.MAX_VALUE);
      // console.log(this.tabOffsetTop);
    },500);
  },
  destroyed() {
    this.$bus.$off("imgLoadFinish", this.itemImgListener);
    // console.log(21);
  },
  methods: {
    // 请求整体数据：商品、参数、评价(根据iid请求数据)
    getDetailData() {
      getDetail(this.iid).then(res => {
        const data = res.result;
        // 获取顶部轮播数据
        this.topImages = data.itemInfo.topImages;
        //  获取商品详细数据
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);
        // 保存商品详情数据
        this.detailInfo = data.detailInfo;
        // 获取参数信息
        this.ParamInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    // 请求推荐数据
    getRecommendData() {
      getRecommend().then(res => {
        this.recommend = res.data.list;
      });
    },
    
    imageLoad() {
      // 在mixins中的data里抽取出了newRefresh,所以这里可以直接用
      this.newRefresh();
      // 图片全部加载完成，获取各组件的offsettop值
      this.getTabOffsetTop();
    },
    // 点击对应的tab跳转至页面特定位置
    DNBtiltleClick(index) {
      this.$refs.chen.ScrollTozero(0,-this.tabOffsetTop[index],200);
    },
    // 监听scroll滚动事件
    detailscroll(position){
      // 1.获取y值 加-号将其变为正数 方便等下与刚才拿到的offsettop作比较
      const positionY = -position.y;
      //2.直接将[0,7968,9845,12654]循环会发生数组下标越界问题，
      // 所以我们鸡贼一点，给数组添加一个够大的值-Number.MAX_VALUE
      let length = this.tabOffsetTop.length;
      for (let i = 0; i < length-1; i++) {
        if (this.currentIndex !== i && (positionY > this.tabOffsetTop[i] && positionY < this.tabOffsetTop[i+1])) {
          this.currentIndex = i;
          this.$refs.detailnavbar.currentIndex = this.currentIndex;
        }
      }
      // 1.判断backTop是否显示
      this.showBackTop = -position.y > 1000;
    },
    // 添加商品到购物车中
    addToCart(){
      // 1.获取商品信息(只获取购物车需要展示的信息)
      const product = {};
      product.img = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      // 商品信息一定要带上id,不然购买操作无法完成
      product.iid = this.iid;

      // product.check = true;为什么不在vueX里添加呢？
      
      // 2.将商品添加到购物车里
      // this.$store.commit('addCart',product);
      this.$store.dispatch('addCart',product).then(res=>{
        this.$toast.show(res,2000);
      });
    }
  },
};
</script>

<style scoped >
.detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  /* 为了让下面开启了定位的元素有一个高度的参照标准 */
  height: 100vh;
}
.detailnavbar {
  position: relative;
  z-index: 9999;
}
.content {
  height: calc(100% - 98px);
  overflow: hidden;
}
</style>