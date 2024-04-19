<template>
  <div class="container">


    <ul class="top">
      <li id="left">
        <div class="lTop">
          <span
            style="color: #409EFF; font-size: 14px;display: block; padding: 15px 0 0 20px;margin-bottom: 50px;">今日派单统计</span>
          <ul style="display: flex; justify-content: space-around; text-align: center; font-size: 12px;">
            <li>
              <span style="color: rgb(148,194,234);">已派单</span>
              <div style="color: #FFFFFF;font-size: 30px;margin-top: 20px;">120</div>
            </li>
            <li>
              <span style="color: rgb(148,194,234);">待接单</span>
              <div style="color: #FFFFFF;font-size: 30px;margin-top: 20px;">35</div>
            </li>
            <li>
              <span style="color: rgb(148,194,234);">待验收</span>
              <div style="color: #FFFFFF;font-size: 30px;margin-top: 20px;">36</div>
            </li>
            <li>
              <span style="color: rgb(148,194,234);">已完成</span>
              <div style="color: #FFFFFF;font-size: 30px;margin-top: 20px;">52</div>
            </li>

          </ul>
        </div>
        <div class="lBottom">
          <span
            style="color: #409EFF; font-size: 14px;display: block; padding: 15px 0 0 20px;margin-bottom: 50px;">超时工单统计</span>
          <Timeout></Timeout>
        </div>
      </li>
      <li id="middle">
        <div class="mtop">
          <span style="color: #409EFF; font-size: 14px;display: inline-block; padding: 15px 0 0 20px;margin-bottom: 20px;">人员分布情况</span>
          <span style=" font-size: 14px;display: inline-block; padding: 15px 0 0 380px;margin-bottom: 20px;">总数:
            850</span>
        </div>
        <div class="mMiddle">
          <img src="../../assets/pictures/ditu.png" alt="">
        </div>
        <div class="mBottom">
        <Personnel></Personnel>
        </div>
      </li>
      <li id="right">
        <span
          style="color: #409EFF; font-size: 14px;display: block; padding: 15px 0 0 20px;margin-bottom: 50px;">区域人员分布</span>
        <div style="padding: 80px 90px ;">
          <Regional></Regional>
        </div> 
        </li>
    </ul>
    <div class="bottom">

      <div id="bLeft">
        <span
          style="color: #409EFF; font-size: 14px;display: block; padding: 15px 0 0 20px;margin-bottom: 20px;">人流量</span>
        <Visitors></Visitors>
      </div>
      <div id="bRight">
        <span
          style="color: #409EFF; font-size: 14px;display: block; padding: 15px 0 0 20px;margin-bottom: 50px;">园区工单排行榜TOP6</span>
        <div class="garden" style="padding: 40px;">
          <Garden></Garden>
        </div>
        </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Timeout from './timeout.vue';
import Visitors from './visitors.vue';
import Personnel from './personnel.vue'
import Regional from './regional.vue'
import Garden from './garden.vue'

</script>

<style lang="less" scoped>
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
  flex-direction: column;
  margin: 40px 10px;

  // height: 1000px;
  .top {
    flex: 5.5;
    display: flex;

    li {
      flex: 1;
    }

    #left {
      display: flex;
      flex-direction: column;

      .lTop {
        flex: 1.5;
        background-color: rgb(11, 28, 46);
        margin-top: 10px;
        margin-right: 10px;
        margin-left: 30px;
        border-radius: 5px;
      }

      .lBottom {
        flex: 2;
        background-color: rgb(11, 28, 46);
        margin-top: 10px;
        margin-right: 10px;
        margin-left: 30px;
        border-radius: 5px;
        // padding-right: 40px;
      }
    }

    #middle {
      background-color: rgb(11, 28, 46);
      margin-top: 10px;
      margin-right: 10px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;

      .mTop {
        height: 40px;

      }
      .mMiddle {
        flex: 3.5;
        // margin-bottom: 0px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .mBottom {
        flex: 5;
        padding-top: 40px ;
        padding-left: 80px;
      }
    }

    #right {
      background-color: rgb(11, 28, 46);
      margin-top: 10px;
      margin-right: 40px;
      border-radius: 5px;
    }
  }

  .bottom {
    flex: 4.2;
    // height: 460px;
    display: flex;
    overflow: hidden;

    #bLeft {
      flex: 1.95;
      background-color: rgb(11, 28, 46);
      margin-top: 20px;
      margin-right: 10px;
      margin-left: 30px;
      border-radius: 5px;

    }

    #bRight {
      flex: 1;
      background-color: rgb(11, 28, 46);
      margin-top: 20px;
      margin-right: 40px;
      border-radius: 5px;
    }
  }
}
</style>
