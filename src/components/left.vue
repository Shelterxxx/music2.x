<template>
    <el-row class="tac">
  <el-col :span="24">
    <el-menu
      default-active="/find"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose" 
      router>    
      <el-menu-item  index='/find'>
        <span slot="title">发现</span>
      </el-menu-item>
    <el-menu-item  index='/video'>
        <span slot="title">视频</span>
      </el-menu-item>
 <el-submenu index="2">
    <template slot="title">我的音乐</template>
    <el-menu-item >最近播放</el-menu-item>
    <el-menu-item >我的收藏</el-menu-item>
  </el-submenu>
  <el-submenu index="3">
    <template slot="title">我的歌单</template>
    <el-menu-item v-for="(item) in playList " :key="item.user" @click="$router.push(`/playlist/${item.id}`)">{{item.name}}</el-menu-item>
  </el-submenu>
   <el-submenu index="4">
    <template slot="title">我的收藏</template>
    <el-menu-item class="test"  v-for="(item) in starList " :key="item.user" @click="$router.push(`/playlist/${item.id}`)">{{item.name}}</el-menu-item>
  </el-submenu>
    </el-menu>
  </el-col>
   </el-row >
</template>
<script>
  export default {
      data(){
          return{
          xxxxxxx:'xx',
          playList:[],
          starList:[]
          }
      },
      computed:{
        islogin(){
          return this.$store.state.isLogin
        },
      user(){
        return  this.$store.state.user
      },
      play(){
         return  this.$store.state.songList
      }
       
      },
      watch:{
        islogin(val){
          if(val==true){
             this.playlist()
          }
        },
         play:{
           handler(val,oldval){
             this.playList=[]
             this.starList=[]
            for(let i=0;i<this.play.length;i++){
               if(this.$store.state.user.userId==this.play[i].userId){
                
                 this.playList.push(this.play[i])
               }else{
                  this.starList.push(this.play[i])
               }
             }
           },
            immediate: false,
    deep: true
         }
      },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
     async playlist(){
        let result1 = await this.axios.get(`/user/playlist?uid=${this.$store.state.user.userId}`)
                     this.$store.commit('changersongList',result1.data.playlist)
             for(let i=0;i<result1.data.playlist.length;i++){
                console.log(this.$store.state.user.userId,result1.data.playlist[i].userId)
               if(this.$store.state.user.userId==result1.data.playlist[i].userId){
                
                 this.playList.push(result1.data.playlist[i])
               }else{
                  this.starList.push(result1.data.playlist[i])
               }
             }
              console.log(this.playList,this.starList,'ssss')
              
      }

    },
    mounted(){
      console.log(this.$store.state)
      
      this.playlist()
    }
  }
</script>
<style lang="less" scoped>
.el-row{
  height:calc(100vh - 140px) ;
  overflow: auto;
}
.el-menu{
    text-align: start;
}
.el-menu-item.is-active{
  background-color: rgb(230, 227, 227);
    font-size: 32px;
    color: rgb(0, 0, 0);
}
.test{
  width: 100%;
   white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>