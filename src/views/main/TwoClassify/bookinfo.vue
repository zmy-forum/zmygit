<template>
  <div>
    <div class="books-detail">
      <!-- <mt-header :title="title" class="book-header">
        <div slot="left" @click="$router.back(-1)">
          <mt-button icon="back">返回</mt-button>
        </div>
      </mt-header> -->
      <HeadTop head-title="书籍详情" go-back="true"></HeadTop>
      <div class="book-detail" v-show="book.title">
        <div class="cover">
          <img v-lazy="staticPath+book.cover" alt="">
        </div>
        <div class="desc">
          <h1>{{book.title || 'Fakin'}}</h1>
          <p class="info">
            <span>{{book.author || 'fakin'}}</span> | <span>{{book.minorCate || 0}}</span>
            | <span>{{latelyCount(book.wordCount || 0)}}</span>
          </p>
          <p class="update"> {{upDate > 1 ? upDate + "小时前" : upDate * 60 + "分钟前"}}更新</p>
          <p>{{book.lastChapter}}</p>
        </div>
      </div>
      <div class="read-link" v-show="book.title">
        <div class="sj" @click="setBookLocalStorage()">{{flag ? '不追了' : '追更新'}}</div>
        <div class="read" @click="goReadBooks()">开始阅读</div>
      </div>
      <div class="reader-data">
        <p class="item">
          <span class="key">追人气</span>
          <span>{{latelyFollower(book.latelyFollower) || 0}}万</span>
        </p>
        <p class="item">
          <span class="key">读者存留率</span>
          <span>{{book.retentionRatio || 0}}%</span>
        </p>
        <p class="item">
          <span class="key">日更字数/天</span>
          <span>{{book.serializeWordCount || 0}}</span>
        </p>
      </div>
      <div class="introduction">
        {{book.longIntro}}
      </div>

      <div class="comment">
        <p class="comment-title">热门评论</p>
        <ul>
          <!-- <p>sbsbsbsbsbsb</p> -->
          <li v-for="item in comments" class="comment-list" >
            <div >
              <div class="mm">
                <img class="mygod" :src="staticPath+item.author.avatar" alt="">
                <!-- <p>sbsbsbsbsbsb</p> -->
              </div>
              <div class="ee">
                <p>{{item.author.nickname}}&nbsp</p>
                <p>{{item.updated.substring(0,10)}}</p>
                </div>
              <div>
                <!-- <p class="ee">{{item.author.nickname}}</p>
                <p class="ee">{{item.updated}}</p>  -->
                <p class="pp">{{item.content}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import HeadTop from '../../../components/header/Head.vue'
import axios from 'axios'
  export default{
      components:{HeadTop},
    data(){
      return {
        title: '书籍详情',
        book: '',
        upDate: 0,
        updated:'',
        comments: '',
        staticPath:'http://statics.zhuishushenqi.com',
        flag: false,
        fontSize: 18,
        fontColor: '#5c5d58',
        background: '#eee6dd',
        readePattern: 0,
        pagingPattern: 0,
        id:this.$route.path.split("/")[2]
      }
    },
    methods:{
         _time(time){
            let currentTime = Math.round(new Date() / 1000);
            time = new Date(time).getTime() / 1000;
            let timer = Math.floor((currentTime - time) % 86400 / 3600);
            return timer
        },
        latelyFollower (lately) {
        if (lately > 10000) {
          return (lately / 10000).toFixed(1)
        } else {
          return lately
        }
      },
        latelyCount(count){
        if (count > 10000) {
          return (count / 10000).toFixed() + '万字'
        } else {
          return count + '字'
        }
        },
        goReadBooks(){
        this.$router.push({path: '/readBook/${this.$route.params.id}/'});
        },
        setUserLocalStorage(){

        },
        isFlag () {
        // 返回本地是否缓存（加入书架）
        let localShelf = JSON.parse(window.localStorage.getItem('book'))
        this.flag = !!(localShelf && localShelf[this.book._id])
      },
      setBookLocalStorage(){
        let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) : {};
        if (this.flag) {
          delete localShelf[this.book._id];
          window.localStorage.setItem('book', JSON.stringify(localShelf))
          this.flag = !this.flag
        } else {
          localShelf[this.book._id] = {
            cover: this.book.cover,
            title: this.book.title,
            id: this.book._id,
            chapterIndexCache: 0,
            bookSource: 0,
            pageIndexCache: 0,
          };
          window.localStorage.setItem('book', JSON.stringify(localShelf))
          this.flag = !this.flag
        }
      },

    },
    created(){
        axios.get('/api/post/review/best-by-book?book='+this.id+'&limit=10').then((res)=>{
            this.comments = res.data.reviews
            // this.comments.updated=this.comments.updated.substring(0,5)
            // console.log("wowwwwwwwwwaini",this.comments)  
            }).catch((err)=>{
            console.log(err);
            })
        axios.get('/api/book/'+this.id).then((res)=>{
            this.book=res.data; 
            this.upDate = this._time(this.book.updated);
            // console.log("woaini",this.book)                    
            }).catch((err)=>{
            console.log(err);
            })
    }
  }
</script>
<style scoped lang="stylus" >
  .pp
    margin-left 20px
  .mm
    display inline-block
  .ee
    margin-left 5px
    display inline-block
  .mygod
    width 40px
    height 40px
    border-radius 50%
    display inline-block
  .books-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background #fff
    width 100%
    overflow-y scroll
    max-width 750px; /* no*/
    margin 0 auto
    .book-header
      height 100px
      line-height 100px
      font-size 25px
      background #409eff
    .book-detail
      display flex
      padding 30px
      .cover
        flex 0 0 150px
        height 200px
        margin-right 10px
        overflow hidden
        // background url('../../../assets/default.jpg') no-repeat
        background-position 50%
        background-size 100%
        img
          max-width 100%
      .desc
        h1
        top:0
          height 50px
          font-size 28px
        p
          height 40px
          color #999
    .read-link
      display flex
      padding 0 30px 30px 30px
      font-size 30px
      div
        flex 1
        text-align center
        line-height 80px
        height 80px
      .sj
        border 1px solid #409eff
        color #409eff
        box-sizing border-box
        margin-right 10px
      .read
        background #409eff
        color #fff
        margin-left 10px
    .reader-data
      padding 30px 0
      border-top 1px solid #ebebeb
      border-bottom 1px solid #ebebeb
      box-sizing border-box
      font-size 0
      .item
        display inline-block
        width 33%
        text-align center
        vertical-align middle
        span
          font-size 16px;
        /* no*/
        .key
          display block
          font-size 12px; /* no*/
          color #999
          margin-bottom 20px
    .introduction
      width 100%
      padding 30px
      box-sizing border-box
      font-size 13px
      color #999
      line-height 40px
      overflow hidden
      text-align justify
      border-bottom 1px solid #ebebeb
    .comment
      padding-left 30px
      .comment-title
        height 60px
        line-height 60px
      .comment-list
        padding 30px 0
        border-bottom 1px solid #ebebeb
        .inner
          position relative
          .cover
            position absolute
            width 70px
            height 70px
            // background url('../assets/images/default.jpg') no-repeat
            background-position: 50%;
            background-size: 100%;
            border-radius 50%
          .right
            padding 0 30px 0 80px
            .name
              font-size 20px
              color #999
              height 30px
            .title
              font-size 20px
              font-weight 600
              height 30px
            .content
              height 1.06667rem
              overflow hidden
              line-height .53333rem
              text-align justify
              color #999
</style>