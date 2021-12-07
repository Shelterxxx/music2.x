<template>
<div ref='xxx' style="height:calc(100vh - 140px); overflow:auto">


     <el-container  >
  <el-header style="height:auto">
    <div class="area"><div>地区:</div><div   v-for="(item) in areaType" :key="item.id" :class="area==item.name ? 'div1' : ''" @click="changeareaType(item.name)">{{item.name}}</div></div>
            <div class="order"><div>排序:</div><div v-for="(item) in  orderType" :key="item.id" :class="order==item.name ? 'div1' : ''"  @click="changeorder(item.name)">{{item.name}}</div></div>
            
  </el-header>
  <el-main v-loading='loading'>
       <div class="mv">
           <div class="mvs" v-for="(item) in mvs" :key="item.id">
               <div style="position: relative;"> <img @click="openmv(item.id)" v-lazy="item.cover" alt="">
              <div  style=" position:absolute; top:0px; right:0px;" ><i class="el-icon-caret-right"></i>{{item.playCount|playnum}}</div>
               <div  style=" position:absolute; bottom:0px; right:0px;" >{{item.duration|timeFormat}}</div>
               </div>
               <h6>{{item.name}}</h6>
              <h6>{{item.artistName}}</h6>
           </div>
       </div>
  </el-main>
  <pagination :pageall='pageall'  :pagelimit='pagelimit' @pageChange='pageChange'></pagination>
</el-container> </div>
</template>
<script>
import pagination from '../../components/fenye.vue'
export default {
    data(){
        return{
            pageall:5000,
            pagelimit:48,
            page:1,
            area:"全部",
            order:"上升最快",
            arr1:"热门",
             singerid:'-1',
             Languageid:'-1',
             arrid:'热门',
             loading:true,
        areaType: [
                    {id: -1, name: '全部'},
                    {id: 1, name: '内地'},
                    {id: 2, name: '港台'},
                    {id: 3, name: '欧美'},
                    {id: 5, name: '日本'},
                    {id:6, name: '韩国'},
                ],
          orderType: [
                    {id: -1, name: '上升最快'},
                    {id: 7, name: '最热'},
                    {id: 96, name: '最新'},
                  
                ],
        mvs:[],
        loading:true

        }
      
    },
    methods:{
        changeareaType(name){
              this.page=1
        this.area=name
        },
        changeorder(name){
            this.page=1
             this.order=name
        },
       async mv(){
           this.loading=true
        let result =await this.axios.get('/mv/all',{params:{
          area:this.area,
          order:this.order,
          limit:48,
          offset:this.page*48
        } })
        '/comment/playlist?id=705123491'
        console.log(result)
        this.mvs=result.data.data
    //   this.pageall=result.data.count
      this.loading=false
        },
        pageChange(page){
        this.$refs.xxx.scrollTop =0
            this.page=page

        },
        openmv(id){
            this.$router.push(`/audio/${id}`)

        },
   
    },
    watch:{
        page(val,oldval){
            this.mv()   
        },
        area(){
  this.mv()  
        },
        order(){
  this.mv()  
        }
    },
    mounted(){
       this.mv() 
       
    },
    components:{
        pagination
    }
}
</script>
<style lang="less" scoped>

.area {
    display: flex;
    div{
        
        text-align: center;
        line-height: 50px;
        width: 70px;
    height: 50px;
    margin: 10px;
    }

}
.order {
    display: flex;
    div{
       
      text-align: center;
        line-height: 50px;
        width: 70px;
    height: 50px;
    margin: 10px;
    }

}
.div1{
    background-color: pink;
    border-radius:10px;
}
.mv{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    .mvs{
        width: 20vw;

    }
    img{
        width: 20vw;
        height: 10vw;
    }
}
</style>