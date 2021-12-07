<template>
    <div class="index">
      <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="(item,index) in pic" :key="index">
     <img v-lazy='item.pic' alt=""   @click="playid(item)">
     <el-tag
    type="danger"
    effect="dark"
    style="position: absolute; bttom:0%;right: 0%;border-radius: 14px">
  {{
      item.typeTitle
  }}
  </el-tag>
    </el-carousel-item>
  </el-carousel>
  <div class="center">
<div >
        <h1><a>歌单推荐</a></h1>
            <div class="tuijian" >
                <div v-for="(item,index) in palylist" :key="index" @click="playList(item)">
                    <img v-lazy="item.coverImgUrl" alt="">
                     <span>{{item.name}}</span>
                      <span style="position: absolute;top:0px;left:0px; width: 100%; text-align:end   ;
 ">{{item.playCount|playnum}}</span>
                  <img  class="playMusic" src="../../assets/playMusic.png" alt=""  >
                    </div>
              
            </div>
        </div>
         <div>
        <h1><a>推荐mv</a></h1>
            <div>
                <div><img src="" alt=""></div>
                <span></span>
            </div>
        </div>
         <div>
        <h1><a>最新音乐</a></h1>
            <div>
                <div><img src="" alt=""></div>
                <span></span>
            </div>
        </div>
  </div>
    
    </div>
</template>
<script>

export default {
    data(){
        return{
        pic:[], //轮播图
        palylist:[]  //推荐歌单
        }
    },
    methods:{
        //获得推荐歌单
       async getHotlist(){
               let result = await this.axios.get('/top/playlist/highquality/',{
                   params:{
                       tags:'ACG',
                       lasttime:(Math.random() * 1297).toFixed(0) - 12,
                       limit:12
                   }
               })
               this.palylist=result.data.playlists
               console.log(  result)
        },
        playList(index){
            console.log(index)
          this.$router.push('/playlist/'+index.id)
        },
        playid(item){ 
            console.log(item)    
                  if(item.typeTitle=='新歌首发'){

                      this.$store.commit("changepalyid",item.song.id)
                       this.$store.commit("playList",item.song.id)

                console.log(this.$store.state,'sss')
                  }else if(item.typeTitle=='歌单'){
                          this.playList(item.targetId)
                  }                  
                
        }

    },
    async mounted(){
        let result = await this.axios.get('/banner?type=3')
        console.log(result)
         this.pic=result.data.banners
         console.log(this.pic)
          this.getHotlist()
          
    }
    
}

</script>
<style lang="less" scoped>
.index{
    height: calc(100vh - 200px);
    overflow: auto;
}
.el-carousel{
    margin-top: 5px;
}
img{
    height: 100%;
    width: 100%;
}
.center{
.tuijian{
display:flex;
height: auto;
width: 100%;
flex-wrap: wrap;
text-align: center;
background: linear-gradient(); 
div{
    position: relative;
    border-radius: 3px;
    margin: 15px;
    // height: 200px;
    flex: 1 1 13% ;
    :hover ~.playMusic{
   opacity: 1;
    animation: all 5s;
    }
  }
img{
    border-radius: 5px;
    width: 100%;
    height: 80%;
}
.playMusic{
    height:50px;
    width: 50px;
    position: absolute;
    bottom: 50px;
    right: 0px;
    opacity: 0;
}
}
}
</style>