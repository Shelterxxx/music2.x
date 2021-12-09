<template>
    
        <div>
            <slot></slot>  
            <!-- <div v-if='comments.length>10 ? comments.length=10: flase'>   -->
            <div  class="commit"  v-for="(item) in comments" :key="item.commentId">
                <div style=" overflow: hidden;">  <img v-lazy="item.user.avatarUrl" alt="">
                 <el-link  @click="$router.push(`/self/${item.user.userId}`) ;  $store.state.open=false " type="primary">{{item.user.nickname}}:</el-link><span  >{{item.content}}</span>
                  <div v-if='item.beReplied' style=" background-color: rgb(151, 151, 151);">
                    <div v-for="(item) in item.beReplied" :key="item.id" >
                 <el-link  type="primary">@{{item.user.nickname}}:</el-link> <span  >{{item.content}}</span>
                    </div>
                  </div>
                 
                 </div>
                          
                 <div  style="overflow:hidden">
                     <div style=" float: left;"> {{item.time|dateFormat}}</div>
                     <div style=" float: right;">
                       <i  class="el-icon-thumb">{{item.likedCount}}</i>
                       <i class="el-icon-link"></i>
                       <i class="el-icon-chat-line-round"></i>
                     </div>
                 </div>
                
            </div>
             <!-- <div v-if="(comments.length>10&& type=='最热')? true : false"> <button>更多</button></div> -->
            </div>
        <!-- </div> -->
    
    
</template>

<script>
export default {
    data(){
        return{
            newarr:[]
        }
    },
    props:['comments','type'],
    inject:['repon'],
    updated(){
 console.log(this.repon)
    },
      mounted(){
          console.log(this.repon)
            if(this.type=='最热'){
                if(this.comments.length>10){
                //  this.newarr=this.comments.map((item,index)=>{
                //              if(index<10){
                //                  return item
                //              }else{
                //                  break;
                //              }

                //     })
                
                for( let i=0;i<10;i++){
                   this.newarr.push(this.comments[i])
                  
                }
                    console.log(this.newarr)
                }
            }else{
            for(let i=0;i<this.comments.length;i++){
                   this.newarr.push(this.comments[i])
                  
                }
                console.log(this.newarr)
            }
      }
 
}
</script>

<style lang="less" scoped>
img{
  
    float: left;
    height: 50px;
    width: 50px;
    border-radius: 50%;
}
span{
    font-size: 10px;
    
}
i{
    margin: 0px 15px;
}
i:hover{
    color: red;
}
.commit{
  
    overflow: hidden;
     border-bottom:1px solid rgb(22, 22, 22)
}
</style>