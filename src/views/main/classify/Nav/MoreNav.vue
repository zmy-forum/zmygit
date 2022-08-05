<template>
<div>
<van-tabs v-model="active">
  <van-tab title="热门">内容 1</van-tab>
  <van-tab title="新书">内容 2</van-tab>
  <van-tab title="好评">内容 3</van-tab>
  <van-tab title="完结">内容 4</van-tab>
  <van-tab title="VIP">内容 5</van-tab>
</van-tabs>
</div>
</template>

<script>
export default {
    name:'morenav',
    data(){
        return{
            active:0,
        }
    }
}
</script>

<style>

</style>