<template>
<div> 
    <div class='xxx'>
        <div class='users' v-for="(item) in users " :key="item.id">
           <div> <img v-lazy="item.avatarUrl" alt="">
           <span>{{item.nickname}}</span></div>
        
       </div>
       <pagination :pageall='pageall'  :pagelimit='limit' @pageChange='pageChange'></pagination>
    </div>
       
</div>
</template>
<script>
import Pagination from '../../components/fenye.vue'
export default {
    data(){
        return{
          users:'',
          limit:30,
          pageall:'',
          page:""
        }
    },
    methods:{
     async   share(){
     let result = await this.axios.get(`/playlist/subscribers?id=${this.$route.params.id}&limit=30`)
     console.log(result)
        this.users=result.data.subscribers
        this.pageall=result.data.total
        },
    async    pageChange(page){
          let result = await this.axios.get(`/playlist/subscribers`,{
              params:{
                  id:this.$route.params.id,
                  limit:this.limit,
                  offset:page
              }
          
          })  
          this.users=result.data.subscribers
        }
    },
    mounted(){
        this.share()
    },
    components:{
      Pagination
    }
}
</script>
<style lang="less" scoped>
 .xxx{
       display: flex;
       flex-wrap: wrap;
   }
.users{
    line-height: 100px;
     height: 100px;
 width: 250px;
 margin:25px 0px 50px;
      
    
}
  img{
     float: left;
      height: 100px;
      width:100px;
      border-radius: 50%;
  }
  span{
      margin: 0px 5px;
  }
</style>