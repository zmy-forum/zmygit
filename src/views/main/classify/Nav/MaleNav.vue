<template>
    <div class="male-category">
		<h3 class="category-title"></h3>
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
	</div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "MaleNav",
        props:['listData'],
            data(){
                return {
                    staticPath:'http://statics.zhuishushenqi.com',
                }
            },
        // created(){
        //     axios.get('/api/cats/lv2/statistics').then((res)=>{
        //     this.listData1=res.data.male;    
        //      this.listData2=res.data.male;                 
        //     console.log("数据www",res.data)
        //     console.log(this.listData)
        //     }).catch((err)=>{
        //     console.log(err);
        //     })
        // },
        methods:{
            golist(list){
            if(this.listData.length==14) 
            { 
              this.$router.push({path:'/twoclassify',query:{gender:'male',type:'hot',major:list.name,start:0,limit:50}})
            }
            else if(this.listData.length==12)
            {
              this.$router.push({path:'/twoclassify',query:{gender:'female',type:'hot',major:list.name,start:0,limit:50}})
            }
            else
            { 
              this.$router.push({path:'/twoclassify',query:{gender:'press',type:'hot',major:list.name,start:0,limit:50}})
            }
            // console.log("长度",list.name)
            // console.log("长度",this.listData.length)
      },
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