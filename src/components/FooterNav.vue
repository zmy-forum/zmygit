<template>
  <div class="footer">
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item :class="[active==0?'active':'inactive']" icon="bar-chart-o" to="/bookself" >书架</van-tabbar-item>
      <van-tabbar-item :class="[active==1?'active':'inactive']"icon="home-o" to="/home">书城</van-tabbar-item>
      <van-tabbar-item :class="[active==2?'active':'inactive']"icon="apps-o" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item :class="[active==3?'active':'inactive']"icon="point-gift-o" to="/goods">福利</van-tabbar-item>
      <van-tabbar-item :class="[active==4?'active':'inactive']"icon="manager-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
    name: 'FooterNav',
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    // component:{
    //   onShow: function () {
    //   if (typeof this.getTabBar === 'function' &&
    //       this.getTabBar()) {
    //       this.getTabBar().setData({
    //         active: this.active
    //       })
    //     }
    // },
    // },
    data () {
      return {
        tuxue:['bookself','home','classify','goods','user'],
        active: 2,
        id:this.$route.fullPath.split("/")[1]
      }
    },
    // created(){
    //   /*解决进入二级路由返回默认选中首页tab的问题*/
    // const navBarActive = this.$route.fullPath;
    // console.log(navBarActive)
    // if(navBarActive.includes("/bookself")){
    //   this.active = 0;
    // } else if(navBarActive.includes("/home")){
    //   this.active = 1;
    // } else if(navBarActive.includes("/classify")){
    //   this.active = 2;
    // } else if(navBarActive.includes("/goods")){
    //   this.active = 3;
    // } else if(navBarActive.includes("/user")){
    //   this.active = 4;
    // }
    // // this.active=+this.active
    // console.log(typeof this.active)
    // },
    methods:{
       onChange(key) {
            // console.log(this.active)
            },
    }
}
</script>
<style scoped>
/* .van-tabbar-item--active {
     color: black !important;; 
    background-color: #fff;
} */
.active {
  color: #1989fa !important;
}
.inactive {
  color: #646566 !important;
}
</style>