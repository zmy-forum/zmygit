<template>
<div>
<van-tabs v-model="active">
  <van-tab title="男生"><MaleNav :listData="listData1"></MaleNav></van-tab>
  <van-tab title="女生"><MaleNav :listData="listData2"></MaleNav></van-tab>
  <van-tab title="出版"><MaleNav :listData="listData3"></MaleNav></van-tab>
</van-tabs>
</div>
</template>

<script>
import axios from 'axios'
import MaleNav from '../main/classify/Nav/MaleNav.vue'
export default {
    name:'classify',
    components:{MaleNav},
    data(){
        return{
            active:0,
            listData1:'',
            listData2:'',
            listData3:''
        }
    },
    created(){
        axios.get('/api/cats/lv2/statistics').then((res)=>{
            this.listData1=res.data.male;    
            this.listData2=res.data.female;  
            this.listData3=res.data.press;                 
            // console.log("数据www",res.data)
            // console.log(this.listData1)
            // console.log(this.listData2)
            }).catch((err)=>{
            console.log(err);
            })
    }
}
</script>

<style>

</style>