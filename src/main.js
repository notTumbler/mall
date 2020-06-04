import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 解决重复点击导航路由报错
import Router from 'vue-router'
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

import "@/assets/css/iconfont.css"
import "@/assets/css/base.css"
import "@/assets/css/normalize.css"
// 利用Vue实例创建事件总线
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
