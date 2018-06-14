<!--  -->
<template>
  <div class="wrapper">
    <div class='modal'>
      功夫熊猫
    </div>
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
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: rgba(0,0,0,.5);
	color: white; text-align: center */
}
.modal {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  filter: blur(16px);
  
}
</style>