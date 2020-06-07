<template>
  <div class="cartlist">
      <Scroll class="content" ref="chen">
        <slot name='other'></slot>

        <cart-list-item 
        v-for="(item, index) in cartList" 
        :key="index" 
        :item-info = 'item'/>
      </Scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";

import cartListItem from "./cartListItem"
export default {
  name: "cartlist",
  components: {
    Scroll,
    cartListItem
  },
  computed: {
    ...mapGetters({
      cartList: "cartList"
    })
  },
  data() {
    return {};
  },
  activated(){
    this.$refs.chen.ScrollRefresh();
  }
};
</script>

<style scoped >
.cartlist{
  height:calc(100% - 92px - 45px);
}
.content {
  height: 100% ;
  overflow: hidden;
}
</style>