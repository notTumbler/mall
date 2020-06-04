<template>
  <div class="tabbarItem" 
    @click="tabbarItemClick"
    :style="ActiveStyle"
  >
    <div class="iconImg">
      <slot name="icon-img"></slot>
    </div>
    <div class="iconText">
      <slot name="icon-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbarItem",
  props:{
    path:String,
    color:{
      type:String,
      default:'red'
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1;
    },
    ActiveStyle(){
      return this.isActive?{color:this.color}:{};
    }
  },
  methods: {
    tabbarItemClick(){
      this.$router.push(this.path);
      // 解决连续点击同一路由报错，下面的方法治标不治本 还是得去main.js里配置
      // this.$router.push(this.path,()=>{},(e)=>{
      //   console.log("输出报错：",e);
      // });
    }
  },
};
</script>

<style scoped >
@import "../../../assets/css/base.css";

.iconfont {
  font-size: 24px;
}

.tabbarItem {
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
}
.tabbarItem .iconText {
  margin-top: -1px;
}
</style>