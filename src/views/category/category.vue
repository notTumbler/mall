<template>
  <div class="category">
    <nav-bar bgcolor="skyblue">
      <div slot="center">更多好物</div>
    </nav-bar>
    <div class="category-content">
      <cate-left :cate-left-list="cateLeftList" class="cate-left" @selectItem="selectItem" />

      <Scroll id="tab-content" ref="chen" 
      :data="[categoryData]"
      @scrollPosition='scrollPosition'
      :probe-type="3"
       >
        <div>
          <right-top :subcategories='showSubcategory'/>
          <tab-control :titles="['综合','新品','销售']"
          @tabClick='tabClick'/>

          <goods-list :goods="showCategoryDetail" />
        </div>
      </Scroll>
    </div>
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
import { POP, SELL, NEW } from "common/const";
import { itemListenerMixin,backTopMixin } from "common/mixin"

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
// import BackTop from "components/content/backTop/BackTop"
import GoodsList from "components/content/goods/GoodsList";

import CateLeft from "./childComps/categoryLeft";
// import CateRight from "./childComps/categoryRight";
import RightTop from "./childComps/rightTop";

export default {
  name: "category",
  components: {
    NavBar,
    CateLeft,
    // CateRight,
    Scroll,
    TabControl,
    GoodsList,
    RightTop,
  },
  computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      cateLeftList: [],
      categoryData: {},
      currentIndex: -1,
      currentType:'pop',
      showBackTop:false
    };
  },
  created() {
    this._getcategory();
    this.$bus.$on('imgLoad', () => {
		    this.$refs.chen.ScrollRefresh();
	    })
  },
  deactivated() {
   this.$bus.$off('imgLoadFinish',this.itemImgListener);
  },
  methods: {
    // 请求左侧列表数据(十六个分类)
    _getcategory() {
      getCategory().then(res => {
        this.cateLeftList = res.data.category.list;
        // 为十六个分类分别抽离出各自的数据（上部分和下部分）
        for (let i = 0; i < this.cateLeftList.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          };
        }
        // 默认请求第一个分类的数据
        this._getSubcategories(0);
        console.log(this.categoryData);
      });
    },
    _getSubcategories(index) {
      // 这个currentIndex是为了让getcategoryDetail能够与_getSubcategories同步(我点第一个Item时，加载第一个Item的粗略数据和第一个Item的详细数据)
      this.currentIndex = index;
      const mailKey = this.cateLeftList[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      const miniWallkey = this.cateLeftList[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        // console.log(res);
        // console.log(this.categoryData[this.currentIndex].categoryDetail[type]);
        
        this.categoryData = { ...this.categoryData };
      });
    },
    selectItem(index) {
      this._getSubcategories(index);
      
    },
    // 这里可以mixin
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      };
      console.log(this.currentType);
      // this.$refs.tabControl.currentIndex = index;
      // this.$refs.tabControlTwo.currentIndex = index;
    },
    // 下方详情列表返回顶部

    // 滚动到一定的位置返回按钮显示
    scrollPosition(position) {
      // 1.判断backTop是否显示
      this.showBackTop = -position.y > 2000;
      // console.log(position.y);
      
      // 2.如果拉到底部了，给个toast消息提示
      if (-position.y > 5340 ) {
        this.$toast.show('没有更多数据了O_D')
      }
      // **注：这里不知道为啥子滚动条组件里的滚动到底部的事件触发不了，应该是是某个层级出了点小问题，待细品？这里先想个鸡贼点的办法应付下先
    },
   
  }
};
</script>

<style scoped lang="less" >
.category {
  height: 100vh;
  .category-content {
    height: calc(100% - 92px);
    display: flex;
    .cate-left {
      width: 28%;
    }
    #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
  }
}
</style>