<template>
  <div class="goods-item" @click="toDetailPage">
    <img :src="goodsItem.show.img" v-if="goodsItem.show" @load="imgLoadFinish" alt="图片失联了~" />
    <img :src="this.goodsItem.image" v-else-if="goodsItem.image" @load="imgLoadFinish" alt="图片失联了~" />
    <img :src="this.goodsItem.img" v-else @load="imgLoadFinish" alt="图片失联了~" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodslistitem",
  components: {},
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  // 为什么上方图片处用了计算属性后，在v-if处就不能用 || ，一用就是报错找不到img，只能找到image,待细品
  // computed: {
  //   showImage(){
  //     return this.goodsItem.show.img || this.goodsItem.image ;
  //   },
  //   chen(){
  //     return this.goodsItem.show || this.goodsItem;
  //   }
  // },
  methods: {
    imgLoadFinish() {
      // 此时需要对scroll进行刷新，但是这里拿不到scroll对象，所以使用事件总线，用VUEX也行，重要的是需要在mian.js里利用Vue实例来创建事件总线
      this.$bus.$emit("imgLoadFinish");
    },
    // 点击跳转至详情页
    toDetailPage() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  /* bottom: 49px; */
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
