<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="home-nav" bgcolor="skyblue" slotcolor='yellow'>
      <div slot="center">购物车({{cartListLength}})</div>
      <div slot="right" 
        v-if='showdelete' @click="removegoods"
      >移除宝贝</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list>
      <div slot='other' class="cartnull"
        v-if="showCartNull">
        <img src="@/assets/img/cart/cartNull.jpg" alt="">
      </div>
    </cart-list>
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
    }),
    showCartNull(){
      return this.cartListLength === 0;
    },
    showdelete(){
      return !(this.cartListLength === 0);
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 移除所选宝贝
    removegoods(){
      this.$store.commit('removegoods',this.cartList);
    }
  },
}
</script>

<style scoped >
  .cart{
    height: 100vh;
  }
  .cartnull img{
    margin-top: 70px;
    width: 100%;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>