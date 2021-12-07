<template>
    
    <div  style="" >
        <div class="header" style="z-index:2000" >
            <i style="font-size:40px" @click="$store.state.open=false " class="iconfont icon-31xiala"></i>
              <div style="  display: inline-block; margin-left:100px ;width:300px;magrgin-top:-10px;transform: translate(10px,-10px);">
                    <i   class="iconfont icon-xiangzuo  x "></i>
                     <i  class="iconfont icon-xiangyou1 x"></i>
                     <el-popover
    placement="bottom"
    title="标题"
    width="200"
    trigger="click" 
    :visible-arrow=false
    style="top:20px"
       
    >  <el-input 
       slot="reference"     
    placeholder="请输入内容"
    prefix-icon="el-icon-search"
    v-model="input2">
  </el-input>
  
  </el-popover>

          
              </div>
              <div  style="float:right ;line-height:40px">
                  <el-badge :value="12" class="item">
  <i  style="font-size:40px" class="iconfont icon-youjian_o"></i>
</el-badge>
 <el-popover
    placement="top-start"
    title="选择背景"
   width="500"
    trigger="hover"
>
    <div class="bg">
          <div class="bacg" v-for="(item,index) in color " :key="index"   :style="{backgroundImage:item} " @click='change(item)'></div>
    </div>
    <i class="iconfont icon-pifu" slot="reference"></i>
  </el-popover>
                    <i class="iconfont icon-suoxiao"></i>
                    <i class="iconfont icon-24gl-minimize2"></i>
                    <i class="iconfont icon-guanbi"></i>
              </div>
        </div>
        <div class="center"  ref="center">
        <div style="position:fixed; bottom:100px; left:800px; height:40px; line-height:40px; border-radius: 30px;   background-color: rgb(155, 155, 155);  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)" @click="centerDialogVisible = true"  v-if='$store.state.open'> <i class="el-icon-edit"></i>发布我的评论</div>
           <el-dialog
  :visible.sync="centerDialogVisible"
  width="30%"
  :modal=false
  :destroy-on-close=true
  center>
  <div style="text-align:center ;overflow:hidden" >
      <h1>歌曲：  {{playdetail.name}}</h1>
    <el-input
  type="textarea"
  placeholder="请输入内容"
  v-model="textarea"
  maxlength="30"
  show-word-limit
  
>
</el-input>
 <el-button v-if='textarea' style="float:right ;margin:20px" type="danger" @click="fabu">发布</el-button>
   <el-button v-else style="float:right ;margin:20px" type="danger" disabled >发布</el-button>
  </div>
  
</el-dialog>
            <div  class="play" style="flex:8">
                    <el-backtop target=".center" :bottom="100">
    <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
    >
      UP
    </div>
  </el-backtop>
                  <div  style="display:flex   ">
                      <div style="width:600px; overflow:hidden "  >
                          <div  style=" width: 600px; text-align:center"  >
                              <img  :class="play?'xuan':'xuan1'" src="../assets/play-bar.png" alt="">
                          </div>
                          <div style=" width: 600px; height:300px ; line-height:300px ; text-align:center; position: relative; "  > 
                               <img   src="../assets/disc.png" alt="">
                               <img   ref='sss' :src="playdetail.al.picUrl" :class="['imglist',play?'':'pause']"  alt="">
                          </div>  
                      </div>
                      <div class="lysic" style="flex:12">
                          <div ref="Sine" class="line" style="height:auto">
                              <h1 style="margin:30px">{{playdetail.name}}</h1>
                          <h4 style="margin:10px">{{playdetail.ar[0].name}}-{{playdetail.al.name}}</h4>
                            <li :class="index==indexx?'line1':''" v-for="(item,indexx) in lyric" :key="indexx">{{item.item}} </li>
                         
                          </div>
                        
                           
                              
                      </div>
                  </div>
 
                 <div style="padding-left:300px"><commit  ref="commit"></commit></div>
            </div>
            <div style="flex:4">
               <div style="padding:20px ; margin-left:150px" >
                   <h4 v-if="simisong">相似歌曲</h4>
                   <div @click="$store.commit('changepalyid',item.id)" class="song" v-for="(item) in simisong" :key="item.id">
                       <img  :src="item.album.picUrl" alt="">
                       <span>{{item.artists[0].name}}-{{item.name}}</span>
                   </div>
               </div>
             
            </div>
        </div>
    </div>
</template>
<script>
import commit from './commit.vue'

export default {
    data(){
        return{
            color:['linear-gradient(to right, #ebc0fd 0%, #d9ded8 100%)','linear-gradient(to right, #fddb92 0%, #d1fdff 100%)','linear-gradient(to right, #a8edea 0%, #fed6e3 100%)','linear-gradient(to right, #ed4264 , #ffedbc )'],
           playdetail:'',
           input2:'',
           lyric:"",
           index:0,
           simisong:[],
           centerDialogVisible:false,
           textarea:'',
           repon:"xxx",
    
        }
    },
    provide(){
        return{
          repon:this.repon   
        }
        
       },
    methods:{
        change(item){
          this.$emit('color',item)
        },
    async    fabu(){
        console.log(this.songid)
         document.querySelector('.center').scrollTop=this.$refs.commit.$children[1].$el.offsetTop
        console.log()
                 let result1 =await this.$request('/comment',{
       params:{
           t:1,
           type:0,
           id:this.songid,
           content:this.textarea
       }
   } 
   )
   console.log(result1)
    if(result1.data.code =200){
                 this.$message({
          message: '发布成功',
          type: 'success',
        
        });
        this.centerDialogVisible=false
        this.textarea=''
        this.$refs.commit.$children[1].comments.unshift(result1.data.comment)
            }
        },
     async   mvmusic(val){
            let result1 =await this.axios.get('/simi/song',{
       params:{
           id:val
       }
    
   }
  
   )
   this.simisong=result1.data.songs
    console.log(result1,'15156165165')
        },
      async palymusic(val){
    
   let result1 =await this.axios.get('/song/detail',{
       params:{
           ids:val
       }
   })
   this.playdetail=result1.data.songs[0]
   console.log(result1)
    },
   async lysic(val){
        let result =await this.axios.get(`/lyric?id=${val}`)
        this.lyric=result.data.lrc.lyric.split(/\n/igs)
     let arr=   this.lyric.map((item,i)=>{
            let min=item.slice(1,3)
             let sec=item.slice(4,6)
              let m=item.slice(7,10).split(']')[0]
              return {min,sec,m,item:item.slice(11,item.length),time:parseInt(min)*60000+parseInt(sec)*1000+parseInt(m)}
        })
         this.lyric= arr
                console.log(  arr)

    }
    },
    computed:{
         play(){
             return this.$store.state.isPlay
         },
         songid(){
               return this.$store.state.songid
         },
         time(){
             return this.$store.state.time
         }
    },
        watch:{
            
            time(val){
               
                   let arr=[]
                  for(let i=0;i<this.lyric.length;i++){
                     
                      if(this.lyric[i].time<val){
                           arr.push(i)
                        
                      }
                        
                  }
                
                  this.index=arr[arr.length-1]
             let move =(document.querySelector('.line').offsetHeight)/this.lyric.length
              
              document.querySelector('.lysic').scrollTop=move*this.index-50
            //   if(!this.play){
                       
            //            document.querySelector('.imglist').style.transform=`rotate(${(parseInt(val/1000)%20+1)*18}deg)`
            //            console.log(`rotate(${parseInt(val/1000)%20*18}deg)`,document.querySelector('.imglist').style.rotate)   
                     
                     
            //   }
            },
songid(val,oldval){ 
       console.log(val,'ssssss')
                 //判断是否收藏
                   this.lysic(val)
    this.palymusic(val)
      this.mvmusic(val)
 },
   
        },
        components:{
            commit
        },
    mounted(){
      
        console.log(this.play)
           this.palymusic(this.$store.state.songid)
           this.lysic(this.songid)
           this.mvmusic(this.songid)
            
            
    }
}
</script>
<style lang="less" scoped>

.header{

    
    padding: 20px;
     i{
         margin: 0px 20px;
          font-size: 40px;
     }
    .x{
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        height: 40px;
        width: 40px;
        margin: 0px 5px;
        display: inline-block;
        border-radius: 50%;
        background-color: rgb(186, 189, 189);
        
    }
    .el-input{
        position:absolute;
         float: left;
         width: 200px;
    }
   .el-input /deep/ .el-input__inner{
        border-radius: 20px;
       
    }
   
}
 .bg{
       display: flex;
        justify-content: space-between;
    }
    .center{
        display: flex;
        position: relative;
        height: calc(100vh - 170px);
        overflow: auto;
        width: 100%;
       
    }
    img{
        height: 300px;
        width: 300px;
    }
    .imglist{
        position:absolute;
       top: 48px;
    left: 198px;
    border-radius: 50%;
    height: 205px;
    width: 205px;
 border-radius: 50%;
  animation: rotate 20s linear infinite;
    }
    .xuan{
        position: relative;
        height: 100px;
        width: 100px; 
    z-index: 200;
     transform: rotate(20deg);
         transform-origin:0%  0;
          transform-origin:0%  0%;
          transition: all 2s;
    }
   .xuan1{
        position: relative;
        height: 100px;
        width: 100px; 
    z-index: 200;
     transform: rotate(0deg);
         transform-origin:0%  0;
          transform-origin:0%  0%;
           transition: all 2s;
    }
  .pause {
    animation-play-state: paused;
  }
    .lysic{
        
        text-align: center;
     
        height: 400px;
    overflow: scroll;
    }
   @keyframes rotate{
       100%{transform:rotate(360deg)} 
    
}  
.line1{
  
    color: red;
    font-size: 32px;
     animation: fontx 1s linear ;
}
  @keyframes fontx{
      from{font: 300; opacity: 0.5;}
      to{font: 500; opacity: 1; color: rgb(255, 0, 0);}
  }
li{
    margin: 20px 0px;
}
.song{
    height: 50px;
    width: 200px;
       margin:10px 0px;
line-height:50px;

  white-space:nowrap;

  overflow:hidden;

text-overflow:ellipsis;
    img{
        float: left;
        height: 50px;
        width: 50px;
    }
}
 .el-dialog__body{
    text-align: center;
}
.bacg{
    height: 100px;
    width: 100px;
    border-radius: 50%;
}
 /deep/.el-popper{
 border-radius: 20px 
}
</style>