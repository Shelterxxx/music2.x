<template>
    <div class="index">
        <div  class="lei"> 

       
        <div class="head">
            <div><span>语种</span><span   v-for="(item) in singerType" :key="item.id" :class="singer==item.name ? 'span1' : ''" @click="changesinger(item.id,item.name)">{{item.name}}</span></div>
            <div><span>语种</span><span v-for="(item) in Languages" :key="item.id" :class="Language==item.name ? 'span1' : ''"  @click="changeLanguage(item.id,item.name)">{{item.name}}</span></div>
            <div ><span>语种</span> <span v-for="(item,index) in arr" :key="index" :class="arr1==item ? 'span1' : ''" @click="changearr1(item)">{{item}}</span></div>
        </div>
        <div class="center" v-loading='loading'>
            <div  class="renwu" v-for="(item) in artists" :key="item.id"  @click="singerpush(item.id)">
                <div> <img :src="item.img1v1Url" :alt="item.name"></div>
               
                <span  style=" margin:0px auto ">{{item.name}}</span>
            </div>
        </div>
           <Pagination></Pagination>
    </div> </div>
</template>

<script>
import Pagination from '../../components/fenye.vue'
export default {
    data(){
        return{
            page:1,
            singer:"全部",
            Language:"全部",
            arr1:"热门",
             singerid:'-1',
             Languageid:'-1',
             arrid:'热门',
             loading:true,
         singerType: [
                    {id: -1, name: '全部'},
                    {id: 1, name: '男歌手'},
                    {id: 2, name: '女歌手'},
                    {id: 3, name: '乐队'}
                ],
          Languages: [
                    {id: -1, name: '全部'},
                    {id: 7, name: '华语'},
                    {id: 96, name: '欧美'},
                    {id: 8, name: '日本'},
                    {id: 16, name: '韩国'},
                    {id: 0, name: '其他'}
                ],
         arr:['热门','a','b','c','d','e','f','g','h','i','j','k','l','m','i','o','p','q','r','s','t','u','v','w','s','y','x'],
         artists:[]

        }
      
    },
    methods:{
        pageChange(page){
       this.page=page
        },
    changesinger(id,name){
         this.page=1
        this.singer=name
         this.singerid=id,
        console.log(id)
        this.singerlist()
    },
     changeLanguage(id,name){
         this.page=1
          this.Language=name
           this.Languageid=id,
        console.log(id)
        this.singerlist()
    },
    changearr1(id){
        this.page=1
          this.arrid=id
           this.arr1=id
        console.log(id)
         this.singerlist()
    },
    singerpush(id){
        this.$router.push(`/singer/`+id)
    },
  async  singerlist(){
      this.loading=true
        let result =await this.axios.get(`/artist/list?type=${this.singerid}&area=${this.Languageid}&initial=${this.arrid=='热门'?-1:this.arrid}&offset=${this.page*30}`)
        console.log(result)
        this.artists=result.data.artists
        this.loading=false
    }
    },
    watch:{
       page(val,oldval){
           this.singerlist()
       }
    },
    mounted () {
        this.singerlist()
        },
        components:{
            Pagination
        }
}
</script>
<style lang="less" scoped>
.index{
    height:calc(100vh - 200px);
    overflow: auto;
}
.lei{
    width: 1200px;
    margin: 0px auto;
}

span{
    text-align: center;
    height: 20px;
    width: 60px;
    display: inline-block;
    margin: 10px  20px;
}
.span1{
    font-size: 20px;
    color: red;
}
.head div{
    cursor: pointer;
    margin: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    
}
.center{
    margin: 50px  0px;
    display: flex;
      flex-wrap: wrap;
      text-align: center;
}
.renwu{
 height: 200px;
 width: 200px;
}
img{
    height: 130px;
    width: 130px;
    border-radius:20px;
}
</style>