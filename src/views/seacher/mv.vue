<template>
    <div class="main">
    
        <div>
             <seacher></seacher>
        </div>
          <h3 style="margin: 0px">一共搜索到{{pageall}}首</h3>
       <div class="table">
          <div v-for="(item) in tableData" :key="item.id" @click="play(item)" style=" 
        width: 20vw;
        min-width: 200px;" >
              <div style="   position: relative;">
                 <img v-lazy='item.cover' alt="">   
                  <div  style=" position:absolute; top:0px; right:0px; " ><i class="el-icon-caret-right"></i>{{item.playCount|playnum}}</div>
               <div  style=" position:absolute; bottom:0px; right:0px;" >{{item.duration|timeFormat}}</div>
              </div>
             <div >
                 {{item.name}}
             </div>
             <div>
                 {{item.artistName}}
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
      clickRow(row, column, cell, event){
        this.$store.commit('changepalyid',row.id)
          this.$store.commit('playList',row.id)

      },
    async  mv(){
        const result=await this.axios.get(`/cloudsearch?keywords= ${this.$route.params.id}`,{
            params:{
                limit:28,
                offset: this.page,
                type:1004
            }
        })
        console.log(result)
        this.tableData= result.data.result.mvs  
        this.pageall =result.data.result.mvCount    },
             
      indexMethod(index) {
        return index+1 ;
      },
      handleClick(scope){
         console.log(scope)
      },
      pageChange(page){
        console.log(page)
            this.page=page
      },
    async  fenye(val){
 const result=await this.axios.get(`/cloudsearch?keywords= ${this.$route.params.id}`,{
            params:{
                limit:28,
                offset: val,
                type:1004
            }
        })
        console.log(result)
        this.tableData= result.data.result.mvs  
        let main =document.querySelector('.main')
        console.log(main)
        console.log(main.S)
      },
     play(item){
         this.$router.push(`/audio/${item.id}`)
         console.log(item)
     }


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
    height:100%;
    width: 100%;
    overflow-Y: auto;
}
.table{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0px;
     margin: 20px  0px;
    img{
        height: 12vw;
        width: 20vw;
        min-height: 100px;
        min-width: 200px;
     
        
    }
}
</style>