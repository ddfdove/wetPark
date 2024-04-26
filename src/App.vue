<template>
  <div class="sceen" ref="screen">
    <div class="nav">
      <div class="left">
        <ul>
          <li><router-link to="/park">园区展示</router-link></li>
          <li><router-link to="/device">设备管理</router-link></li>
          <li><router-link to="/bird">鸟类检测</router-link></li>

        </ul>
      </div>
      <div class="middle">海湖湿地公园智慧屏</div>
      <div class="right">
        <ul>
          <li><router-link to="personnel">人员分布</router-link></li>
          <li><router-link to="data">数据分析</router-link></li>
          <li><router-link to="message">消息推送</router-link></li>
        </ul>
      </div>
    </div>

    <router-view></router-view>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 获取数据大屏展示内容盒子的DOM元素
 let screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
//监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%) `
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}

.sceen {
  background-color: rgb(14, 17, 23);
  height: 1080px;
  width: 1920px;
  transform-origin: top left;
  position: fixed;
  top:50%;
  left:50%;
}

.router-link-active {
  text-decoration: none; //去除默认样式

}

a {
  text-decoration: none;
  color: rgb(46, 191, 191);
}

.nav {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  li {
    flex: 1;
    display: inline-block;
    margin: 0 40px;
    // padding:0 8px;
    width: 120px;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    background-color: rgb(13, 40, 56);
    border: 2px solid;
    // box-shadow: 1px 1px rgb(34,160,163) ;
    box-shadow: 5px 5px 8px 0px rgb(34, 160, 163);
  }

  .left {
    height: 80px;
    display: flex;
    width: 35%;
  }

  .middle {
    width: 30%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 26px;
    color: rgb(140, 162, 170);
  }

  .right {
    height: 80px;
    width: 35%;
    display: flex;
  }
}
</style>
