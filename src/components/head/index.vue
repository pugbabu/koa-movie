<!--  -->
<template>
  <div class="head-box">
    <div class="menu">
      <router-link tag="div" active-class="item-active" v-for="(item, index) in navList" :key="index" class="menu-item" :to="item.url">
        <span>{{item.title}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: "首页",
          url: "/home"
        },
        {
          title: "正在热映",
          url: "/playing"
        },
        {
          title: "即将上映",
          url: "/coming"
        },
        {
          title: "最新热门电影",
          url: "/popular"
        }
      ]
    };
  }
};
</script>

<style scoped>
.head-box {
  height: 100%;
  background: #1a1a1a;
}
.menu {
  width: 100%;
  text-align: center;
  height: 100%;
}
.menu-item {
  display: inline-block;
  margin-top: 10px;
  line-height: 40px;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 0 20px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  box-shadow: 0 0 1rem gray;
  transition: all 0.3s;
  border-radius: 50px;
}
.item-active {
  background: #c00;
  box-shadow: 0 0 0px gray;
  transform: scale(0.99);
}
</style>