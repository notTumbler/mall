import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations-types' 

export default{
  addCart(context,payload){
    return new Promise( (resolve,reject) => {
      // 1.查找之前的数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      // 2.判断oldproduct
      if (oldProduct) {
        // 这里传的是oldProduct，不是payload
        context.commit(ADD_COUNT,oldProduct);
        resolve('再来一件~D_C~')
      }else{
        payload.count = 1;
        context.commit(ADD_TO_CART,payload);
        resolve('在购物车等亲哦~')
      }
    })
  },
    changeChecked(context,payload){
      context.commit('changeChecked',payload)
    },
    
  
}