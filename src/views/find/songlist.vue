<template>
<div  style="height:calc(100vh - 200px) ; overflow:auto" ref="top"  v-load='list'>
   <el-container >
  <el-header>
      <el-popover
    placement="right"
    title="标题"
    width="400"
    trigger="hover"
    >
    <div class="box" style=" width: 500px;">
         <el-button @click="changetag(item.name)" round v-for="(item) in tags" :key="item.id">{{item.name}}</el-button>
    </div>
    <el-button slot="reference">{{cat}}</el-button>
  </el-popover>
   <div class="right">
    <span  @click="changetag(item.name)"  class="span1" v-for="(item) in hottags" :key="item.name"  :class="item.name==cat? `span2` : ''">{{item.name}}</span>
   </div>
  </el-header >
  <el-main v-loading="loading"  id="center" >
    <div class="imgurl" @click="toplaylist(item.id)" v-for="(item) in playlist" :key="item.id" >
     <div   style='position:relative' > <img v-lazy="item.coverImgUrl" alt="">
     <div class="playcount"  style="position:absolute top:0px  left:0px" >{{item.playCount|playnum}}</div>
    <img  class="playMusic" src="../../assets/playMusic.png" alt=""  >
     </div> 
      <span >{{item.name}}</span>
    </div>

  </el-main>
   <!-- <Pagination @pageChange='pageChange' :page='page'  limit='500'></Pagination> -->
</el-container></div>
</template>

<script>
import Pagination from '../../components/fenye.vue'
import load from '../../network/load'
export default {
    data(){
        return{
          page:1,
          cat:'ACG',
          tags:[],
          hottags:[],
          tag:'ACG',
          playlist:[],
          loading: true
        }
    },
    directives:{
     load
    },
    methods:{
      changetag(index){
        this.cat=index
        console.log(index)
        this.page=1
      },
      pageChange(page){
        this.$refs.top.scrollTop=0
            this.page=page
      },
  
      async list(){
     this.page+=1
          // top.scrollTop =0
        
        this.loading=true
 let result3 = await this.axios.get(`/top/playlist?cat=${this.cat}&limit=50&offset=${this.page*50}`)
  this.playlist.push(...result3.data.playlists)
     this.loading=false
      },
      toplaylist(index){
        this.$router.push(`/playlist/${index}`)
      }
    },
    watch:{
      cat(val,oldval){
        this.playlist=[]
       this.list()

      },
    },
  async  mounted(){
        let result = await this.axios.get('/playlist/highquality/tags')
       
                let result1 = await this.axios.get('/playlist/hot') 
                this.tags=result.data.tags
         this.hottags=result1.data.tags
         console.log(result1)
          console.log(result,'sss')
         let result3 = await this.axios.get('/top/playlist?cat=ACG&limit=50&offset=6')
         console.log(result3)
         this.playlist=result3.data.playlists
         console.log(this.playlist)
         this.loading=false
       
    },
    components:{
      Pagination
    }   
      
}
</script>



<style lang="less" scoped>
.span2{
  color: red;
  font-size: 24px;

}
.box{

    height: 500px;
    width: 400px !important ;
    display: flex;
    flex-wrap: wrap;
}
.el-button{
    flex: 1;
}
.right{
   text-align: end;
    width: 600px;
    height: 100px;
    float:right
}
.el-main{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.imgurl{
  width: 200px;
  height: 250px;
 
}
// span{
//   display: inline-block;
// }
img{
  margin:  0px  auto;
  border-radius: 5px;
  height: 200px;
  width: 200px;
}
.span1{
 margin: 10px 7px;
 cursor: pointer;
}
.playcount{
  position: absolute;
  top: 0px;
  right: 0px;
}
.playMusic{
  opacity: 0;
  width: 50px;
  height: 50px;
   position: absolute;
  bottom: 0px;
  right: 0px;
}
.imgurl :hover ~.playMusic{
  transition: 1s;
  opacity: 1;
}
</style>