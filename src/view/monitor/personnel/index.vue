<template>
  <div class="container">


    <ul class="top">
      <li id="left">
        <div class="lTop">
          <panelboard :chTitle="'季度人流排行'" :enTitle="'Quarterly traffic ranking'">
            <ul class="statisticTop flex">
              <li class="flex-1" v-for="(item, index) in statistic" :key="index"
                :style="{ backgroundImage: `url(${item.image})` }">
                <div style="color: #00A3FF;">{{ item.description }}</div>
                <span :style="{ color: `${item.color}` }">{{ item.quantity }}</span>
              </li>
            </ul>
          </panelboard>
        </div>
        <div class="lBottom">
          <panelboard :chTitle="'时段排行'" :enTitle="'Time period ranking'">
            <Timeout></Timeout>
          </panelboard>
        </div>
      </li>
      <li id="middle">
        <ul class="switchButton">
          <li :class="{ 'active-link': $route.path === '/monitor/environment' }">
            <router-link to="/monitor/environment"><span>环境监测</span></router-link>
          </li>
          <li :class="{ 'active-link': $route.path === '/monitor/bird' }">
            <router-link to="/monitor/bird"><span>鸟类监测</span></router-link>
          </li>
          <li :class="{ 'active-link': $route.path === '/monitor/personnel' }">
            <router-link to="/monitor/personnel"><span>人员监测</span></router-link>
          </li>

        </ul>
        <div class="mtop" style="margin-top: 30px;">
          <panelboard :chTitle="'人员分布情况'" :enTitle="'Personnel distribution'">
            <div class="mBottom">
              <Personnel></Personnel>
            </div>
          </panelboard>
        </div>

      </li>
      <li id="right">
        <panelboard :chTitle="'区域人员分布'" :enTitle="'Staff Distribution'">
          <mvcProgress :list="personList" style="width: 500px;margin-top: 50px;"></mvcProgress>
        </panelboard>
      </li>
    </ul>
    <div class="bottom">
      <div id="bLeft">
        <panelboard :chTitle="'人流量'" :enTitle="'Human traffic'">
          <Visitors class="visitors"></Visitors>
        </panelboard>
      </div>
      <div id="bRight">
        <panelboard :chTitle="'景区人流排行Top5'" :enTitle="'ScenicSpot flow ranking'" style="margin-top: -60px;">
          <Garden class="garden"></Garden>
        </panelboard>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Timeout from './timeout.vue';
import Visitors from './visitors.vue';
import Personnel from './personnel.vue'
import Regional from './regional.vue'
import Garden from './garden.vue'
import { useRoute } from 'vue-router';

import panelboard from "../../../components/panelboard/index.vue"
import mvcProgress from "./components/mvc-progress.vue"

const $route = useRoute();
const isBirdLinkActive = (path: string) => {
  return $route.path === path ||
    ($route.path === '/personnel' && path === '/bird') ||
    ($route.path === '/environment' && path === '/bird');
};
let statistic = ref([
  {
    description: '一季度',
    quantity: '120',
    image: '/cut/square.png',
    color: '#ffffff'
  },
  {
    description: '二季度',
    quantity: '5675',
    image: '/cut/square.png',
    color: '#FFC300'
  },
  {
    description: '三季度',
    quantity: '800',
    image: '/cut/square.png',
    color: '#FF8D1A'
  },
  {
    description: '四季度',
    quantity: '3000',
    image: '/cut/square.png',
    color: '#00FF85'
  },
])
const personList = reactive([
  {
    name: "A区",
    value: 10,
  },
  {
    name: "B区",
    value: 14,
  },
  {
    name: "C区",
    value: 23,
  }
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

    .switchButton {
      margin-left: 120px;
      margin-top: 10px;
      display: flex;
      align-items: center;

      li {
        margin: 0 20px;
        margin-bottom: 10px;
        color: #021f66;
        width: 160px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: url('/cut/未选中@1x.png');
        background-size: cover;

        &.active-link {

          background: url('/cut/选中@1x.png');

        }

        span {
          font-family: YouSheBiaoTiHei;
          font-size: 20px;
          font-weight: normal;
          // line-height: 12px;
          text-align: center;
          color: #FFFFFF;
        }
      }

      // li:hover {
      //   background-color: #0f3890;
      // }

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
              font-size: 25px;

            }

            span {
              font-size: 25px;
              // margin: 5px 20px 0 0
              margin-top: 10px;
              text-align: center;
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
      // width: 770px;
      margin-top: 10px;
      margin-right: 10px;
      // border-radius: 5px;
      display: flex;
      flex-direction: column;

      .mTop {
        // padding: 10px 30px;

        img {

          width: 100%;
          height: 100%;
        }

      }

      .mBottom {
        flex: 5;
        margin-top: 40px;
        padding: 30px 0 0 60px;
        border: 1px solid #021f66;
      }
    }

    #right {

      margin-top: 20px;
      margin-left: 60px;

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

        margin: 20px 5px 0 0px;
      }



    }
  }
}
</style>
