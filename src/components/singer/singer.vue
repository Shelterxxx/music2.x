<template>
    <div  class="infinite-list" v-infinite-scroll="singermv" style="overflow:auto" >
        <div class="mv" v-for="(item) in singermvs.mvs" :key="item.id">
            <div @click="mv(item.id)" class="imgdiv"><img :src="item.imgurl" alt="">
            <span style="position: absolute;top: 5px; right: 5px" >{{item.playCount|playnum}}</span>
                       <span style="position: absolute;bottom: 5px; right: 5px" >{{item.duration|timeFormat}}</span></div>
                
                  <span>{{item.name}}</span>
                  
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           singermvs:Array
        }
    },
    methods:{
   async  singermv(){
        let result= await this.axios.get(`/artist/mv?id=${this.singerid}`)
        console.log(result)
        this.singermvs=result.data
     },
     load(){
        
    },
   mv(id){
       this.$router.push(`/audio/${id}`)
   }
    },
     
    mounted(){
      console.log(this.$route.params.id)
       console.log(this.singerid)
       this.singermv()
    },
    props:['singerid']

}

</script>
<style lang="less" scoped>
.infinite-list{
     display: flex; 
     flex-wrap: wrap;
     justify-content: space-between;
}
.mv{
  
     margin: 1vw 0vw;
    width: 15vw;
 .imgdiv{
     position: relative;
 }
    img{
        height: 9vw;
        width: 100%; 
         border-radius: 5px;
    }
}
span{
    color: rgb(255, 255, 255);
}
</style>