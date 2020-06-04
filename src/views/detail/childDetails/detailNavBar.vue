<template>
  <div class="detailNavBar">
    <nav-bar bgcolor="skyblue">
      <div slot="left" @click="backOne">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div slot="center" class="middle">
        <div
          v-for="(item, index) in DNBtitle"
          :key="index"
          class="middle-item"
          @click="changeIndex(index)"
        >
          <span :class="{active:currentIndex == index}">{{item}}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "detailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      DNBtitle: ["商品", "参数", "评价","推荐"],
      currentIndex: 0
    };
  },
  methods: {
    backOne(){
      this.$router.back();
    },
    changeIndex(index) {
      this.currentIndex = index;
      this.$emit('DNBtiltleClick',index);
    }
  }
};
</script>

<style scoped lang="less">
.active {
  color: purple;
  border-bottom: 2px solid purple;
}
.middle {
  display: flex;
  .middle-item {
    flex: 1;
    span{
      padding: 0 5px;
    }
  }
}
</style>