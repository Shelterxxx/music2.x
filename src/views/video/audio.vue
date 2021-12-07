<template>
   <el-row :gutter="20">
  <el-col :span="16">
    <div class="mv">
      <video :src="url"
     
      controls='controls'
            ></video>
            <div>
             <img style="float:left" :src="datails.cover" alt=""> 
          <el-link type="primary">{{datails.artistName}}</el-link>
            </div>
            <div>
              <h1>{{datails.desc}}</h1>
              <span> 播放次数：{{datails.playCount|playnum}}        </span>            <span> 发布时间：{{datails.publishTime}}</span>
            </div>
            
            <div>
              <el-button  v-for="(item) in datails.videoGroup " :key="item.id" round>{{item.name}}</el-button>
              <div>
              <el-button round icon="el-icon-thumb">点赞({{datails.subCount}})</el-button>
              <el-button round  v-if='isstar' @click="star" icon="el-icon-folder-add">已收藏({{datails.shareCount}})</el-button>
               <el-button round v-else @click="star" icon="el-icon-folder-add">收藏({{datails.shareCount}})</el-button>
                <el-button round icon="el-icon-share">分享({{datails.shareCount}})</el-button>
                  <el-button round icon="el-icon-download">下载</el-button>
              </div>
               <h1>评论({{pageall}})</h1>
        <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
        <el-button style="float:right" @click="fabu" round>发布</el-button>
              <comment :comments='hotcomments' type='最热' v-if='page==1? true: false'>
                <h3>精彩评论</h3>
                </comment >  
                <comment  :comments='comments' type='最新' >
                <h3>最新评论   </h3>
                </comment>  
                  <pagination :pageall='pageall'  :pagelimit='pagelimit' @pageChange='pageChange'></pagination>
            </div>
    </div>
  </el-col>
  <el-col :span="8">
    <div   class="simmv" v-for="(item) in simmvs" :key="item.id" >
      <div class="imgs" >
        <span  style=" position:absolute; top:0px; right:0px;" ><i class="el-icon-caret-right"></i>{{item.playCount|playnum}}</span>
               <span  style=" position:absolute; bottom:0px; right:0px;" >{{item.duration|timeFormat}}</span>
            <img  v-lazy="item.cover" alt="">
      </div >
           <div class="miaosu" style="flex:3"> 
             <h5  @click="changemv(item.id)">{{item.name}}</h5>
    
      <span @click='singer(item.artistId)'>{{item.artistName}}</span></div>
    </div>
  </el-col>
</el-row>
</template>
<script>
import comment from '../../components/commit.vue'
import pagination from '../../components/fenye.vue'
export default {
        components:{comment,pagination},
    data(){
        return{
          isstar:false,
          datails:'',
           url:'',
           comments:'',
           hotcomments:"",
           pageall:'',
           page:1,
           pagelimit:20,
           simmvs:[],
           textarea:""
        }
    },
    computed:{
      id(){
          return this.$route.params.id

      }
    },
    methods:{
     
      star(){
         let t=1
      if(this.isstar){
          t=0
      }else{
       
      }
        this.$request(`/mv/sub`,{params:{
          mvid:this.$route.params.id,
          t:t
        }}).then(res=>{
          if(res.data.code==200){
             this.isstar=!this.isstar
             if( this.isstar){
                this.datails.shareCount++
             }else{
                   this.datails.shareCount--             }
          }
        
        })
             
      },
      fabu(){
        if(!this.textarea){
           this.$message({
          message: '请输入评论',
          center: true
        });
        }else{
          this.$request(`/comment`,{params:{
            t:1,
            type:1,
            id:this.$route.params.id,
            content:this.textarea
          }}).then(res=>{
          if(res.data.code==200){
            console.log(this.comments,[res.data.comment])
            this.comments.unshift(res.data.comment)
             console.log(this.comments,res.data.comment)
              this.$message({
          message: '成功评论',
          center: true
        });
          }
          })
        }
      },
    async    mvdatails(){
            let result = await  this.axios.get(`/mv/detail?mvid=${this.$route.params.id}`)
            console.log(result)
            this.datails=result.data.data
             let result1 = await  this.axios.get(`/mv/url?id=${this.$route.params.id}`)
            console.log(result1)
            this.url=result1.data.data.url
        },
          async   commit(){
               let result =await this.axios.get(`/comment/mv?id=${this.$route.params.id}`)
                  this.comments=result.data.comments
                 this.hotcomments=result.data.hotComments
                 console.log( result.data)
                 console.log( this.comments)
              
                    this.pageall=parseInt(result.data.total) 
        },
        async  simmv(){
          let result = await this.axios.get(`/simi/mv?mvid=${this.$route.params.id}`)
          console.log(result,'sss')
          this.simmvs=result.data.mvs
                  },
       async pages(val,oldval){
      let result =await this.axios.get(`/comment/mv`,{params:{
        id:this.$route.params.id,
        limit:20,
        offset:val*20
      }})
       this.comments=result.data.comments 
       console.log( this.comments)
        },
        pageChange(page){
     this.page=page
     console.log(this.page)
        },
        changemv(id){
          this.$router.push(`/audio/${id}`)

        },
        singer(id){
           this.$router.push(`/singer/${id}`)
        }

    },
    watch:{
        id(val){
          console.log(val)
           this.mvdatails()
     this.commit()
     this.simmv()
        },
        page(val,oldval){
          this.pages(val,oldval)
        }
    },
    
  async  mounted(){
      this.mvdatails()
     this.commit()
     this.simmv()
      let  result1 =await  this.$request(`/mv/sublist`)
  console.log(result1.data,'手长')
     this.isstar=result1.data.data.some(item=>{
          return    item.vid==this.$route.params.id
           })  
      }

}
</script>
<style lang="less" scoped >
.mv{
  
  line-height: 50px;
  margin: 20px;
  img{
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  video{
    height: 400px;
     width: 100%;
}
}

.el-row{
  height: 100%;
}
.el-col{
  height: 100%;
}
textarea{
    height: 100px;
    width: 100%;
}
.simmv{
  display: flex;
  overflow: hidden;
     height: 90px;
     padding: 10px;
     .imgs{
       color: rgb(247, 244, 244);
       position:relative;
       flex: 2;
     }
   .miaosu{
     padding: 5px;
     flex: 3;
   }
  img{
   
    height:100% ;
    width: 100%;
    border-radius: 5px;
    
  }
}
</style>