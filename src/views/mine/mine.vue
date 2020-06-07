<template>
  <div class="mine">
    <nav-bar bgcolor='skyblue'>
      <div slot="center">个人中心</div>
    </nav-bar>

    <user-info />
    <account-info class="account"/>

    <normal-list :list-data='orderList'/>
    <normal-list :list-data='serviceList'/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

import UserInfo from "./childComps/userInfo"
import AccountInfo from "./childComps/accountInfo"
import NormalList from "./childComps/normalList"
export default {
  name:"mine",
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    NormalList
  },
  data() {
    return {
      orderList: [
			    {icon: 'message.svg', info: '我的消息'},
			    {icon: 'pointer.svg', info: '积分商城'},
			    {icon: 'vip.svg', info: '会员卡'},
		    ],
		    serviceList: [
			    {icon: 'cart.svg', info: '我的购物车'},
			    {icon: 'shopping.svg', info: '下载购物APP'},
		    ]
    }
  },
}
</script>

<style scoped lang='less'>
  .mine{
    height: 100vh;
    background-color: #f2f2f2;
    .account{
      margin-top: 5px;
    }
  }
</style>