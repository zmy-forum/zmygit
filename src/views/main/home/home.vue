<template>
  <div>
    <van-tabs v-model="active" @change="onChange">
        <van-tab title="男生"></van-tab>
        <van-tab title="女生"></van-tab>
        <!-- <van-tab title="出版">内容 3</van-tab> -->
    </van-tabs>
    <router-link :to="{'name':'search'}" >
    <van-search
        placeholder="请输入书名/作者名"
        input-align="center"
        shape="round"
    />
    </router-link>
    <van-sidebar  v-model="activeKey" @change="twoonChange">
        <van-sidebar-item v-for="(site,index) in sites":key="index":title="site.title.substring(0,5)" />
        <van-sidebar-item title="" />
    </van-sidebar>
    <listItem  v-show="flag1" class="awsl1" :Lists="lists"></listItem>
    <listItem  v-show="flag2" class="awsl2" :Lists="lists"></listItem>
  </div>
</template>

<script>
import listItem from './listitem.vue'
import axios from 'axios'
import { Tabbar, TabbarItem } from 'vant';
export default {
    components:{
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        listItem,
    },
    data(){
        return {
            active:0,
            activeKey:0,
            flag:0,
            flag1:true,
            flag2:false,
            sites:'',
            sites1:'',
            sites2:'',
            lists:'',
            msg1:'',
            msg2:'',
            myflag:['male','female'],
            staticPath:'http://statics.zhuishushenqi.com'
        }
    },
    methods:{
        onChange(key) {
            this.active=key
            this.flag=this.myflag[key]
            if(this.flag==='male')
            {
                this.sites=this.sites1
                this.flag2=false
                this.flag1=true
            }
            else
            {
            this.sites=this.sites2
            this.flag2=true
            this.flag1=false
            }
            this.type=this.sites[0]._id
            // console.log("aaaaaaaaaa",this.type)
            axios.get('/api/ranking/'+this.type).then((res)=>{
            this.lists=res.data.ranking.books
            // console.log(res.data);
            // console.log(this.lists);
            }).catch((err)=>{
            console.log(err);
            })
        },
        twoonChange(key) {
            this.activeKey=key
            this.type=this.sites[key]._id
            // console.log("aaaaaaaaaa",this.type)
            console.log(this.sites)
            axios.get('/api/ranking/'+this.type).then((res)=>{
            this.lists=res.data.ranking.books
            // console.log(res.data);
            // console.log(this.lists);
            }).catch((err)=>{
            console.log(err);
            })
        },
    },
    created(){
        axios.get('/api/ranking/gender').then((res)=>{
            this.sites1=res.data.male; 
            this.sites2=res.data.female;  
            this.sites=this.sites1
            // console.log(res.data);
            // console.log(this.sites);
            }).catch((err)=>{
            console.log(err);
            })
            axios.get('/api/ranking/54d42d92321052167dfb75e3').then((res)=>{
            this.lists=res.data.ranking.books
            // console.log(res.data);
            // console.log(this.lists);
            }).catch((err)=>{
            console.log(err);
            })
            
    }
}
</script>

<style>
/* .db{
    display: inline-block;
} */
.van-sidebar {
    width: 100px!important;
}
.awsl1{
    margin-top:-1000px;
    margin-left: 100px;
}
.awsl2{
    margin-top:-820px;
    margin-left: 100px;
}
</style>