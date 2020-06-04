<template>
  <div id="app">
    <keep-alive exclude="detail" >
      <router-view/>
    </keep-alive>
    <tabbar></tabbar>
  </div>
</template>
<script>
import tabbar from 'components/common/tabbar/tabbar'

export default {
  name: 'App',
  components: {
    tabbar
  }
}
</script>

<style lang="less">

</style>
