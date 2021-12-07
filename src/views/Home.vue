<template>
<div class="main">
  <div  :class="open==false?'playmiusc':'playmiusc1'" v-if="isshow" ><list @color='color'></list></div>
<div class="top"><top></top></div>
<div class="main-s">
  <div class="left"><left></left></div>
  <div class="rigth"  id="xxx">
   
    <router-view  ref="main"></router-view>
    </div>
</div>
<div class="footer" v-if="isshow"><bottom></bottom></div>
</div>
</template>

<script>
// @ is an alias to /src
import top from '../components/top.vue'
import left from '../components/left.vue'
import bottom from '../components/bottom.vue'
import  list from './playMusic.vue'
export default {
  data(){
    return{
      isshow:true
    }
  },
  name: 'Home',
  components: {
   top,
   left,
   bottom,
   list
  },
    methods:{
       color(color){
         document.querySelector('.playmiusc1').style.backgroundImage=color
       }
    } ,
  computed:{
    xxxx(){
      return this.$route.name
    },
    open(){
   return this.$store.state.open
    }
  },
  watch:{
    open(val){
              if(val==true){
 let top =document.querySelector('.top')
 console.log(top)
  top.style.zIndex=200
              }  else{
                let top =document.querySelector('.top')
 console.log(top)
  top.style.zIndex=1000
              }
    },
    xxxx(val){
      let sex =val.search('audio')
      if(sex==0){
        this.isshow=false
      }else{
        this.isshow=true
      }
    }
  },
 
  mounted(){
  console.log(this.open,'xxxxxxx')
  }
}

</script>
<style lang="less" scoped>
@colre: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);
.main{
  display: flex;
  position: relative;
  height: 100vh;
  width: 100vw;
  min-width: 1200px;
  z-index: 2;
  border-radius: 5px;
   flex-direction:column;
   overflow: hidden;
  .main-s{
    // position: relative;
     flex: 1;
     overflow-x: auto;
     overflow-y: auto;
     
    display: flex;
 
    width: 100%;
    background-color: rgb(255, 255, 255);
  .left{
    flex: 1;
    // height: 100px;
    overflow: auto;
  }
  .rigth{
      
    flex: 6;
  }
  }
  .top{
    height:60px;
    width: 100%;
    top: 0px;
    z-index: 1000;

  }
  .footer{
   
    height:80px ;
    width: 100%;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(121, 117, 117);
   z-index: 800;
  }
  .xx{
    
   position: absolute;
    top: 0px;
    right: 0px;
    width: 500px;
    height: 100%;
    background-color: red;
    z-index: 10;
  }
  
}
.playmiusc{
     position: absolute;
    top:calc(100% - 80px);
    left: 0px;
    height: 100%;
    width: 100%;
    background-color: pink;
    z-index: 300;
     transition: all 1s;
  }
  .playmiusc1{
     position: absolute;
    top:0px;
    left: 0px;
    height: 100%;
    width: 100%;
  background-image: @colre;
    z-index: 300;
      transition: all 1s;
  }
</style>