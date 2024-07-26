<template>
  <div class="boxContainer">
    <div class="screen" ref="screen">
      <div style="height: 80px;">
        <Nav></Nav>
      </div>
      <div class="content">
        <router-view ></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from "./components/nav/index.vue";
import { ref, onMounted, KeepAlive } from "vue";
import { useRoute } from "vue-router";
// 获取数据大屏展示内容盒子的DOM元素
let screen = ref();

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
  console.log('scaleapp',getScale());
});
//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}
//监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%) `;
};
</script>

<style lang="less">
.boxContainer {
  width: 100vw;
  height: 100vh;
  background-color: rgb(14, 17, 23);

  .screen {
    height: 1080px;
    width: 1920px;
    transform-origin: top left;
    position: fixed;
    top: 50%;
    left: 50%;

    .content {
      height: 1000px;
      padding-top: 20px;
      width: 1920px;
    }
  }
}
</style>
