import Toast from "./Toast"
const obj = {}

obj.install = function(Vue){
  // 1、创建一个组件构造器 是extend不是extends
  const toastConstructor = Vue.extend(Toast);
  // 2、使用New的方式可以根据组件构造器创造出一个组件对象
  const toast = new toastConstructor();

  // 将组件对象手动地挂载到一个元素上
  toast.$mount(document.createElement('div'));
  
  //toast.$el对应的就是上面的那个元素
  document.body.appendChild(toast.$el);

  
  Vue.prototype.$toast = toast;
}

export default obj