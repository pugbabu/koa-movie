<template>
  <div id="app">
    <el-container style="height:100%;">
      <el-header class="head-wrapper">
        <head-box></head-box>
      </el-header>
      <el-container class="container-box">
        <el-aside width="200px" class="aside-wrapper">
          <aside-box></aside-box>
        </el-aside>
        <el-main class="main-wrapper">
          <div class="box">
            <keep-alive>
              <router-view></router-view>    
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeadBox from "./components/head/index";
import AsideBox from "./components/aside/index";
export default {
  name: "App",
  components: {
    HeadBox,
    AsideBox
  }
};
</script>

<style scoped>
@import "~@/assets/css/reset.css";
#app {
  height: 100%;
}
.head-wrapper {
  padding: 0;
}
.container-box {
  height: calc(100% - 60px);
}
.main-wrapper {
  /* background: linear-gradient(to left,#ffa900,#ffd400); */
  min-height: 100%;
  background: black;
  padding: 10px;
  box-sizing: border-box;
}
.box {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  color: white;
  padding: 1rem;
  box-shadow: 0 0 3rem rgba(100, 200, 255, 0.5) inset;
  background: rgba(0, 0, 0, 0.3);
}
</style>
