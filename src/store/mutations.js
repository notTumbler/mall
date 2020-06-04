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
  changeChecked(state,payload){
    payload.checked = !payload.checked;
  }
}