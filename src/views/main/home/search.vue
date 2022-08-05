<template>
	<div >
        <HeadTop :head-title="major" go-back="true"> </HeadTop>
        <van-search
        @keydown="keydownsearch"
        v-model="keyword"
        name="searchBook"
        placeholder="请输入书名/作者名"
        input-align="center"
        />
	<div class="div1">
	<ul class="search-hotwords-container fix" v-show="showHotword">
		<div style="margin: 10px 0px">
			<h4>热门搜索</h4>
		</div>
		<li class="search-hotwords" :style="bgcolor[index]" v-for="(item,index) in hotwords">
			<a  @click="tags(item.word)" href="javascript:">{{ item.word}}</a>
		</li>
	</ul>
	</div>
		<!-- <div class="div2"><Searchfull  :Lists="full"></Searchfull></div> -->
		<div class="div2 jjw" v-show="tiana">
    	<ul >
		<li class="ssss" v-for="(book,index) in full" :key="index" v-model="keyword">
		<p id="mygod" @click="btn_user($event)">{{book}}</p>
		<!-- <p class="mygod">{{index}}</p> -->
		</li>
		</ul>
  		</div>
		<div class="no-result" v-show="noResult">
			<p>搜索结果未找到</p>
		</div>
		<listItem :Lists="lists"></listItem>
	</div>
</template>
<script type="text/javascript">
import axios from 'axios'
import HeadTop from '../../../components/header/Head.vue'
import {Toast,Indicator} from 'mint-ui'
import listitem from './listitem.vue'
	export default{
		components:{
			'listItem':listitem,
            HeadTop
		},
		data(){
			return{
            lists:'',
			full:[],
            major:'搜索书籍',
            length:0,
            util:'http://statics.zhuishushenqi.com',
            keyword:'',
            lists:{},
            hotwords:{},
            bgcolor:[],
            noResult:false,
            showHotword:true,
			query:'',
			tiana:false
            }
		},
		watch:{
			keyword:function(val,oldVal){
				axios.get('/api/book/auto-complete?query='+val).then((res)=>{
				this.tiana=true
				this.full=res.data.keywords; 
				// console.log("this.full",this.full)                    
				}).catch((err)=>{
				console.log(err);
            })
			}
		},
		created(){
			this.getSearchHot()
		},
		methods:{
			btn_user (e) {
			// console.log(e.target.innerHTML)
			this.keyword=e.target.innerHTML
			// this.tiana=false
		},
			// mychange(key){
			// 	// this.keyword=this.full[0]
			// 	// console.log('yyyy',this.keyword)
			// 	// console.log('yyyy',this.full)
			// 	// console.log('yyyy',key)
            //     // var result=key.toElement.childNodes[0]
			// 	// this.keyword = String(result)
			// 	var result =document.getElementById("mygod")
			// 	console.log(result)
			// },存疑？？？？？？？？？？？？？？？？？？不懂
      keydownsearch(el){
        if(el.keyCode == 13){
          this.searchbook()
        }
      },
      searchbook(){
        Indicator.open()
        if(this.keyword == ''){
          Toast({
            message:'请输入关键字',
            duration:2000
          })
           Indicator.close()
        //    return;
        }
        axios.get('/api/book/fuzzy-search?query='+this.keyword).then(res=>{
			this.tiana=false
        this.lists=res.data.books;
        this.length=this.lists.length
        if(this.length===0)
        {
            this.noResult=true;
        }
        else{
            this.noResult=false;
        }
        // console.log(this.length)
        // console.log("shdddyyyy",this.lists)
        // console.log("shddd",res.data)
          this.showHotword=false
          Indicator.close()
        })
      },
		  getSearchHot(){
        axios.get('/api/book/search-hotwords').then(res=>{
          this.hotwords = res.data.searchHotWords.slice(0,10);
          this.randomcolor()
        })
      },
			randomcolor(){
				let colors=['#FF6666','#33CC99','#006699','#FF9966','#0066CC','#339933','#FFCC33','#336699','#FF9900','#99CC33','#0099CC','#FF0033']
				for(let i=0;i<10;i++){
					let num = parseInt(Math.random()*colors.length - 1)
					this.bgcolor[i]={
						'background':colors[num]
					}
				}
			},
			tags(word){
        Indicator.open()
	          axios.get('/api/book/fuzzy-search?'+this.keyword).then(res=>{
	              res.data.books.forEach(book=>{
	                book.cover = util.staticPath+book.cover;
	              })
                this.showHotword=false
              Indicator.close()
	            })
			}
		}
	}
</script>
<style type="text/css">
	.search-contaier{
		height: 91.6vh;
		overflow: hidden;
		position: relative;
    padding-bottom: 25px;
	}
	.search-input-group{
		position: absolute;
		height: 34px;
		top: 3px;
		left: 0;
		width: 100%;
		padding:0 45px 0 28px;
		font-size: 0;
	}
	.search-input-text{
		height: 32px;
		width: 100%;
		outline: none;
		padding:5px 0 0 10px;
		font-size: 16px;
		background-color:#FFF;
		border-bottom:1px solid #65b1ff;
	}
	.search-input-text::-webkit-input-placeholder{
		color:black;
	}
	.search-input-text:-moz-placeholder{
    color:black;
	}
	.search-input-text::-moz-placeholder{
    color:black;
  }
	.search-input-text:-ms-input-placeholder{
    color:black;
	}
	.no-result{
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size:18px;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		margin:auto;
	}
	.search-hotwords-container{
		padding: 10px 25px;
	}
	.search-hotwords-container>h3{
		font-weight: normal;
		font-size: 16px;
		margin-bottom: 10px;
	}
	.search-hotwords{
		margin:0px 10px 10px 0;
		float: left;
	}
	.search-hotwords>a{
		padding:5px 10px;
		border-radius: 4px;
		color:black;
	}
	#mygod{
	border-style:  none none  dotted none ;
	height:30px;
	font-size: 18px;
}
	.div1{position: absolute;}
	.div2{margin-left:5%;position: absolute;width: 90%;background-color: #FFF;}
</style>