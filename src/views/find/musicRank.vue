<template>
    <div class="rank">
       <div class="center">
           <h1 style="margin:0px 40px"> 官方版
           </h1>
            <div class="list" v-for="(item) in list.slice(0,4)" :key="item.id"  >
                <div class="imgs"  @click="$router.push(`/playlist/${item.id}`)">
                        <i class=" iconfont icon-bofang1 xxxxx"></i>
                      <img :src="item.coverImgUrl" alt="">
                          <!-- <h4>{{item.updateTime}}</h4> -->
                </div>
                 <div class="xxxx">
                    <div v-for="(item1,index1) in item.tracks " :key="index1"  >
                          <div class='bofa' style=" overflow:hidden ; line-height:40px"> 
                            <span style="float:left">{{index1+1}} {{item1.first}}</span>  <span style="float:right">{{item1.second}}</span>
                          </div>
                    </div>
                 </div>
            </div> 
            <h1 style="margin:0px 40px"> 全球榜 </h1> 
            <div>
              
            </div>
            <div class="listd" @click="play" >
                  <div  class="xxx" v-for="(item) in list.slice(4,list.length)" :key="item.id"  >
                      <img :src="item.coverImgUrl" alt="" :data-productid='item.id'  >
                        <i class=" iconfont icon-bofang1  xxxxx"></i> 
                      <div>
                        <i class=" iconfont icon-bofang1"></i>  <span>{{item.playCount|playnum}}</span>
                      </div>
                   
                        <span>{{item.name}}</span>
            </div> 
            </div>
            
       </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data(){
        return{
              list:'',
              list1:'',
        }
    },
    methods:{
      play(e){
        
          if(e.target.nodeName=="IMG"){
            this.$router.push(`/playlist/${e.target.dataset.productid}`)
          }
        
      }
    },
    mounted(){
         this.axios.get('/toplist/detail').then(res=>{
 this.list=res.data.list
            this.list.forEach(item => {
                  item.updateTime=moment(item.updateTime).format("MMM Do");  
            });
            console.log(res)
          this.list1 = this.list.slice(0,4)
          console.log(this.list1)

            console.log(res)
        })
    }
}
</script>

<style lang="less" scoped>
 
 .rank{
     height: calc(100vh - 201px);
     width: 100%;
     overflow: auto;
     .center{
         margin: 0px auto;
         height: auto;
         width: 80%;
         min-width: 1200px;
  
         
     }
     .list{
        height: 200px;
        width: 100%;
        margin: 40px 0px;
        display: flex;
        
        .imgs{
            position: relative;
            width: 200px;
            height: 200px;
            margin: 0px 40px;
           
            i{ 
                position: absolute;
                   top: 36%;
                  left: 39%;
                  opacity: 0;
                font-size: 50px;
               
            }
             
           
            img{
                height: 100%;
                width: 100%;
                 border-radius: 20px;
            }
            h4{
                 position: absolute;
                   top: 36%;
                  left: 39%;
                  opacity: 1;
                   font-size: 32px;
                   color: rgb(255, 255, 255);
            }
        }
        .imgs:hover i{
           opacity: 1;
           transition: all 2s;
        }
           .xxxx{
               padding: 0px  40px;
               flex: 1;
               }
     }
          .listd{
              margin: 40px;
              display: flex;
               flex-wrap: wrap;
               justify-content: space-between;
               .xxx{
                   margin: 20px 0px;
                position: relative;
                 height: 12vw;
                 width: 12vw;
                      min-width: 200px;
                      min-height: 200px;
                      div{
                          position:absolute;
                          right: 10px;
                        top: 5px;
                        color: rgb(255, 255, 255);
                      }
                   img{
                       height: 100%;
                width: 100%;
                 border-radius: 20px; 
               }
               .xxxxx{
             position: absolute;
                   top: 36%;
                  left: 39%;
                  opacity: 0;
                font-size: 50px;
               }
               :hover .xxxxx{
                    opacity: 1;
                    color: red;
                    transition: 1s all;
               }
               }
               
          }

 }
 .xxxx{
        div :hover{
    background-color: rgb(223, 223, 223);
     } 
    div:nth-of-type(2n){
         background-color: rgb(177, 177, 177);
     }
 }
</style>