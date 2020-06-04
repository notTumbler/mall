<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "scroll",
  components: {},
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    // 在使用这些方法前确保scroll实例对象已被创建，不然在父组件里先于该组件mounted的钩子里调用会报错
    ScrollTozero(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    FinshPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    ScrollRefresh() {
      this.scroll && this.scroll.refresh();
      // console.log('-----');
    },
    // 获取离开home时的Y值
    getY(){
      return this.scroll?this.scroll.y:0;
    }
  },
  // activated() {
  //   this.scroll.refresh();
  // },
  // updated() {
  //   this.scroll.refresh();
  // },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      bounce: true,
      pullUpload: this.pullUpLoad,
      //值为0不派发,1:非实时,2,3派发scroll事件
      probeType: this.probeType
    });
    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
      this.$emit("scrollPosition", position);
    });
    }
    // 监听滚动到底部  上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
      this.$emit("loadMore");
      // this.FinshPullUp();
      // this.scroll.refresh();
    });
    }
  }
};
</script>

<style scoped >
</style>