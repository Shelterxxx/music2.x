<template>
    <div>
        <div class="header">
         <div class="img">
             <img  class="headimg" :src="user.profile.avatarUrl" alt="">
         </div>
         <div class="content">
           <h1>{{user.profile.nickname}}</h1>
           <div style="overflow:hidden; line-height:40px"> 
               <span style=" background-color: red;  border-radius:20px; margin:0px 10px">LV{{user.level}}</span>
                 <span v-if="user.profile.gender==1?true:false">♂</span>
                    <span v-else>♀</span>
           <i></i>
           <el-button  v-if="userID==$store.state.user.id" @click="$router.push(`/user/${$route.params.id}`)" style="border-radius: 30px ; float:right" icon="el-icon-edit">编辑个人信息</el-button>
           </div>
            <div class="love" style="text-align:center">
            <div> 
                <h1>{{user.profile.eventCount}}</h1>
                <h4>动态</h4>
            </div>

             <div>
                <h1>{{user.profile.follows}}</h1>
                <h4>关注</h4>
            </div>
           
             <div>
                  <h1>{{user.profile.followeds}}</h1>
                <h4>粉丝</h4>
            </div>
        
            </div>
            <h6 style="margin:10px">所在区域：{{user.profile.city}}</h6>
                <h6 style="margin:10px">个人简述:  {{user.profile.signature}}</h6>
         </div>
        </div>
        <div>
            <h4  style="margin:0px 20px; background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);">歌单({{playlist.playlist.length}})</h4>
            <div style="display:flex; flex-wrap: wrap;">
                 <div class="imgurl"  @click="$router.push(`/playlist/${item.id}`)"  v-for="(item) in playlist.playlist" :key="item.id" style="margin:20px" >
     <div   style='position:relative;' > <img style="height:100% ;width:100%" :src="item.coverImgUrl" alt="">
     <div class="playcount"  style="position:absolute top:0px  left:0px" >{{item.playCount|playnum}}</div>
    <img  class="playMusic"  style="position:absolute top:0px  left:0px"  src="../assets/playMusic.png" alt=""  >
     </div> 
      <span >{{item.name}}</span>
    </div>
            </div>
        </div>
    </div>
</template>
<script>
import playlistVue from './playlist/playlist.vue'
export default {
    data(){
        return{
            user:{},
            playlist:{}
        }
    },
    computed:{
      userID(){
          return this.$route.params.id
      },
      
    },
    watch:{
     userID(){
this.getdatails()
     }
    },
    methods:{
          async  getdatails(){
                let result = await this.axios.get(`/user/detail?uid=${this.userID}`)
                console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,result)
                this.user=result.data
            let result1 = await this.axios.get(`/user/playlist?uid=${this.userID}`)
                console.log(`用户信息`,result1)
                this.playlist=result1.data
            }
    },
    mounted(){
          this.getdatails()
    }
    
}
</script>
<style lang="less" scoped>
.header{
    margin: 25px;
    height: auto;
    display: flex;
    .img{
        img{
            width: 15vw;
            height: 15vw;
            border-radius: 50%;
        }
    }
    .content{
        flex: 1;
        .love{
            border-top:1px solid rgb(67, 67, 67) ;
            display: flex;
            
            div{
            width: 100px;
            height: 60px;
            border-right: 1px solid;
            
            }
            :last-child{
                 border-right: 0px solid;
            }
        }
    }
   
}
 .imgurl{
        width: 18vw;
        height: 18vw;
        .playcount{
            position:absolute;
            top: 5px;
            right: 5px;
        }
        .playMusic{
            opacity: 0;
              position:absolute;
            bottom: 5px;
            right: 5px;
        }
        :hover ~.playMusic{
            opacity: 1;
            transform: all 2s;
        }
    }
    .headimg:hover{
       box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
         animation: rotate 5s linear infinite;
       
    }
    @keyframes rotate{
        from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
}
</style>