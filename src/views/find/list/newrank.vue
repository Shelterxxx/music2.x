<template>
    <div class="center" @>
     
    <div  class="list" v-for="(item) in ranklist" :key="item.id  " @click="$router.push(`/disc/${item.id}`)"> 
        <img src="../../../assets/disc.png" alt="">
        <img v-lazy="item.picUrl" alt="">
      
    </div>
      <span v-if="loadding">正在加载......</span>
    </div>
</template>
 <script>
import {throttle} from '../../../network/debounce'
export default {
    data(){
        return{
             ranklist:"",
             page:1,
             loadding:false        }
    },
    props:['listid'],
    computed:{
       rank(){
             const area ={
           
     全部:'ALL',华语:'ZH',欧美:'EA',韩国:'KR',日本:'JP'
 }
           return   area[this.listid]
       }
        
    },
    watch:{
     rank(val){
         this.$request(`/album/new?area=${val}&limit=30`).then(res=>{
                 this.ranklist = res.data.albums
            console.log(res)
        })
     }
    },
    updated(){
     
   
    },
    mounted(){
             console.log('xxxxxxxx')
        this.$request(`/album/new?area=${this.rank}&limit=30&offset=${this.page}`).then(res=>{
                 this.ranklist = res.data.albums
               this.$parent.$el.addEventListener('scroll',throttle(()=>{
           this.loadding=true
           if(this.$parent.$el.scrollHeight-this.$parent.$el.scrollTop==this.$parent.$el.clientHeight) {
               console.log('ssss')
               this.page++
               this.$request(`/album/new?area=${this.rank}&limit=30&offset=${this.page}`).then(res=>{
                 this.ranklist.push( ...res.data.albums)
            console.log(res)
              this.loadding=false
        })
           }
       },1000))
        })
    }
}
</script>

<style lang="less" scoped>
 .center{
     width: 1100px;
     margin: 0px  auto;
     display: flex;
     flex-wrap: wrap;
     .list{
        position: relative;
        margin: 20px 20px;
        :nth-child(1){
             border-radius:20px;
              height: 180px;
              width: 180px;
              z-index: 1000;
         }
         :nth-child(2){
             position: absolute;
             left: -20px;
             border-radius:20px;
              height: 180px;
              width: 180px;
         }
     }
 }
</style>