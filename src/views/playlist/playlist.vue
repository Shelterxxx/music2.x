<template>
    <el-container  style="calc(100vh -140px) ; overflow:auto" >
  <el-header  style=" height: auto;">
    <div class="left">
        <img :src="coverImgUrl" alt="">
    </div>
     <div class="rigth">
         <h1>{{name}}</h1>
         <h4>创建时间：{{time|dateFormat}}</h4>
         <div style='overflow:hidden;line-height:50px'>
           <img style="height: 50px;width: 50;border-radius: 50% ;float:left" :src="playlist1.creator.avatarUrl" alt="" @click="$router.push(`/self/${playlist1.creator.userId}`)">
           <el-link type="info">{{playlist1.creator.nickname}}</el-link>
         </div>
         <el-button type="danger" icon="el-icon-video-play" round>播放</el-button>
         <el-button v-if="isstar"  @click="change" icon="el-icon-folder-add" round>已收藏  ({{add|playnum}})</el-button>
          <el-button v-else  @click="change1" icon="el-icon-folder-add" round>未收藏  ({{add|playnum}})</el-button>
         <el-button  icon="el-icon-position" round>分享({{share|playnum}})</el-button>
         <el-button  icon="el-icon-video-play" round>全部下载</el-button>
          <div  style="margin-top:20px">
              <span style="margin-top:3px">标签:</span>
              <el-link  v-for="(item,index) in tags" :key="index"  type="success" style="margin-left:10px" >{{item}}</el-link>
          </div>
          <div  style="margin-top:20px">
               <span style="margin-right:15px  " >歌曲:{{trackIds.length}}</span>
                    <span >播放:{{playCount|playnum}}</span>
          </div>
          <div style="position: relative;" > <i v-if="text ?true : false"  @click='close' style="position:absolute ; top:0px ;right:0px" class="el-icon-caret-top"></i>
           <i v-if="text ?false : true"  @click='close' style="position:absolute ; top:0px ;right:0px" class="el-icon-caret-bottom "></i>
      
          
          
          <div class="text">
              简介： {{description}}  
          </div></div>
     </div>
  </el-header>
  <el-main> 
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="歌曲" name="first"><el-table
    v-loading='loading'
      :data="tableData"
      
      style="width: 100%" 
    @row-dblclick="clickRow"
       ref="Table"
      >
       <el-table-column
            label="序号"
            width="100px">
        <template slot-scope="scope">
           <span  v-if='scope.row.id==playid?false:true' >{{scope.$index+1}} </span> 
           
             <i    v-if='scope.row.id==playid' style=" color: red;" class=" iconfont icon-shengyin"></i>
                <i  v-if='$store.state.loveid.indexOf(scope.row.id)==-1?true:false' style="margin:10px ; " class="iconfont icon-aixin"  ></i>
              <i v-else  style="margin:10px;color:red  " class="iconfont icon-aixin1"  ></i>
           <i  class="iconfont icon-xiazai"   ></i>
             <!-- <i  class=" iconfont icon-shengyin"></i>
             <i class=" iconfont icon-shengyin"></i> -->
        </template>
    </el-table-column>
      
        <!-- <template slot-scope="scope">
        <i   v-if='scope.row.id==playid'
          class="el-icon-video-play"
          @click="handleEdit(scope.$index, scope.row)"></i>
      </template> -->
     
       
        <!-- <el-table-column label="操作"  >
      <template slot-scope="scope">
         <i  style="margin:10px" class="iconfont icon-aixin"  @click="islove" ></i>
           <i  class="iconfont icon-xiazai"  @click="islove" ></i>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column> -->
      <el-table-column
        prop="name"
        label="歌名"
       >
      </el-table-column>
      <el-table-column
        prop="ar[0].name"
        label="歌手"
        >
      </el-table-column>
      <el-table-column
        prop="al.name"
        label="专辑名"
        >
      </el-table-column>
        <el-table-column
        prop="dt"
        label="时间长"
       >
       
      </el-table-column>
       
    </el-table></el-tab-pane>
    <el-tab-pane label="评论" name="second"><commit v-if="activeName=='second'"></commit></el-tab-pane>
    <el-tab-pane label="收藏者" name="third"><share v-if="activeName=='third'" ></share></el-tab-pane>
  </el-tabs></el-main>
</el-container>
</template>
<script>

export default {
    data(){
        return{
          isstar:"",
          text:false,
          loading:true,
          //  id:Number,
           coverImgUrl:String,
           name:String,
           time:Number,
           add:Number,
           share:Number,
           tags:[],
           playCount:Number,
           trackIds:[],
           songlist:[],
           description:'',
            activeName: 'first',
            tableData: [],
            playlist1:{},
            index:1

        }
    },
    methods:{
       indexMethod() {
        return this.index ;
      },
    async  change(){
      if(localStorage.getItem('token')){
         let result = await this.$request(`/playlist/subscribe?t=2&id=${this.$route.params.id}`)
        
         console.log(result)
         if(result.data.code==200){
           this.isstar=false
            this.$store.commit('changersongList',this.playlist1)
          this.$message('取消成功');
         }
      }else{
            this.$message('请登录');
      }
       
      },
   async   change1(){
 if(localStorage.getItem('token')){
         let result = await this.$request(`/playlist/subscribe?t=1&id=${this.$route.params.id}`)
         console.log(result)
         if(result.data.code==200){
           this.isstar=true
            this.$store.commit('changersongList',this.playlist1)
          this.$message('添加成功');
         }
      }else{
            this.$message('请登录');
      }
      },
      handleEdit(x,y){
       console.log(x,y)
      },
       async playlist(val){
          this.isstar=this.$store.state.songList.some(item=>{
              return item.id==this.$route.params.id
       })
           console.log(this.isstar)    //判断是否收藏
       let result = await this.axios.get('/playlist/detail',{
           params:{
               id:val
           }
       }) 
      
       let result1 = await this.$request('/playlist/detail',{
           params:{
               id:val
           }
       })
       this.coverImgUrl=result.data.playlist.coverImgUrl
         this.name=result.data.playlist.name
         this.time=result.data.playlist.updateTime
         this.add=result.data.playlist.subscribedCount
         this.share=result.data.playlist.shareCount
          this.tags=result.data.playlist.tags
           this.playCount=result.data.playlist.playCount
           this.trackIds=result.data.playlist.trackIds
           this.description=result.data.playlist.description
         console.log(result.data.playlist)
            this.playlist1=result.data.playlist
           let playid=''
       playid=this.trackIds.map(item=>{
          return  item.id
         })
        //  let result2 = await this.axios.get(`/song/url?id=${playid}`)  //歌单播放url
        //    console.log(result2)
           let result4 = await this.axios.get(`/song/detail?ids=${playid}`)  //歌单详细
           console.log(result4)
            this.loading=false
             this.tableData=result4.data.songs
             for(let i=0; i< this.tableData.length;i++){

             
               this.tableData[i].dt=this.timex(this.tableData[i].dt)
            
             }
         this.Userid(result.data.playlist.userId)
        },
         handleClick(tab, event) {
      },
        Userid(id){
       
        },
        timex(time ){  
     let m ,s
        if(time>1000){
             m =parseInt(time/60000)
       s = Math.round(time/1000 % 60)
        }else{
               m =parseInt(time/60)
       s = Math.round(time % 60)
        }
    
        
  if(m<10){
    m='0'+m
  }
  if (s < 10) {
    s = "0" + s;
  }
  return `${m}:${s}`
        },
        clickRow(row, column, cell, event){
          if(column.label=='歌手'){
            console.log(row.ar[0].name)
          }
          if(column.label=='专辑名'){
              console.log(row.al.name)
          }
            this.$store.commit('changepalyid',row.id)
              let playid=''
       playid=this.trackIds.map(item=>{
          return  item.id
         })
            this.$store.commit('playList',playid)
            console.log(this.$store)
              console.log(row,column)
            },
            open(){
              this.text=!this.text
              let div =document.querySelector('.text')
              div.style.height='auto'
            },
            close(){
    this.text=!this.text
    let div =document.querySelector('.text')
    if(this.text){
      div.style.whiteSpace='normal'
    }else{
       div.style.whiteSpace='nowrap'
    }
              
              
            }
      
    },
    computed:{
      playid(){
        return this.$store.state.songid
      },
      id(){
        return this.$route.params.id
      }
    },
    watch:{
      id(val){
        console.log(val)
         this.playlist(val) 
      }
    },
  async  mounted(){
    console.log(this.$store.state.loveid.indexOf(1466598054),'sss')
       console.log(this.$store.state.loveid,'sss')
     this.playlist(this.$route.params.id) 
      
       

    },
    components:{
    commit:()=>import('../../components/playlist/commit.vue'),
    share:()=>import('../../components/playlist/share.vue')
    }
}
</script>
<style lang="less" scoped>
.el-table{
  cursor: pointer;
}

.el-header{

   display: flex; 
   height: 400px;
 .left{
     
     img{
        
         width: 220px;
         height: 220px;
         border-radius: 5px;
         margin: 20px;
     }
 }
  .rigth{
    padding-top: 20px;
     flex:1;
 }
}
.text{

  width: 60vw;
  line-height: 60px;  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px 0px  30px 0px ;
}

</style>