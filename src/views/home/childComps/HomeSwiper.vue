<template>
  <div class="HomeSwiper">
    <swiper>
      <swiperItem v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt @load="imageLoad" />
        </a>
      </swiperItem>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isload:false
    }
  },
  methods: {
    imageLoad() {
      if (!this.isload) {
        this.$emit("swipperimageLoad");
        this.isload = true;
      }
    }
  }
};
</script>

<style scoped >
</style>