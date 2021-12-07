import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState  from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,     //是否登录
    songid:Number,    //歌曲ID
    palyList:[],   //播放列表
    user:{},  //用户信息
    songList:[],  //歌单列表
    loveid:[] ,   //喜欢的id
    isPlay:false,
    time:Number,
    open:false,


  },
  mutations: {
    changeTime(state,time){
     state.time=time
    },
    changePlay(state,play){
      state.isPlay=play

    },
   changepalyid(state,songid){
     state.songid=songid
     state.isPlay=true
   },
   changgeisLogin(state,isLogin){
    state.isLogin=isLogin
   },
   playList(state,songid){
     if(!songid){
      state.palyList=[]
     }
     if(songid instanceof Array ){
      state.palyList=[]
      state.palyList.push(...songid)
     }else{
       let index=state.palyList.indexOf(songid)
    console.log('添加失败')
    if(index==-1){
       state.palyList.push(songid)
       
    }else{
     
    }
     }
    
   },
   changeuser(state,user){
     console.log(user)
    state.user =user
   },
   changersongList(state,list){
     console.log(list)
     if(!list.length){
    let has= state.songList.some(item=>{
          return  item.id == list.id
      })
      console.log(has)
      if(has){
        let sex= state.songList.map((item,index)=>{
          if(item.id == list.id){
            return index
          }  
         
      }) 
           for(let i=0;i<sex.length;i++){
             if(sex[i]){
               console.log(i)
               state.songList.splice(i,1)
               console.log(state.songList)
             }
           }
      }else{
          state.songList.push(list)
      }
    
     }else{
      state.songList=list
     }
     console.log(state.songList)
   },
   changelove(state,list){
     console.log(list.length)
    if(list.length==1||list.length==undefined){
      if(state.loveid.indexOf(list)==-1){
        state.loveid.push(list)
      }else{
        state.loveid.splice(state.loveid.indexOf(list),1)
      }
    
    }else{
      state.loveid=list
    }
       console.log(state.loveid)
   },
   clear(state,list){
     state.songList={}
     state.loveid={},
     state.isLogin=false
     localStorage.removeItem('user','token')
   }
  
  },
  
  getters:{
   getplaylist(state){
     return  state.palyList
   }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()] 
  
})
