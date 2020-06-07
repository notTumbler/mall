import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  //mutations中的每个方法尽可能完成的事件比较单一一点
  [ADD_COUNT](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  // 改变购物车列表项的复选框状态
  changeChecked(state,payload){
    payload.checked = !payload.checked;
  },
  // 点击全选改变状态
  TobeUnSelectAll(state,payload){
    payload.forEach(element => {
      element.checked = false;
    });
  },
  TobeSelectAll(state,payload){
    payload.forEach(element => {
      element.checked = true;
    })
  },
  // 移除所选商品
  removegoods(state,payload ){
    let Bechecked = payload.filter( item => !item.checked);
    console.log(Bechecked);
    state.cartList = [];
    state.cartList.push(...Bechecked);
    }
}