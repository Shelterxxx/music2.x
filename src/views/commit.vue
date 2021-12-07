<template>
    <div class="commit" v-loading:loading  ref=commit> 
          <h1>评论({{pageall}})</h1>
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
import comment from '../components/commit.vue'
import pagination from '../components/fenye.vue'
export default {
    data(){
        return{
              page:1,
              pageall:'',
              limit:20,
              hotcomments:'',
              comments:"",
              loading:true

        }
    },
    methods:{
       async  allcommit(val){
           this.loading=true
          let result = await this.axios.get(`/comment/music?id=${val}`)
          console.log(result)
          this.hotcomments=result.data.hotComments
            this.comments=result.data.comments
            this.pageall =result.data.total
               this.loading=false
         },
         pageChange(page){
           this.$parent.$refs.center.scrollTop=400
          this.page=page
         
         },
     async    commit(){
              let result = await this.axios.get(`/comment/music`,{params:{
              id:this.$store.state.songid,
              limit:this.limit,
              offset:this.limit*this.page
          }})
            this.comments=result.data.comments
         }
    },
       computed:{
           songid(){
               return this.$store.state.songid
           }
       },
    watch:{
        page(val){
              this.commit()
        },
        songid(val){
             this.allcommit(val)
        }
        
    },

    mounted(){
        this.allcommit(this.$store.state.songid)
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