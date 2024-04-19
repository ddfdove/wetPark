<template>
  
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
        <li><router-link to="/personnel">人员分布</router-link></li>
        <li><router-link to="data">数据分析</router-link></li>
        <li><router-link to="message">消息推送</router-link></li>
      </ul>
    </div>
   </div>
   
  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

</script>

<style lang="less" scoped>
*{
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;

}
// .container{
//   background-color: rgb(14,17,23);
//   height: 1080px;
//   width: 1920px;
// }
.router-link-active {
    text-decoration: none;//去除默认样式
   
  }
  a{
    text-decoration: none;
    color: rgb(46,191,191);
  }

.nav{
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  li{
      flex: 1;
      display: inline-block;
      margin: 0 40px;
      // padding:0 8px;
      width: 120px;
      line-height: 40px;
      font-size: 12px;
      text-align: center;
      background-color: rgb(13,40,56);
      border: 2px solid ;
      // box-shadow: 1px 1px rgb(34,160,163) ;
      box-shadow:5px 5px 8px 0px rgb(34,160,163);
    }
  .left{
    height: 80px;
    display: flex;
    width: 35%;
  }
  .middle{
    width: 30%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 26px;
    color: rgb(140,162,170);
  }
  .right{
    height: 80px;
    width: 35%;
    display: flex;
  }
}
</style>
