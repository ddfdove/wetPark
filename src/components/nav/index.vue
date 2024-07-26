<template>
  <div class="nav">
    <div class="left">
      <ul>
        <li :class="{ 'active-link': $route.path === '/park' }">
          <router-link to="/park"><span>园区展示</span></router-link>
        </li>
        <li :class="{ 'active-link': $route.path === '/device' }">
          <router-link to="/device"><span>点位监测</span></router-link>
        </li>
        

      </ul>
    </div>
    <div class="middle">海湖湿地公园智慧屏</div>
    <div class="right">
      <ul>
        <li :class="{ 'active-link': $route.path.startsWith('/monitor') }">
          <router-link to="/monitor"><span>监测</span></router-link>
        </li>
        <!-- <li :class="{ 'active-link': $route.path === '/personnel' }">
          <router-link to="/personnel"><span>人员分布</span></router-link>
        </li> -->
        <li :class="{ 'active-link': $route.path.startsWith('/data') }">
          <router-link to="/data"><span>数据分析</span></router-link>
        </li>
        <!-- <li :class="{ 'active-link': $route.path === '/message' }">
          <router-link to="message"><span></span></router-link>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>

<style lang="less" scoped>
.nav {
  width: 100%;
  display: flex;
  padding: 20px 0;
  background-image: url('/cut/头部.png');
  background-size: cover;

  .left {
    height: 80px;
    display: flex;
    width: 30%;
   
    li {
      flex: 1;
      display: inline-block;
      // margin: 0 20px;
      margin-top: -20px;
      margin-left: 3vw;
      padding-top: 5px;
      width: 180px;
      line-height: 45px;
      font-size: 18px;
      text-align: center;
      background-image: url('/cut/左-1.png');
      background-size: cover;

      &.active-link {
        background-image: url('/cut/右-1选中.png'); // 设置活动状态下的背景图像
      }

      span {
        width: 67px;
        height: 24px;
        opacity: 1;
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        font-weight: normal;
        // line-height: 12px;
        text-align: center;
        background: linear-gradient(0deg, rgba(61, 115, 255, 0.72) -4%, rgba(61, 115, 255, 0) 95%), #FFFFFF;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }
  }

  .middle {
    width: 40%;
    height: 60px;
    // line-height: 60px;
    // text-align: center;
    // font-size: 30px;
    font-family: YouSheBiaoTiHei;
    font-size: 40px;
    font-weight: normal;
    line-height: 60px;
    text-align: center;
    letter-spacing: 4.8px;
    margin: 0 40px;
    // color: rgb(13,40,56);
    color: #ffffff;
  }

  .right {
    height: 80px;
    width: 30%;
    display: flex;

    li {
      flex: 1;
      display: inline-block;
      // margin: 0 20px;
      margin-top: -20px;
      margin-left: 3vw;
      padding-top: 5px;
      width: 180px;
      line-height: 45px;
      font-size: 18px;
      text-align: center;
      background-image: url('/cut/右-1.png');
      background-size: cover;

      &.active-link {
        background-image: url('/cut/左-1选中.png'); // 设置活动状态下的背景图像
      }

      span {
        width: 67px;
        height: 20px;
        opacity: 1;
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        font-weight: normal;
        // line-height: 20px;
        text-align: center;
        background: linear-gradient(0deg, rgba(61, 115, 255, 0.72) -4%, rgba(61, 115, 255, 0) 95%), #FFFFFF;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }
  }
}
</style>
