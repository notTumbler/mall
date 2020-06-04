<template>
  <div class="checkbutton" :class="{checked:isChecked}"
  @click="checkBtnClick">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:"checkbutton",
  props:{
    isChecked:{
      type:Boolean,
      default:true
    }
  },
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    checkBtnClick(){
      this.$emit('checkBtnClick');
    }
  },
}
</script>

<style scoped >
  .checkbutton{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border:1.5px solid skyblue;
  }
  .checked{
    background-color: skyblue;
  }
</style>