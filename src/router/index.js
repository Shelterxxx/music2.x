import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import songList from '../views/find/songlist'
import find from '../views/find/index'
import video from '../views/video/video'
import gengxin from '../views/find/gengxin'
import  musicRank from '../views/find/musicRank'
import  newMusicList from '../views/find/list/newMusicList'
import  singerList from '../views/find/singerList'
import  playlist from '../views/playlist/playlist'
import  singer from '../views/singer/singer'
import  mv from '../views/video/mv'
import  movie from '../views/video/movie'
import  audio from '../views/video/audio'
import  seachersong  from '../views/seacher/song'
import  seachersonglist  from '../views/seacher/songlist'
import  seachermv  from '../views/seacher/mv'
import  seachersinger from '../views/seacher/singer'
import   self    from '../views/self'
import   user    from '../views/user'
import   disc  from  '../views/dise'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',             //一级路由
    name: 'Home',
    redirect:'/find/gengxin',
    component: Home,
    children:[{            //二级路由
     path:'find',
    name:'find',
    component: find,
  redirect:"/find/gengxin",
   children:[{
     path:'gengxin',
     name:"gengxin",
     component: gengxin,
   },
   {
    path:'songList',
    name:"songList",
    component: songList,
  },{
     path:'musicRank',
     name:'musicRank',
     component:musicRank
  },{
    path:'newMusicList',
    name:'newMusicList',
    component:newMusicList
 },{
  path:'singerList',
  name:'singerList',
  component:singerList
},

  ]
   },
     {
      path:'disc/:id',
      name:'disc',
      component:disc
     } ,  
   {
    path:'self/:id',
    name:'self',
    component:self
   },{
    path:'user/:id',
    name:'user',
    component:user
   },

   {
     path:'seachersong/:id',
     name:'seachersong',
     component:seachersong

   },
   {
    path:'seachersonglist/:id',
    name:'seachersonglist',
    component:seachersonglist

  },
  {
    path:'seachermv/:id',
    name:'seachermv',
    component:seachermv

  },
  {
    path:'seachersinger/:id',
    name:'seachersinger',
    component:seachersinger

  },
  {
    path:"video",
    name:'video',
    redirect:'/video/movie',
    component: video,
    children:[{
     path:'movie',
     name:'movie',
     component:movie
    },
    {
      path:'mv',
      name:'mv',
      component:mv
     },
  ]
  },{
    path:"playlist/:id",
    name:'playlist',
    component: playlist 
  },{
    path:"singer/:id",
    name:'singer',
    component: singer 
  },{
    path:"audio/:id",
    name:'audio',
    component: audio 
  }
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
