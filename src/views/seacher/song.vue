<template>
<div class="main" ref="main" style="height:calc(100vh - 140px) ;overflow:auto" >


    <div style="height:5000px" >
    
        <div>
             <seacher></seacher>
        </div>
          <h3 style="margin: 0px">一共搜索到{{pageall}}首</h3>
       <div  class="center">
            <el-table
   
      :data="tableData"
      stripe
      style="width: 100%" 
        @row-dblclick="clickRow"
       ref="Table"
      >
     <el-table-column
            label="序号"
            width="100px">
        <template slot-scope="scope">
           <span  v-if='scope.row.id==playid?false:true' >{{scope.$index+1}} </span> 
           
             <i    v-if='scope.row.id==playid' style=" color: red;" class=" iconfont icon-shengyin"></i>
                <i  v-if='$store.state.loveid.indexOf(scope.row.id)==-1?true:false' style="margin:10px ; " class="iconfont icon-aixin"  ></i>
              <i v-else  style="margin:10px;color:red  " class="iconfont icon-aixin1"  ></i>
           <i  class="iconfont icon-xiazai"   ></i>
             <!-- <i  class=" iconfont icon-shengyin"></i>
             <i class=" iconfont icon-shengyin"></i> -->
        </template>
          </el-table-column>
      <el-table-column
        prop="name"
        label="歌名"
       >
      </el-table-column>
      <el-table-column
        prop="ar[0].name"
        label="歌手"
        >
      </el-table-column>
      <el-table-column
        prop="al.name"
        label="专辑名"
        >
      </el-table-column>
        <el-table-column
        prop="dt"
        label="时间长"
       >
       
      </el-table-column>
       <el-table-column
      width="100"
       label="热度">
      <template slot-scope="scope">
         <el-progress :text-inside="true"  color="grey"  :show-text='false' :stroke-width="26" :percentage="scope.row.pop"></el-progress>
      </template>
    </el-table-column>
        <!-- <el-table-column label="正在播放">
      <template slot-scope="scope">
        <i   v-if='scope.row.id==playid'
          class="el-icon-video-play"
          @click="handleEdit(scope.$index, scope.row)"></i>
      </template>
    </el-table-column> -->
    </el-table>
       </div>
      <Pagination :page="page" :pageall="pageall" :pagesize='limit' @pageChange='pageChange' ></Pagination>
    </div>
    </div>
</template>
<script>
import  seacher from './seacher.vue' 
import        Pagination      from '../../components/fenye.vue'
import  {timex} from '../../network/time'
export default {
    data(){
        return{
            page:0,
            tableData:"",
            page:1,
            pageall:0,
            limit:30,
             

           
        }
    },
    methods:{
      clickRow(row, column, cell, event){
        this.$store.commit('changepalyid',row.id)
          this.$store.commit('playList',row.id)

      },
      
    async  mv(val=this.$route.params.id){
        const result=await this.axios.get(`/cloudsearch?keywords= ${val}`,{
            params:{
                limit:30,
                offset: this.page,
                type:1
            }
        })
        console.log(result)
        result.data.result.songs.map((item,index,arr)=>{
            arr[index].dt=timex(item.dt)
        })
        this.tableData= result.data.result.songs  
        
        this.pageall =result.data.result.songCount    },

      indexMethod(index) {
        return index+30 ;
      },
      handleClick(scope){
         console.log(scope)
      },
      pageChange(page){
        this.$refs.main.scrollTop=0
        console.log(this.$refs.main.scrollTop)
            this.page=page
          
      },
    async  fenye(val){
 const result=await this.axios.get(`/cloudsearch?keywords= ${this.$route.params.id}`,{
            params:{
                limit:30,
                offset: val,
                type:1
            }
        })
        console.log(result)
        this.tableData= result.data.result.songs  
        this.$nextTick(()=>{
           let main =document.querySelector('.main')
         let center =document.querySelector('.center')
  
        })
       
      },
  
       

    },
    computed:{
      playid(){
        return this.$store.state.songid
      },
      songid(){
        return  this.$route.params.id
      }
    },
    mounted(){
        this.mv()
        
    },
    watch:{
      page(val){
         this.fenye(val)
      },
      songid(val){
           this.mv(val)
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

}
</style>