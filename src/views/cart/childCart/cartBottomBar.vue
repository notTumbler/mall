<template>
  <div class="cartbottombar">
    <div class="bottombar-left">
      <check-button />
      <span class="selectall">全选</span>
    </div>
    <div class="bottombar-middle">
      <span>合计：{{totalPrice}}</span>
    </div>
    <div class="bottombar-right">
      <span>去计算:【{{checkLength}}】</span>
    </div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/CheckButton";

export default {
  name: "cartbottombar",
  components: {
    checkButton
  },
  computed: {
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count;
      },0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked ).length;
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped >
.cartbottombar {
  position: relative;
  height: 45px;
  background-color: #fb7200;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: white;
}
.bottombar-left{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
}
.selectall{
  margin-left: 4px;
}


.bottombar-left{
  width: 60px;
  margin-left: 10px;
}
.bottombar-middle{
  flex: 1;
  margin-left: 20px;
}
.bottombar-right{
  height: 45px;
  width: 120px;
  text-align: center;
  line-height: 45px;
  
  background-color: orangered;
}
  /* .checkbutton{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border:1.5px solid skyblue;
  }
  .checked{
    background-color: skyblue;
  } */
</style>