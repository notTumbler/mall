<template>
  <div class="goods-list">
    <goods-list-item 
      v-for="(item, index) in goods" :key="index"
      :goodsItem="item"
     />
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem"
export default {
  name:"goods-list",
  components: {
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {

    }
  },
}
</script>

<style scoped >
  .goods-list{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>