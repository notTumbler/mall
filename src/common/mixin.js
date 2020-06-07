import {debounce} from './debounce'
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.chen.ScrollRefresh,500);
    this.itemImgListener = () => {
      this.newRefresh();
    };
    this.$bus.$on('imgLoadFinish',this.itemImgListener);
  },
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      showBackTop:false
    }
  },
  methods: {
    // 返回顶部
    backClick() {
      // 还有第三个参数time,但是给了默认值500,此处可不传
      this.$refs.chen.ScrollTozero(0, 0);
    },
  },
}