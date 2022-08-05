<template>
  <div>
    <HeadTop :head-title="major" go-back="true"></HeadTop>
    <van-tabs v-model="active" @change="onChange">
    <van-tab v-for="(site,index) in sites" :key="index" :title="site" >
        <van-tabs v-model="twoactive" @change="twoonChange">
        <van-tab title="热门"></van-tab>
        <van-tab title="新书"></van-tab>
        <van-tab title="好评"></van-tab>
        <van-tab title="完结"></van-tab>
        <van-tab title="VIP"></van-tab>
        </van-tabs>
    </van-tab>
    </van-tabs>
    <listItem :Lists="Lists"></listItem>
    <!-- <div class="category-book-view" id="list-view">
		<ul class="category-book">
			<li class="category-book-item" v-for="book in Lists">
				<router-link :to="{name:'bookinfo',params:{bookid:book._id}}" class="fix">
				<div class="category-book-cover">
					<img :src="staticPath+book.cover" :title="book.title">
				</div>
				<div class="category-book-msg">
					<h3 class="category-book-title">{{book.title}}</h3>
					<p class="category-list-author">{{book.author}}<span class="category-col-line">|</span>{{book.majorCate}}</p>
					<p>{{book.shortIntro}}</p>
					<p class="category-book-star">{{book.latelyFollower}}人在追<span class="category-col-line">|</span>{{book.retentionRatio}}%留存</p>
				</div>
				</router-link> 
			</li>
		</ul>
	</div> -->
  </div>
</template>

<script>
import axios from 'axios'
import MoreNav from '../../main/classify/Nav/MoreNav.vue'
import HeadTop from '@/components/header/Head'
import listItem from '../home/listitem.vue'
export default {
    name:'twoclassify',
    components:{HeadTop,MoreNav,listItem},
    data(){
        return {
            staticPath:'http://statics.zhuishushenqi.com',
            activeKey: 0,
            active:0,
            twoactive:0,
            msg:['hot','new','repulation','over','month'],
            sites:[],
            site:'1',
            Lists:[],
            major:this.$route.query.major,
            index:'',
            minor:'',
            type:'hot',
            gender:this.$route.query.gender
        }
    },
    methods:{
        init(){
            axios.get('/api/book/by-categories?gender='+this.gender+'&type='+this.type+'&major='+this.major+'&minor='+this.minor+'&start=0&limit=20').then((res)=>{
            this.Lists=res.data.books;                    
            }).catch((err)=>{
            console.log(err);
            })
        },
        onChange(key) {
            this.minor=this.sites[key]
            // console.log("aaaaaaaaaa",this.minor)
            axios.get('/api/book/by-categories?gender='+this.gender+'&type='+this.type+'&major='+this.major+'&minor='+this.minor+'&start=0&limit=20').then((res)=>{
            this.Lists=res.data.books;                    
            }).catch((err)=>{
            console.log(err);
            })
            this.$router.push({path:'/twoclassify',query:{gender:this.gender,type:this.type,major:this.major,minor:this.minor,start:0,limit:50}})
        },
        twoonChange(key) {
            console.log(this.sites,key)
            this.type=this.msg[key]
            // console.log("aaaaaaaaaa",this.type)
            axios.get('/api/book/by-categories?gender='+this.gender+'&type='+this.type+'&major='+this.major+'&minor='+this.minor+'&start=0&limit=20').then((res)=>{
            this.Lists=res.data.books;                    
            }).catch((err)=>{
            console.log(err);
            })
            this.$router.push({path:'/twoclassify',query:{gender:this.gender,type:this.type,major:this.major,minor:this.minor,start:0,limit:50}})
        },
    },
    created(){
            axios.get('/api/cats/lv2').then((res)=>{
            if(this.gender==='male')
            this.sites=res.data.male;  
            else if(this.gender==='female')   
            this.sites=res.data.female
            else
            this.sites=res.data.press
            for(let i=0;i<this.sites.length;i++)
            {
                if(this.sites[i].major==this.major)
                {
                    {
                        this.index=i;
                        break;
                    }
                }
            }
            // this.index=this.sites.indexOf(this.major);
             this.sites=this.sites[this.index].mins     
            // console.log("数据",res.data)
            // console.log("数据hhhhhh",this.index)
            // console.log("wwwwww",this.sites)
            }).catch((err)=>{
            console.log(err);
            })
            axios.get('/api/book/by-categories?gender='+this.gender+'&type='+this.type+'&major='+this.major+'&minor='+this.minor+'&start=0&limit=20').then((res)=>{
            this.Lists=res.data.books;                    
            // console.log("wwwwwwwwwiloveu数据",res.data)
            // console.log(this.Lists)
            }).catch((err)=>{
            console.log(err);
            })
    },
    }
</script>

<style>
.category-book-view{
		overflow-y:scroll;
		height: 100%;
	}
	.category-book-item>a{
		width: 100%;
		padding:10px 14px 0;
		color: #555;
		margin-bottom: 10px;
	}
	.category-book-cover{
		width: 86px;
		height: 113px;
		background-color: #555;
		float: left;
		border-radius: 4px;
		overflow: hidden;
		box-shadow: 0 5px 10px #555;
	}
	.category-book-cover>img{
		width: inherit;
		height: inherit;
	}
	.category-book-msg{
		margin-left: 100px;
		height: 118px;
		line-height: 28px;
		border-bottom: 1px solid #ddd;
	}
	.category-book-msg>p{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: rgba(0,0,0,0.4);
		font-size: 14px;
	}
	.category-book-title{
		font-size: 16px;
		font-weight: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.category-list-author{
		font-size: 12px;
	}
	.category-col-line{
		margin:0 5px;
		font-size: 14px;
	}
	.category-book-star{
		color: rgba(0,0,0,0.6);
	}
</style>
