<template>
    <el-table
    :data="list"
    stripe
       @row-dblclick="clickRow"
    style="width: 100%">
    <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
   <el-table-column >
      <template slot-scope="scope">
            <img  style="height:80px ;width:80px" v-lazy="scope.row.album.picUrl" alt="" >
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
    >
    </el-table-column> 
    <el-table-column
      prop="artists[0].name"
   >
    </el-table-column>
    <el-table-column
      prop="duration"
      >
    </el-table-column>
  </el-table>
</template>
 <script>
 import {timex} from '../../../network/time'

 const color={
 全部:0,

华语:7,

欧美:96,

日本:8,

韩国:16
 }
 export default {
    
     data(){
         return{
                 list:""
         }
     },
     props:['listid'],
     computed:{
       listx(){
           let xx=this.listid
           return color[xx]
       }
     },
     watch:{
        listx(val){
        this.arrs(val)
        }
     },
     methods:{
         indexMethod(index) {
        return index * 1;
      },
        clickRow(){
       console.log( this.$parent.$el.scrollTop,this.$parent.$el.clientHeight,this.$parent.$el.scrollHeight)  
        },
          async arrs(listx){
             let result = await  this.axios.get(`/top/song?type=${listx}`)
              result.data.data.forEach(item => {
                  item.duration=timex(item.duration)
              });
             this.list=result.data.data
             console.log(result)
           }
     },
     mounted(){
       console.log('ssss')
         this.arrs(this.listx)
     }
 }
 </script>

<style lang="less" scoped>

</style>>