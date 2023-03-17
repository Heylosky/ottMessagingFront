<template>
  <div class="head">
    <div style="font-size: 50px; color: white; padding-left: 30px; height: 100%">
      OTT message management platform
    </div>
  </div>
  <div class="box">
    <div class="left">div2</div>
    <div class="right">div3</div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.head{
  height: 10%;
  min-height: 80px;
  width: 100%;
  background-color: #646cff;
}
.box {
  height: 90%;
  display: flex;
  flex-direction: row;
}
.left {
  display: flex;
  height: 100%;
  width: 220px;
  background-color: #9b643d;
}
.right {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  background-color: rebeccapurple;
}
</style>