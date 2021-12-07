<template>
    <div class="topBox">
<el-row >
  <el-col :span="6">
      <img src="../assets/logo.png" alt="" @click="$router.push('/')">
      </el-col>
  <el-col :span="2" style=" text-align: start">
      <div class="arrow">
           <i class="el-icon-arrow-left" @click='back()'></i>
      </div>
    <div class="arrow">
           <i class="el-icon-arrow-right" @click='go()'></i>
      </div>
      </el-col>
  <el-col :span="8"  @blur="blur()">
      <el-input  
      id="ss"
    placeholder="请选择日期"
    suffix-icon="el-icon-search"
    v-model="input1"
    @click.native.stop="shows()"
    @change="seacher()"

    >
  </el-input>
  <div class="show" v-show="show1" >
    <div   >
         <div>
          <span>搜索记录 </span>  <i  @click="xiaosi" style="float:right" class="el-icon-delete-solid " ></i>
          <div>
              <el-button v-for="(item,index) in history" :key="index" round @click='sex(item)'>{{item}}</el-button>
          </div>
      </div>
      <div>
         <span>热搜榜</span> 
         <div>
             <div v-for="(item,index) in hotlist" :key="index" style="margin:20px 0px   ">
              <span>{{index+1}} </span>   <span>{{item.first}} </span>
             </div>
         </div>
      </div>
    </div>
     
  </div>
  <div class="show" v-show="show2" >
     <h6>你的查询结果({{this.input1}})</h6>
     <div>
       <h4   style=" background-color:#E6E6E6"> <i class=" iconfont icon-yinle "></i> 单曲</h4>
       <div   class="seacher"  v-for="(item) in list.songs" :key="item.id" @click.stop="$store.commit('changepalyid',item.id) ;show2=false">{{item.album.name}} <span>{{item.alias[0]}}</span></div>
     </div>
     <div>
       <h4 style=" background-color:#E6E6E6"> <i class=" iconfont icon-geshou"></i>歌手</h4>
         <div class="seacher"  v-for="(item) in list.artists" :key="item.id" @click.stop="$router.push(`/singer/${item.id}`) ;show2=false">{{item.name}} </div>
     </div>
     <div>
       <h4 style=" background-color:#E6E6E6"> <i class=" iconfont icon-zhuanji"></i>专辑</h4>
         <div class="seacher"  v-for="(item) in list.albums" :key="item.id">{{item.name}} <span>{{item.artist.name}}</span></div>
     </div>
     <div>
       <h4 style=" background-color:#E6E6E6"> <i class=" iconfont icon-gedan"></i>歌单</h4>
         <div class="seacher"  v-for="(item) in list.playlists" :key="item.id" @click.stop="$router.push(`/playlist/${item.id}`) ;show2=false">{{item.name}}</div>
     </div>
  </div>
  </el-col>
  <el-col :span="8"  style="line-height:60px"><div class="header-img" v-if="islogin">
       <el-popover
  placement="bottom"
    width="200"
    trigger="hover"
  >
      <div type="text" @click="open" style="margin:0px 80px">退出</div>
     <img :src='user.avatarUrl' alt="" class="imgheaer" slot="reference"  @click="$router.push(`/self/${user.userId}`)">
    <!-- <el-button slot="reference">hover 激活</el-button> -->
  </el-popover>
      <span>{{user.nickname}}</span>
  </div>
  <div class="header-img" v-else> 
      <img src='' alt="">
  
     <el-button type="text" @click="dialogTableVisible = true">未登录，请登录</el-button>

<el-dialog title="收货地址" :visible.sync="dialogTableVisible" :modal='false'>
 <el-form ref="loginFormRef"  :rules='loginFormRule' :model="formlogin" label-width="80px" class="login_form">
  <el-form-item label="手机号" prop='phone'>
    <el-input v-model="formlogin.phone"></el-input>
  </el-form-item>
   <el-form-item label="密码"  prop='password'>
    <el-input  v-model="formlogin.password"  type="password" ></el-input>
  </el-form-item>
   <el-form-item >
     <el-button type="success" @click="login">登陆</el-button>
  <el-button type="info" @click="reset">重置</el-button>
  </el-form-item>
            </el-form>
</el-dialog>
  </div>
  </el-col>
</el-row>

    </div>
</template>
<script>
import {debounce}  from '../network/debounce.js'
export default {
    data(){
        return{
           user:"",
             dialogTableVisible: false,
            input1:'',
            list:'',
            show1:false,     //显示历史
            show2:false,      //显示搜索
            history:[],
            hotlist:'',
            formlogin:{
                phone:'13558983267',
                password:'youzi0203'
            },
             loginFormRule:{
phone:[
    { required: true, message: "请输入手机号", trigger: "blur" }, //blur失去焦点
    //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
],
password:[
    { required: true, message: "密码", trigger: "blur" }, //blur失去焦点
],
    }
        }
    },
    computed:{
      islogin:function(){
          return this.$store.state.isLogin
      }
    },
    methods:{
      xiaosi(){
 
        this.$confirm('是否清空播放记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
            
          })
          localStorage.removeItem('history')
          this.history=[]
          
          ;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      },
      sex(item){
       this.$router.push(`/seachersong/${item}`)
        this.show1=false
         this.input1=item
      },
         open() {
        this.$confirm('是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // localStorage.removeItem('token')
            this.$store.commit('changgeisLogin',false)
            this.$router.push("/")
           this.$store.commit('clear',{})
            console.log( this.$store.state)
          this.$message({
            type: 'success',
            message: '退出成功!'
            
          })
          ;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
        login(){
            this.$refs.loginFormRef.validate(async vaid=>{
                if(vaid){
                     let result =  await this.axios.get(`/login/cellphone?phone=${this.formlogin.phone}&password=${this.formlogin.password}`)
                     if(result.data.code==200)
                     window.localStorage.setItem('user',JSON.stringify(result.data.profile))
                    //  window.sessionStorage.token('token',result)
                    window.localStorage.setItem('token',result.data.token)
                    console.log(result.data.token)
                    this.$store.commit('changgeisLogin',true)
                    console.log(this.$store.state.islogin)
                    this.user=result.data.profile
                      this.$store.commit('changeuser',result.data.profile)
                        console.log(result)
                       let  resultx =await  this.$request(`/likelist?uid=${this.$store.state.user.userId}`)
  console.log(result.data)
     this.$store.commit('changelove',resultx.data.ids)
   
                }  
            })
        },
        blur(){
            this.show1=false
            console.log('sss')
        },
    async    shows(){
               if(this.input1==''){
                this.show1=true
            let result = await this.$request('/search/hot')
            this.hotlist=result.data.result.hots
               }else{
                  this.show2=true
              this.show1=false
             this.axios.get(`/search/suggest?keywords=${this.input1}`).then(res=>{
               console.log(res)
                 this.list=res.data.result
        })
                 
               }
           
            
        },
        seacher(){
          if(this.input1==''){}
          else{
              this.history.unshift(this.input1)
         this.history= Array.from(new Set(this.history))
            if(this.history.length>8){
                   this.history.pop()
            }

        localStorage.setItem('history',JSON.stringify(this.history))
        this.$router.push(`/seachersong/${this.input1}`)
        this.show1=false
        this.show2=false
        console.log('SSS')
          }
        
        },
        inputvalue(){
        //       this.show1=false
        //  let xx=    debounce(()=>{
        //        console.log(this.history)
        //       },2000)
        //      xx()
            // debounce(function(){
            //   console.log('sex')
            // },2000)

         
        },
       async  seacherlist(){
           console.log('sss')
//    let result = await  this.axios.get(`/search/suggest?keywords= ${this.input1}`)  
    //  console.log(result)
         },

        reset(){
       
            this.$refs.loginFormRef.resetFields()
        },
        go(){
           this.$router.go('1')
        },

         back(){
            this.$router.go("-1")
        },
        async xx(){
            let result =await this.$request('/user/subcount')   
            console.log(result)  
            console.log('sss')   },

           async isloginx(){
             let result =await this.$request('/login/status')
             console.log('是否登录',result)
            }
    },
    mounted(){
        
        let ss=document.getElementById('ss')
        console.log(ss)
        ss.addEventListener('input',debounce(()=>{
            
          if(this.input1==''){
            this.show1=true
              this.show2=false
          }else{
              this.show2=true
              this.show1=false
             this.axios.get(`/search/suggest?keywords=${this.input1}`).then(res=>{
               console.log(res)
                 this.list=res.data.result
        })
          }
       
        },1000) )
      document.addEventListener('click',(e)=>{
        let show =document.querySelector('.show')
        show.addEventListener('click',function(e){
          console.log('xxx')
          e.stopPropagation()
        })
         console.log(this.show1)
           this.show1=false
            this.show2=false
   
      })
        this.isloginx()
        let user = JSON.parse(window.localStorage.getItem('user')) 
        console.log(user)
        if(user){
             this.$store.commit('changgeisLogin',true)
              this.user=user
                       
        }
        this.history=JSON.parse(localStorage.getItem('history'))
        if( this.history instanceof Array){

        }else{
            this.history=[]
        }
    }

}
</script>
<style lang="less" scoped>
.topBox{
    width: 100%;
    height: 100%;
    background-color: red;
    text-align: center;
    img{
        position: relative;
        top:50%;
        transform: translate(0%,-50%);
    }
    .imgheaer{
       position: relative;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    transform: translate(0%, 10%)
}
    .arrow{
        
        margin: 5px;
        display: inline-block;
        border: 1px solid rgb(0, 0, 0);
         position: relative;
          top:50%;
        transform: translate(0%,-50%);
         i{
        font-size: 24px;
    }
         i:hover{
             color: aqua;

         }
    
    }
    .el-input{
        position: relative;
       top:50%;
        transform: translate(0%,-50%);
    }
   
}
.el-row{
    height: 100%;
}
.el-col{
 height: 100%;
}
.show{
  border-radius: 10px;
    text-align: start;
    margin: 10px 0px;
    width: 100%;
    height: 400px;
    overflow: auto;
    background-color: rgb(255, 255, 255);
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.seacher{
  padding:5px 20px; 
  white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;

}
.seacher:hover{
  background-color:#E6E6E6 ;
}
</style>