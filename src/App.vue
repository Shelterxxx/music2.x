<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  mounted(
    
  ){
    console.log(this.$store.state)
//     window.addEventListener("beforeunload",()=>{
//       console.log('刷新了')
// localStorage.setItem("store",JSON.stringify(this.$store.state))
// })

//     if (localStorage.getItem("store") ) {
//       console.log('更新了')
// this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
// console.log(localStorage.getItem("store"))
// console.log(this.$state.state)
// }

}
}

</script>
<style lang='less'>
.red{
      background-color:transparent  !important ;
   box-shadow: 0 0px 0px 0 rgba(0,0,0,.1)  !important;
        border: 0px solid #EBEEF5  !important;
}
// #app {
//   height: 100%;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-image: url('./assets/1.jpg') ;
//   // font-family: Avenir, Helvetica, Arial, sans-serif;
//   // -webkit-font-smoothing: antialiased;
//   // -moz-osx-font-smoothing: grayscale;
//   // text-align: center;
//   // color: #2c3e50;
// }
// #app::after{
//  content: '';
//   position: absolute;
//   height: 100%;
//   width: 100%;
//   top: 0px;
//   left: 0px;
//   background: inherit;
//   filter: blur(3px);
//   z-index: 0;
// }
// #nav {
//   padding: 30px;
// }

// #nav a {
//   font-weight: bold;
//   color: #2c3e50;
// }

// #nav a.router-link-exact-active {
//   color: #42b983;
// }
</style>
