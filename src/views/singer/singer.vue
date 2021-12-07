<template>
    <el-container>
  <el-header style="height:auto">
      <el-row :gutter="24">
  <el-col :span="6"><img :src="singer.artist.cover" alt=""></el-col>
  <el-col :span="18">
      <h1 style="margin:20px  0px">{{singer.artist.name}}</h1>
        <el-button  icon="el-icon-folder-add" round>收藏</el-button>
        <div style="margin:20px 0px"><span>单曲：{{singer.artist.musicSize}}</span>
           <span style="margin: 0px  10px;">专辑数: {{singer.artist.albumSize}}</span>
              <span style="margin: 0px  10px;">MV数: {{singer.artist.mvSize}}</span>
              </div>
        
  </el-col>
</el-row>
  </el-header>
  <el-main> <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
    <el-row :gutter="24">
  <el-col :span="4"><img src="../../assets/top50.png" alt=""></el-col>
  <el-col :span="20">
      <span style="font-size:32px">热歌50首</span>
      <el-table
    :data="top50.slice(0,limit)"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label=""
      width="600px">
    </el-table-column>
    <el-table-column
      prop="dt"
      label=""
      width="">
    </el-table-column>
  </el-table>
  <span  v-if="show" @click="limit=top50.length ; show=false">查看等多{{top50.length}}首</span>
  </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="mv" name="second"><singer v-if="activeName==`second`"  :singerid='singerid'></singer></el-tab-pane>
    <el-tab-pane label="歌手详情" name="third"><miaosu  v-if="activeName==`third`"  :textx='textx'></miaosu></el-tab-pane>
    <el-tab-pane label="相似歌手" name="fourth"><simple  v-if="activeName==`fourth`"></simple></el-tab-pane>
  </el-tabs></el-main>
</el-container>
</template>
<script>
import {timex} from '../../network/time'
// import singer from '../../components/singer/singer'
export default {
    data(){
        return{
          singerid:'',
            singer:'',
              activeName: 'first',
              textx:'',
              top50:'',
              count:0,
              limit:10,
              show:true
        }
    },
    methods:{
 handleClick(tab, event) {
        console.log(tab, event);
      },
     async top(){
           let result = await this.axios(`/artist/top/song?id=${this.$route.params.id}`)
           console.log(result)
           this.top50=result.data.songs
           this.top50.forEach(item => {
              item.dt =timex( item.dt)
           });
                },
                async desc(){
                  let result = await this.axios(`/artist/album?id=${this.$route.params.id}&limit=30`)
                  console.log(result)
                }
      
    },
  async  mounted(){
         this.singerid=this.$route.params.id
        let result = await this.axios(`/artist/detail?id=${this.$route.params.id}`)
        console.log(result)
        this.textx=result.data.data.artist.briefDesc
        this.singer=result.data.data
        this.top()
        this.desc()
    },
    components:{
         miaosu:()=>import ('../../components/singer/text'),
    singer:()=>import ('../../components/singer/singer'),
    simple:()=>import ('../../components/singer/simple')
   
    }
}
</script>
<style lang="less" scoped>
.el-header{
    .el-row{
    height: 100%;
    width: 100%;
    img{
        border-radius: 10px;
        margin: 1vw;
        height: 15vw;
        width: 15vw;
    }
   
}
}
.el-tabs  /deep/ .el-tabs__item.is-active{
    color: rgb(39, 39, 39);
    font-size: 32px;

}

</style>