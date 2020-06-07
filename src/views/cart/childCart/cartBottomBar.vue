<template>
  <div class="cartbottombar">
    <div class="bottombar-left">
      <check-button class="check-button" @click.native="checkClick" :isChecked="isSelectAll" />
      <span class="selectall">全选</span>
    </div>
    <div class="bottombar-middle">
      <span>合计：{{totalPrice}}</span>
    </div>
    <div class="bottombar-right" @click="gotocomputed">
      <span >去计算:【{{checkLength}}】</span>
    </div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "cartbottombar",
  components: {
    checkButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      // find()方法返回Boolean
      if (this.cartList.length === 0) return false;
      return this.cartList.find(item => !item.checked) === undefined;
    }
  },
  data() {
    return {};
  },
  methods: {
    checkClick() {
      // console.log('---');
      if (this.isSelectAll) {
        this.$store.commit("TobeUnSelectAll", this.cartList);
      } else {
        this.$store.commit("TobeSelectAll", this.cartList);
      }

      if (this.cartList.length === 0) {
        this.$toast.show('没有可选商品')
        
      }
    },
    gotocomputed() {
      console.log("----");
      if (this.checkLength === 0) {
        this.$toast.show("请先选择商品！");
      }else{
        this.$toast.show('即将跳转至支付页面…')
      }
    }
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
.bottombar-left {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
}
.selectall {
  margin-left: 4px;
}

.bottombar-left {
  width: 60px;
  margin-left: 10px;
}
.bottombar-middle {
  flex: 1;
  margin-left: 20px;
}
.bottombar-right {
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