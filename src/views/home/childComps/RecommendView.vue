<template>
  <div class="recommendView">
    <div class="everyItem" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendView",
  components: {},
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="less" >
.recommendView {
  display: flex;
  text-align: center;
  padding: 10px 0 18px;
  border-bottom: 8px solid #eee;
  font-size: 13px;
  .everyItem {
    flex: 1;
    a {
      img {
        width: 70px;
        height: 70px;
        margin-bottom: 4px;
      }
    }
  }
}
</style>