<template>
  <div class="navbar" :style="{'background-color':bgcolor,color:fontcolor}">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right" :style="{'color':slotcolor}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"navbar",
  props:{
    bgcolor:{
      type:String,
      default:'#fb7299'
    },
    fontcolor:{
      type:String,
      default:'white'
    },
    slotcolor:{
      type:String,
      default:'while'
    }
  },
  components: {
  },
  data() {
    return {

    }
  },
}
</script>

<style scoped >
  .navbar{
    width: 100%;
    display: flex;
    height: 43px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .left,
  .right{
    width: 20%;
  }
  .center{
    flex: 1;
  }

</style>