<template>
  <div class="backTop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:"backTop",
  components: {},
  data() {
    return {

    }
  },
}
</script>

<style scoped lang="less">
  .backTop{
    position: fixed;
    right: 10px;
    bottom: 60px;
    z-index: 11111;
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
</style>