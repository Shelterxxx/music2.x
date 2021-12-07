<template>
    <div class="center">
     <div  class="artists" v-for="(item) in artists" :key="item.id"  @click="singer(item.id)">
         <div>  <img v-lazy="item.img1v1Url" alt=""></div>
       
         <span>{{item.name}}</span>
     </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           artists:''
        }
    },
    methods:{
     singer(id){
       this.$router.push(`singer/${id}`)
     }
    },
 async  mounted(){
      let result =await this.axios.get(`/simi/artist?id=${this.$route.params.id}`)
       this.artists=result.data.artists
      console.log(result)
    },
  

}
</script>
<style lang="less" scoped>
.center{
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: space-between;

}
.artists{
    text-align: center;
    height: 18vw;
    width: 18vw;
    
    img{
        border-radius: 5px;
        height: 15vw;
    width: 15vw; 
    }
}

</style>