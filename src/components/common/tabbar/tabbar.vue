<template>
  <div class="tabbar">
    <div class="tabbar-wrap">
      <tabbarItem path='/home'  color="skyblue">
        <div slot="icon-img" class="iconfont icon-shouye"></div>
        <div slot="icon-text" >首页</div>
      </tabbarItem>
      <tabbarItem path='/category' color="skyblue">
        <div slot="icon-img" class="iconfont icon-leimupinleifenleileibie"></div>
        <div slot="icon-text" >分类</div>
      </tabbarItem>
      <tabbarItem path='/cart' color="skyblue">
        <div slot="icon-img" class="iconfont icon-gouwuche"></div>
        <div slot="icon-text" >购物车</div>
      </tabbarItem>
      <tabbarItem path='/mine' color="skyblue">
        <div slot="icon-img" class="iconfont icon-wode"></div>
        <div slot="icon-text" >我的</div>
      </tabbarItem>
    </div>
   
  </div>
</template>

<script>
import tabbarItem from 'components/common/tabbar/tabbarItem'

export default {
  name:"tabbar",
  components: {
    tabbarItem
  },
  data() {
    return {
     
    }
  },
 
}
</script>

<style scoped >
/* 未设置z-index属性 */
@import "../../../assets/css/base.css";

.tabbar-wrap{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 49px;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, .1);
}
</style>