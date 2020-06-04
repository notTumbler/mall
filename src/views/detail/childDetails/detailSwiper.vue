<template>
  <div class="detailswiper">
    <!-- <swiper class="swiper">报错：不能在某个子节点前插入新节点，insertbefore()是封装的Swiper里132行的一个方法
    报错原因很尴尬，swiper这个类名和Swiper里的某个元素的类名冲突了
    总结：用别人东西的时候别瞎造 -->
    <swiper class="swiper-wrap">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper , SwiperItem } from 'components/common/swiper'
export default {
  name:"detailswiper",
  components: {
    Swiper, 
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {

    }
  },
}
</script>

<style scoped lang='less' >
.swiper-wrap{
  height: 300px;
}
</style>