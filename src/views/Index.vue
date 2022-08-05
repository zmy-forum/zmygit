<template>
    <div>
        <HeadTop head-title="推推" go-back="true"></HeadTop>
        <div>
            <router-link to='/u/register'>注册</router-link>
        </div>
        <div>
            <router-link to='/u/login'>登录</router-link>
        </div>
        <ul class="category-list">
			<li v-for="(list,index) in listData" :key="index" class="category-list-item">
            <mu-row @click="golist(list)">
            <mu-col span="6" ><div class="imgbox"><img :src="staticPath+list.bookCover[1]"/></div></mu-col>
            <mu-col span="6">
            <p class="category-list-number" style="font-size: 15px;font-weight: bold;line-height: 40px">{{list.name}}</p>
            <p class="category-list-number">{{list.bookCount}}本</p>
            </mu-col>
            </mu-row>
            </li>
		</ul>
        <!-- <ul>
			<li v-for="(list,index) in listData" :key="index">
            <div class="imgbox"><img :src="this.staticPath+this.listData[index].bookCover[1]"/></div>
            </li>
		</ul> -->
        <!-- <img :src="this.staticPath+this.listData[0].bookCover[1]"/> -->
    </div>
</template>

<script>
import axios from 'axios'
// import FooterNav from '../components/FooterNav.vue'
    import HeadTop from '@/components/header/Head'
    export default {
        name: "index",
        components:{
            HeadTop
            },
            data(){
                return {
                    staticPath:'http://statics.zhuishushenqi.com',
                    listData:''
                }
            },
        created(){
            axios.get('/api/cats/lv2/statistics').then((res)=>{
            this.listData=res.data.male;                    
            console.log("数据www",res.data)
            console.log(this.listData)
            }).catch((err)=>{
            console.log(err);
            })
        },
    }
</script>

<style scoped>
.category-title{
		padding:10px;
		border-bottom: 1px solid #EBEEF5;
		font-size: 16px;
	}
	.category-list{
		font-size: 0;
	}
	.category-list-item{
		width: 50%;
    height: 70px;
		display: inline-block;
		vertical-align: middle;
    border-right:1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
    overflow: hidden;
	}
  .imgbox{
    width: 100%;
    height: 70px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .imgbox img{
    margin: 0 0 0 20%;
    width: 60px;
    height: 70px;
  }
	.category-list-item>p{
    color:#555;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.category-list-number{
    height: 30px;
    line-height: 30px;
		font-size: 12px;
		color:rgba(0,0,0,0.5);
    vertical-align: middle;
	}
</style>