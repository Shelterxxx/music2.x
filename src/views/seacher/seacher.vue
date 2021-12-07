<template>
  <div>   <el-menu  mode="horizontal" >
                <el-menu-item @click="$router.push(`/seachersong/${$route.params.id}`)">歌曲</el-menu-item>
                <el-menu-item @click="$router.push(`/seachersonglist/${$route.params.id}`)">歌单</el-menu-item>
                <el-menu-item @click="$router.push(`/seachersinger/${$route.params.id}`)">歌手</el-menu-item>
                <el-menu-item @click="$router.push(`/seachermv/${$route.params.id}`)">MV</el-menu-item>
            </el-menu>
     
    
      </div>
</template>

<style lang="less" scoped>
.el-menu.el-menu--horizontal{
    border: 0px solid red;
}
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #fd0606;
    font-weight:1000;
    color: #000000;
}
</style>