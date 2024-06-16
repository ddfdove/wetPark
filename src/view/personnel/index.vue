<template>
  <div class="container">


    <ul class="top">
      <li id="left">
        <div class="lTop">
          <div class="title">
            <span>今日派单统计</span>
          </div>
          <ul class="statisticTop flex">
            <li class="flex-1" v-for="(item, index) in statistic" :key="index"
              :style="{ backgroundImage: `url(${item.image})` }">
              <div>{{ item.description }}</div>
              <span>{{ item.quantity }}</span>
            </li>
          </ul>
        </div>
        <div class="lBottom">
          <div class="title">
            <span>超时工单统计</span>
          </div>
          <Timeout></Timeout>
        </div>
      </li>
      <li id="middle">
        <div class="mtop">
          <div class="title">
            <span>人员分布情况</span>
          </div>

        </div>
        <div class="mMiddle">
          <img src="@/assets/images/ditu.png" alt="">
        </div>
        <div class="mBottom">
          <Personnel></Personnel>
        </div>
      </li>
      <li id="right">
        <div class="title">
          <span>区域人员分布</span>
        </div>
        <div style="padding: 80px 90px ;">
          <Regional></Regional>
        </div>
      </li>
    </ul>
    <div class="bottom">
      <div id="bLeft">
        <div class="title">
          <span>人流量</span>
        </div>
        <Visitors class="visitors"></Visitors>
      </div>
      <div id="bRight">
        <div class="title">
          <span>园区工单排行榜TOP6</span>
        </div>
        <Garden class="garden"></Garden>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import Timeout from './timeout.vue';
import Visitors from './visitors.vue';
import Personnel from './personnel.vue'
import Regional from './regional.vue'
import Garden from './garden.vue'

let statistic = ref([
  {
    description: '总面积',
    quantity: '120',
    image: '/cut/park/park1.png'
  },
  {
    description: '固定资产',
    quantity: '5675.2',
    image: '/cut/park/park2.png'
  },
  {
    description: '野生动物种类',
    quantity: '800',
    image: '/cut/park/park3.png'
  },
  {
    description: '设备',
    quantity: '3000',
    image: '/cut/park/park4.png'
  },
])
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #030025;
  color: #FFFFFF;

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

        .statisticTop {
          display: flex;
          height: 100px;
          margin-top: 40px;
          // padding: 50px 20px 10px 20px;

          li {
            background-size: 98% 100%;
            background-repeat: no-repeat;
            margin: 0 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            padding-top: 5px;

            div {
              color: #00A3FF;

            }

            span {
              font-size: 25px;
              margin: 5px 40px 0 0
            }

          }

          #area {

            text-align: center;

            #lTop {
              width: 100px;
              margin-left: 60px;
              border: 1px solid rgb(46, 191, 191);
              border-radius: 2px;
            }

            #lBottom {
              margin-top: 30px;
              border-right: 1px solid rgb(28, 44, 64);

              #bl {
                font-size: 40px;
                margin-right: 5px;
              }

              #br {
                color: rgb(35, 104, 191);
              }
            }
          }

        }
      }

      .lBottom {
        flex: 2;
        padding: 0 10px;
      }
    }

    #middle {

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
        padding: 10px;

        // margin-bottom: 0px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .mBottom {
        flex: 5;
        margin: 10px;
        padding: 30px 0 0 60px;
        border: 1px solid #021f66;
      }
    }

    #right {

      margin-top: 10px;
      margin-right: 40px;

    }
  }

  .bottom {
    flex: 4.2;
    // height: 460px;
    display: flex;

    #bLeft {
      flex: 1.95;


      .visitors {
        margin-top: 20px;
        margin-right: 10px;
        margin-left: 10px;
        border: 1px solid #021f66;
      }

    }

    #bRight {
      flex: 1;

      .garden {
        border: 1px solid #021f66;

        margin: 20px 10px 0 40px;
      }



    }
  }
}
</style>
