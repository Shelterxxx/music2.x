<template>
    <div>
          <h1>评论({{pageall}})</h1>
        <textarea name="" id="" ></textarea>
        <el-button style="float:right" round>发布</el-button>
        <comment :comments='hotcomments' type='最热' v-if='page==1? true: false'>
                <h3>精彩评论</h3>
                </comment >  
                <comment  :comments='comments' type='最新' >
                <h3>最新评论   </h3>
                </comment>  
                  <pagination :pageall='pageall'  :pagelimit='pagelimit' @pageChange='pageChange'></pagination>
    </div>
</template>
<script>
import comment from '../../components/commit.vue'
import pagination from '../../components/fenye.vue'
export default {
    data(){
        return{
              page:1,
              pageall:'',
              limit:20,
              hotcomments:'',
              comments:"",

        }
    },
    methods:{
       async  allcommit(){
          let result = await this.axios.get(`/comment/playlist?id=${this.$route.params.id}`)
          console.log(result)
          this.hotcomments=result.data.hotComments
            this.comments=result.data.comments
            this.pageall =result.data.total
         },
         pageChange(page){
          this.page=page
         },
     async    commit(){
              let result = await this.axios.get(`/comment/playlist`,{params:{
              id:this.$route.params.id,
              limit:this.limit,
              offset:this.limit*this.page
          }})
            this.comments=result.data.comments
         }
    },
      
    watch:{
        page(val){
              this.commit()
        }
    },

    mounted(){
        this.allcommit()
    },
     components:{comment,pagination},
}
</script>

<style lang="less" scoped>
textarea{
    height: 100px;
    width: 100%;
}
</style>