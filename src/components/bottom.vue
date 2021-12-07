<template>
    <el-row style="z-index:300">
  <el-col :span="4" style="padding:10px; display:flex" >
       <audio 
       :src="playid" 
    
       ref='Muisc'
       ></audio>
       <div><img :src="playdetail.picUrl" alt="" @click="$store.state.open=!$store.state.open" ></div>
       <div style="flex:1;margin:5px">
          <div style="margin:5px 0px" class="playid" >{{playdetail.name}} 
      </div>
      <div >
         <h6>{{name}}</h6>
      </div>
       </div>
     
  </el-col>
  <el-col :span="16">
      <div style="text-align:center;padding-top:10px">
      
         <i v-if="playstatus==0" class="iconfont icon-dianshunxu" @click="status"></i> 
         <i v-else-if="playstatus==1" class="iconfont icon-xunhuanbofang" @click="status"></i> 
         <i v-else-if="playstatus==2" class="iconfont icon-24gl-shuffle" @click="status" > </i>
        <i @click="prev()"  class="iconfont icon-shangyiqu" ></i>
       <i    v-if="isplay"    @click="pause()"  class="iconfont icon-zanting"></i>
           <i v-else     @click="play() " class="iconfont icon-bofang"></i>
       <i class="iconfont icon-xiayiqu" @click="next()" ></i>
         <i v-if="!love" class="iconfont icon-aixin"  @click="islove" ></i>
        <i  v-else class="iconfont icon-aixin1"  style="color:red"  @click="islove"  ></i>
       </div>
       <span style="float:left">{{time|timeFormat}}</span>
       <span style="float:right">{{alltime|timeFormat}}</span>
     <el-slider 
@change='line()'
 v-model="value1" 
 ref='line'></el-slider>
  
 </el-col>
  <el-col :span="4"  style="text-align:center ;line-height:80px" >
<el-popover
   popper-class='red'
  placement="top-start"
  width="100"
  id='sss'
  trigger="hover"
  offset="32"
  >

  <el-slider
     @change="line1()"
      v-model="value"
      vertical
      height="100px">
    </el-slider>
  <i class="iconfont icon-shengyin" slot="reference"></i>
</el-popover>
<i   style="" class="el-icon-s-unfold"  @click="drawer = true"></i>

<el-drawer

  title="我是标题"
  :modal='false'
  style="z-index:200"
  :visible.sync="drawer"
  :with-header="false">
 <div class="drawers">
     <h1>播放列表</h1>
     <div  style="overflow: hidden;">
         <div style="float:left">总{{playList.length}}首</div>
         <div style="float:right"><el-button type="primary" icon="el-icon-folder-add">全部收藏</el-button> 
          <el-link  @click="xxx" type="primary">全部删除</el-link>
          </div>
          <div>
               <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
       @row-dblclick="clickRow"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dt"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
      
        prop="ar[0].name"
        
        label="歌手">
      </el-table-column>
    </el-table>
          </div>
     </div>
 </div>
</el-drawer>
<!-- <el-drawer
style="z-index:200"
  title="我是标题"
  :visible.sync="drawer"
  direction="btt"
  modal='false'>
  <span>我来啦!</span>
</el-drawer> -->
</el-col>

</el-row>


       
    
</template>
<script>
import {mapState} from 'vuex'
import {throttle} from '../network/debounce'
import {timex}  from  '../network/time'

export default {
  
data(){
    return{
      playstatus:0,
         drawer: false,
        showslider:false,  //显示滑块
        value:100,            //音量
        isplay:false,       
        value1:0,
        time:0,
        alltime:0,
       playid:String,
       playdetail:{},
        tableData: [],
        index:'',
        love:'',
        name:''
    }
},
methods:{
     clickRow(row, column, cell, event){
          if(column.label=='歌手'){
            console.log(row.ar[0].name)
          }
          if(column.label=='专辑名'){
              console.log(row.al.name)
          }
            this.$store.commit('changepalyid',row.id)
      //         let playid=''
      //  playid=this.trackIds.map(item=>{
      //     return  item.id
      //    })
            
         
            },
  xxx(){
    this.$store.commit('playList',[]) ;console.log(this.$store.state.palyList,'ssss')
    this.tableData=[]
  },
  islove(){
    if(this.love){
      this.$request(`/like?like=false&&id=${this.songid}`).then(res=>{
         console.log(res)
          this.$store.commit('changelove',this.songid)
          this.love=false
          this.$message({
          message: '取消收藏',
          type: 'success'
        });
      })
    }else{
 this.$request(`/like?like=true&&id=${this.songid}`).then(res=>{
    this.$store.commit('changelove',this.songid)
          this.love=true
         console.log(res)
           this.$message({
          message: '收藏成功',
          type: 'success'
        });
         
      })
    }
   
  },
  status(){
     if(this.playstatus<2){
       this.playstatus++
     }else{
       this.playstatus=0
     }
  },
    line(){
      let time =parseInt(this.value1/100*this.alltime/1000)
      console.log(time)
        this.$refs.Muisc.currentTime=time
    },
    line1(){
       this.$refs.Muisc.volume=this.value/100
    },
  async palymusic(val){
    if(this.$store.state.isLogin){
          let x=this.loveList.indexOf(this.songid)
    console.log()
    if(x==-1){
           this.love=false
    }else{
       this.love=true
    }             
           }
      let index =this.playList.indexOf(this.songid)
      this.index=index
   let result =await this.axios.get('/song/url',{
       params:{
           id:val
       }
   })
   let result1 =await this.axios.get('/song/detail',{
       params:{
           ids:val
       }
   })
   this.playdetail=result1.data.songs[0].al 
   this.name = result1.data.songs[0].ar[0].name
    //歌曲详情
   console.log(result1)
  
   this.playid=result.data.data[0].url   //歌曲资源
    this.alltime=result1.data.songs[0].dt
           if(!this.$store.state.isPlay){
      console.log(this.$store.state.isPlay,'xxxxxxxxxx')
       
    }else{
       this.playid=result.data.data[0].url 
    }
   this.$refs.Muisc.addEventListener('timeupdate',throttle(()=>{
     this.$store.commit('changeTime',parseInt(this.time))
       this.time=this.$refs.Muisc.currentTime*1000
      
       
       this.value1= this.time/this.alltime*100
       if(this.$refs.Muisc.ended){
         if(this.playstatus==0){
           this.prev()
         } else if(this.playstatus==1){
          
             this.$refs.Muisc.load()

             console.log( this.$refs.Muisc.loop)
         }
           
           
       }
   },1000))
  
    },
    
    pause(){
         this.isplay=false
         this.$store.commit('changePlay',false)
        this.$refs.Muisc.pause()
      console.log(this.$refs.Muisc,'暂停')  
    },
    play(){
         this.isplay=true
          this.$store.commit('changePlay',true)
        this.$refs.Muisc.play()
      console.log(this.$refs.Muisc,'播放')  
    },
    prev(){
      this.isplay=true
         this.$store.commit('changePlay',true)
      this.$refs.Muisc.autoplay='autoplay'
  let index =this.playList.indexOf(this.songid)-1
       console.log(index)
       if(index<0){
           
           index=this.playList.length-1
           console.log(index)
             this.$store.commit("changepalyid",this.playList[index])
       }else{
           this.$store.commit("changepalyid",this.playList[index])
       }
    },
    next(){
      this.isplay=true
         this.$store.commit('changePlay',true)
       this.$refs.Muisc.autoplay='autoplay'
       let index =this.playList.indexOf(this.songid)+1
       console.log(index)
       if(index>(this.playList.length-1)){
           index=0
            this.$store.commit("changepalyid",this.playList[index])
       }else{
           this.$store.commit("changepalyid",this.playList[index])
       }
    },
    show(){
   this.showslider=!this.showslider
},
   async  songslist(val){
     
       let result4 = await this.axios.get(`/song/detail?ids=${val}`)  //歌单详细
           console.log(result4)
          result4.data.songs.map((item,index,arr)=>{
             arr[index].dt=timex(item.dt)
            
           })
             
           
           this.tableData=result4.data.songs
          
     },
     tableRowClassName({row, rowIndex}) {
        if (this.index === rowIndex) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      history(){
          if(JSON.parse(localStorage.getItem('historylist')) ){

          }else{

          }
      }
},

computed:{
    ...mapState({
        songid:state=>state.songid,
        playList:state=>state.palyList,
        loveList:state=>state.loveid
    })
},
watch:{ 
 songid(val,oldval){ 
    this.$refs.Muisc.autoplay='autoplay'
           if(this.$store.state.isLogin){
          let x=this.loveList.indexOf(this.songid)
    console.log()
    if(x==-1){
           this.love=false
    }else{
       this.love=true
    }             
           }
                 //判断是否收藏
     console.log(val,'发生了改变')
    this.palymusic(val)
    this.value1=0
    this.history(val)
   
    console.log(x)
    
 },
 playList(val){
  
     this.songslist(val)
 }
} ,
 async mounted(){ 
    this.$store.commit('changePlay',false)
    this.palymusic(this.songid)
    
            console.log(this.$store.state.palyList,'sssssssssss')
       let result4 = await this.axios.get(`/song/detail?ids=${this.$store.state.palyList}`)  //歌单详细
           console.log(result4)
          result4.data.songs.map((item,index,arr)=>{
             arr[index].dt=timex(item.dt)
            
           })
  this.tableData=result4.data.songs
  console.log(history,'eeeeeeeeeeeeeeeeee')
  let  result =await  this.$request(`/likelist?uid=${this.$store.state.user.userId}`)
  console.log(result.data)
     this.$store.commit('changelove',result.data.ids)
   
  // let his =[]
  // localStorage.setItem('historylist',his)
}   
}

</script>
<style lang="less" scoped>

.el-row{
    height: 100%;
    width: 100%;
}
.el-col{
    height: 100%;
}
img{
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin: 0px 0px  0px  5px;
   
}
i{
    font-size: 30px;
    margin: 5px 20px ;
}
i:hover{
    color: red;
}
.el-slider{
    width: 75%;
    
    margin: -5px auto;
    
}
.el-drawer__body{
    height: 50%;
}
.drawers{
   padding: 5px;
    text-align: start;
    margin-top:60px;
}
.el-table /deep/.warning-row {
    background: oldlace;
    color: red;
  }
  .playid{
    width:150px;

height:27px;

line-height:27px;

  white-space:nowrap;

  overflow:hidden;

text-overflow:ellipsis;
  }
  .xxx{

    background-color:transparent;
   box-shadow: 0 0px 0px 0 rgba(0,0,0,.1);
        border: 0px solid #EBEEF5;
  }
  
</style>