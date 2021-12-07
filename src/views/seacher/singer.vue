<template>
    <div class="main">
        <div>
             <seacher></seacher>
        </div>
        <div style="padding:20px"> 
            <h3 style="margin: 0px ">一共搜索到{{pageall}}首</h3>
       <div>
           <div class="table" v-for="(item) in tableData" :key="item.id" @click="$router.push(`/singer/${item.id}`)">
               <div>
                   <img 
             
              v-lazy="item.img1v1Url" alt="">   <span> {{item.name}}</span> 
               </div>
           <div>
              
           </div>
               <div>
             
               </div>
                
           </div> 
        </div>
         
       </div>
      <Pagination :page="page" :pageall="pageall" :pagesize='limit' @pageChange='pageChange' ></Pagination>
    </div>
</template>
<script>
import  seacher from './seacher.vue' 
import        Pagination      from '../../components/fenye.vue'
export default {
    data(){
        return{
            page:0,
            tableData:"",
            page:1,
            pageall:0,
            limit:30

           
        }
    },
    methods:{
     
    async  mv(){
        const result=await this.axios.get(`/cloudsearch?keywords= ${this.$route.params.id}`,{
            params:{
                limit:30,
                offset: this.page,
                type:100
            }
        })
        console.log(result)
        this.tableData= result.data.result.artists  
        console.log()
        this.pageall =result.data.result.artistCount },

      
      pageChange(page){
        console.log(page)
            this.page=page
      },
    async  fenye(val){
 const result=await this.axios.get(`/cloudsearch?keywords= ${this.$route.params.id}`,{
            params:{
                limit:30,
                offset: val,
                type:100
            }
        })
        console.log(result)
        this.tableData= result.data.result.artists  
        let main =document.querySelector('.main')
        console.log(main)
        console.log(main.S)
      },
     


    },
    mounted(){
        this.mv()
        
    },
    watch:{
      page(val){
         this.fenye(val)
      }
    },
    components:{
        seacher,
        Pagination
    }
}
</script>

<style lang="less" scoped>
.main{
    height:calc(100vh - 200px);
    overflow: auto;
    width: 100%;
   
}
.table{
    height: 80px;
    line-height: 80px;
    :hover{
        background-color: rgb(117, 113, 113);
      
    }
   
    img{
        height: 70px;
        width: 70px;
        margin: 5px 10px;
        border-radius: 5px;
        float: left;
    }
}

</style>