<template>
    <div class="xxx">
      <div class="header">
          <el-menu default-active="gengxin" :router="true" mode="horizontal" style="margin: 0 auto;width:420px;">
                <el-menu-item index="gengxin">个性推荐</el-menu-item>
                <el-menu-item index="songlist">歌单</el-menu-item>
                <el-menu-item index="musicRank">排行榜</el-menu-item>
                <el-menu-item index="singerList">歌手</el-menu-item>
                <el-menu-item index="newMusicList">最新音乐</el-menu-item>
            </el-menu>
      </div >
      <div class="center">
          <router-view></router-view>
          </div>
        
    </div>
</template>

<style lang="less" scoped>
.center{
    height: calc(100vh - 200px);
}
</style>