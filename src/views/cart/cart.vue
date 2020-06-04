<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="home-nav" bgcolor="skyblue">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import NavBar from "components/common/navbar/NavBar"

import cartList from "./childCart/cartList"
import cartBottomBar from "./childCart/cartBottomBar"

export default {
  name:"cart",
  components: {
    NavBar,
    cartList,
    cartBottomBar
  },
  computed:{
    // cartListLength(){
    //   return this.$store.state.cartList.length;
    // }
    // 这里使用vuex里的getters代替计算属性，也可以用数组的形式['one','two']
    ...mapGetters({
      cartListLength:'cartListLength',
      cartList:'cartList'
    })
  },
  data() {
    return {

    }
  },
}
</script>

<style scoped >
  .cart{
    height: 100vh;
  }
</style>