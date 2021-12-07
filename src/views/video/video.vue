<template>
     <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  router>
  <el-menu-item index="/video/movie">视频</el-menu-item>
    <el-menu-item index="/video/mv">Mv</el-menu-item>
  </el-menu>
   <router-view> </router-view>
   </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
.el-menu--horizontal>.el-menu-item.is-active {
    font-weight: 700 ;
    font-size: 24px;
    border-bottom: 2px solid red ;
}
.el-menu.el-menu--horizontal{
 border: 0px;   
}
</style>