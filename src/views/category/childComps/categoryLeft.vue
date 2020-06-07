<template>
  <Scroll class="content">
    <div  :class="{active:currentIndex === index}"
    class="cateLeftItem"
    v-for="(item, index) in cateLeftList" 
    :key="index"
    @click="itemClick(index)">{{item.title}}</div>
  </Scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "cateLeft",
  props: {
    cateLeftList: {
      type: Array,
      default() {
        return [];
      },
      
    }
  },
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex:0
    };
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      this.$emit('selectItem',index)
    }
  },
};
</script>

<style scoped lang='less'>
// less中这个active必须放在content里，不然背景颜色的级别没有cataLeftItem高
.content {
  height: 100%;
  overflow: hidden;
  .cateLeftItem{
    padding: 12px 0;
    text-align: center;
    background-color: #f6f6f6;
  }
  .active{
  border-left: 4px solid #fb7299;
  color: #fb7299;
  font-weight: 600;
  background-color:#ffffff;
}
}
</style>