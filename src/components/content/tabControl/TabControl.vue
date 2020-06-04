<template>
  <div class="tab-control">
    <div class="everyItem" v-for="(item, index) in titles" :key="index" @click="changeColor(index)">
      <span :class="currentIndex===index?'active':''">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab-control",
  components: {},
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    changeColor(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index);
    }
  }
};
</script>

<style scoped lang="less">
.active {
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-tint);
}
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
  z-index: 9999;
  .everyItem {
    flex: 1;
    text-align: center;
    font-size: 15px;
    span {
      padding: 5px 10px;
    }
  }
}
</style>