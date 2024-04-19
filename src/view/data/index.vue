<template>
  <div class="container">
    <ul class="left">
      <li>
        <div style="margin-bottom: 20px;">
          <span style=" font-size: 14px; ">土壤监测数据</span>
          <span style=" font-size: 14px; padding: 15px 0 0 300px;">历史数据</span>
        </div>
        <div class="soil">
          <SoilChart></SoilChart>
        </div>
      </li>
      <li>
        <div style="margin-bottom: 20px;">
          <span style=" font-size: 14px; ">水文监测数据</span>
        </div>
        <div class="hydrology">
          <HydrologyChart></HydrologyChart>
        </div>
      </li>
      <li>
        <div style="margin-bottom: 30px;">
          <span style=" font-size: 14px; ">水质监测数据</span>
        </div>
        <div class="water">
          <WaterChart></WaterChart>
        </div>
      </li>
    </ul>
    <div class="middle">
      <ul class="mTop">
       <li >
        <TleftChart></TleftChart>
       </li>
       <li>
        <TrightChart></TrightChart>
       </li>
      </ul>
      <ul class="mBottom">
        <li>
          <BleftChart></BleftChart>
        </li>
        <li>
          <BrightChart></BrightChart>
        </li>
      </ul>
    </div>
    <ul class="right">
      <li>
        <div style="margin-bottom: 20px;">
          <span style=" font-size: 14px; ">大气湿度数据</span>
          
        </div>
        <div class="soil">
          <SoilChart></SoilChart>
        </div>
      </li>
      <li>
        <div style="margin-bottom: 20px;">
          <span style=" font-size: 14px; ">风力风向数据</span>
        </div>
        <div class="hydrology" style="padding-left: 40px;">
          <WindChart></WindChart>
        </div>
      </li>
      <li>
        <div style="margin-bottom: 30px;">
          <span style=" font-size: 14px; ">降雨量数据</span>
        </div>
        <div class="water">
          <SoilChart></SoilChart>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import SoilChart from './LeftChart/soil.vue'
import HydrologyChart from './LeftChart/hydrology.vue'
import WaterChart from './LeftChart/water.vue'
import WindChart from './RightChart/wind.vue'
import TleftChart from './MiddleChart/tLeft.vue'
import TrightChart from './MiddleChart/tRighr.vue'
import BleftChart from './MiddleChart/bLeft.vue'
import BrightChart from  './MiddleChart/bRight.vue'

</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  color: #FFFFFF;
}

.container {
  display: flex;
  padding: 20px;

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: rgb(11, 28, 46);
    border-radius: 5px;

    li {
      flex: 1;
      padding: 20px
    }
  }

  .middle {
    flex: 1.5;
    display: flex;
    flex-direction: column;
    padding: 20px 0 20px 20px;
    .mTop{
      flex:1;
      display: flex;
      margin-top: 50px;
      li{
        flex:1;
      }
    }
    .mBottom{
      flex:1;
      display: flex;
      margin-top: 140px;
      li{
        flex:1;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: rgb(11, 28, 46);
    border-radius: 5px;
    li {
      flex: 1;
      padding: 20px
    }
  }
}
</style>