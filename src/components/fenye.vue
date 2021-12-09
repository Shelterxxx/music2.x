<template>
    <el-pagination
    style="margin: 0px 300px; text-align: center;"
    @current-change='currentPage'
    :current-page="page"
    :page-size='pagesize'
  background
  layout="prev, pager, next"
  :total="pageall">
</el-pagination>
</template>
<script>

export default {
    data(){
        return{
    
        }
    },
    props:{
        page:{
            // type:Number,
            default:1
        },
        pageall:{
            //  type:Number,
            default:600
        },
        pagesize:{
            //  type:Number,
             default:50
        }

    }  ,                    
    methods:{
   currentPage(page){
      this.$emit('pageChange',page)
      console.log(this)
   }
    }
}
</script>
<style lang="less" scoped>
.el-el-pagination{
    margin: 0px auto;
    text-align: center;
    width: 100%;
}
</style>