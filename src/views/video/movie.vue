<template>
    <el-container>
  <el-header>
       <el-popover
    placement="bottom"
    title="全部视频"
    width="500"
    trigger="click"
   > 
   <div class="groups">
       <div  class="group" v-for="(item) in group" :key="item.id"  :class="groupactiveid==item.id ? 'groupactive':''"  @click="groupchange(item.id,item.name)">{{item.name}}</div>
   </div>
    <el-button slot="reference">{{groupactive}}</el-button>
  </el-popover>
  <div class="right">
   <div  class="moive" v-for="(item) in moives" :key="item.id"  :class="groupactiveid==item.id ? 'groupactive':''"  @click="groupchange(item.id,item.name)">{{item.name}}</div>
  </div>
  </el-header>
  <el-main v-loading='loading'>
    <div class="audios">
          
      <div class="audio" v-for="(item) in audios" :key="item.id" >
          <div style=" position: relative;">  <img v-lazy="item.data.coverUrl" alt="">
          <span style="position:absolute; top:0px; right:0px ">{{item.data.playTime|playnum}}</span>
            <span style="position:absolute; bottom:0px; right:0px ">{{item.data.durationms|timeFormat}}</span>
           <img  class="playMusic" src="../../assets/playMusic.png" alt=""  >
          </div>
        
          {{item.data.title}}
      </div>
      
    </div>
  </el-main>
</el-container>

</template>
<script>
export default {
    data(){
        return{
             moives:'',
             group:"",
              groupactiveid:58100,
             groupactive:'现场',
             audios:[],
             loading:true
        }
    },
    watch:{
         groupactiveid(){
             this.audio()
         }
    },
    methods:{
    async moive(){
        let result =  await this.axios.get(`/video/category/list`)
        console.log(result)
        this.moives=result.data.data
    },
     async moiveall(){
        let result =  await this.axios.get(`/video/group/list`)
        console.log(result)
         this.group=result.data.data
      
    },
    groupchange(id,name){
        this.groupactiveid=id
        this.groupactive=name
    },
   async audio(){
        this.loading= true 
         let result =  await this.axios.get(`/video/group?id=${this.groupactiveid}`,'xxx')
        console.log(result)
         this.audios=result.data.datas
          this.loading= false    }
    },
    mounted(){
        this.moive()
        this.moiveall()
        this.audio()
    }
    
}
  
</script>
<style lang="less" scoped>
.el-button{
    border-radius: 30%;
}
.groups{
    text-align: center;
    cursor: pointer;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: auto;
    .group{
        border-radius: 8px;
        line-height: 40px;
        height: 40px;
        width: 80px;
    }
    
}
.right{
    cursor: pointer;
    text-align: center;
    display: flex;
    float: right;
}
.moive{
 border-radius: 8px;
        line-height: 40px;
        height: 40px;
        width: 80px;
}
 .groupactive{
        background-color: antiquewhite;
    }
    .audios{
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        font-size: 10px;
        justify-content: space-between;
        .audio{
            font-size: 16px;
            
            position: relative;
            margin: 30px 0px;
             height: 10vw;
            width: 20vw;
        }
        img{
             height: 8vw;
            width: 20vw;
        }.playMusic{
            opacity: 0;
         height: 40px;
        width: 40px;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
       
    }
    :hover~.playMusic{
         opacity: 1;
         transition: 1s all;
    }
    }

    
</style>