<!--  -->
<template>
  <div class="aside">
    <ul>
      <li>按时间</li>
      <li>按类型</li>
      <li>按时间</li>
      <li>按时间</li>
      <li>按时间</li>
      <li>按时间</li>
      
    </ul>
  </div>
</template>

<script>
export default {
  //  data () {
  //     return {
  //     }
  //  },
};
</script>

<style scoped>
.aside {
  text-align: center;
  font-size: 14px;
  color: #fff;
  height: 100%;
  background: rgb(14, 28, 44);
}
ul {
  text-align: center;
  width: 6rem;
  color: darkgray;
  border-right: 1px solid rgb(41, 51, 3);
  box-shadow: 1px 0 0px #222222;
}
li {
  height: 3rem;
  width: 10rem;
  line-height: 3rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  list-style: none;
  padding-left: 1rem;
  background: rgb(8, 21, 37);
  border-bottom: 3px solid rgba(0, 0, 0, 0.5);
  transition: margin-left 0.5s;
}
li:last-child {
  border: none;
}
li:hover {
  background: linear-gradient(
    180deg,
    rgb(28, 41, 57),
    rgb(8, 21, 37),
    rgb(8, 21, 37),
    rgb(28, 41, 57)
  );
  margin-left: 2rem;
}
</style>