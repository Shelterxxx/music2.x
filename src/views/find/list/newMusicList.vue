<template>
    <div class="top"  ref="top"  > 
               <div class="xxx">
                    <div :class="index==0?'active':''  " @click="index=0">
                          新歌速递
                    </div>
                    <div :class="index==1?'active':''" @click="index=1" >
                         新碟上架
                    </div>
               </div>
               <div style=" margin-top:30px ;overflow:hidden">
                   <div class="tuijian">
                          <span v-for="(item,index) in list " :key="index" @click="listc(item)" :class="listid==item?'listx':''"  >{{item}}</span>
                   </div>
                   <div style=" float: right;margin-right:30px " >
                       <el-button type="danger" round><i class="iconfont icon-bofang"></i>全部播放</el-button>
                       <el-button type="primary" round> <i class="el-icon-folder-add"></i>全部收藏</el-button>
                   </div>
               </div>
           
               <div class="center">
                <song v-if="index==0"   :listid=listid></song>
                <rank  v-if="index==1"   :listid=listid></rank>
               </div>
             
    </div>
       
</template>

<script>
import {throttle} from '../../../network/debounce'

export default {
    data(){
        return{
            index:1,
            listid:'全部',
            list:['全部','华语','欧美','韩国','日本']
        }
    },
   
    components:{
              rank:()=>import('./newrank.vue'),
            song:()=>import('./songlist.vue')
    },
    methods:{
        listc(item){
            this.listid=item
        }
    }
}
</script>

<style lang="less" scoped>
.top{
     height:calc(100vh - 200px);
     width: 100%;
     overflow: auto;
     margin: 20px 0px;
     .xxx{
         width: 300px;
         height: 40px;  
         border: 1px solid rgb(0, 0, 0);
         border-radius: 20px;
         margin: 0px auto;
         text-align: center;
         line-height: 40px;
        display: flex;
        div{
            flex:1;
             border: 1px solid rgb(255, 255, 255);
         border-radius: 20px;
         margin: 0px auto;
    
        }
        .active{
            background-color: rgb(136, 136, 136);
            color: rgb(255, 255, 255);
        }
     }
     .tuijian{
         float: left;
          line-height: 40px;
         span{
             margin: 0px 20px;
         }
     }
     .listx{
         color: rgb(255, 0, 0);
         font-size: 32px;
     }
}


</style>