<template>
  <div class="container">
    <div class="left">
      <div class="introduce">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;海湖湿地公园位于西宁市海晏路绿地云香郡北侧，公园内绿草繁盛，河道绵延，有休闲广场、桥栈、拱桥等景观，是一个集湿地保育、科普宣教、合理利用、管理服务等多功能与一体的湿地生态展示示范基地
      </div>
      <ul>
        <li id="detection">
          <span>监测数据</span>
          <div>
            <MonitarChart id="monitarChart"></MonitarChart>
          </div>

        </li>
        <li>
          <span>野生鸟类种类</span>
          <BirdChart></BirdChart>
        </li>
        <li>
          <span>种群趋势分析</span>
          <PopulationChart></PopulationChart>
        </li>
      </ul>

    </div>
    <div class="middle">

      <ul id="statisticTop">
        <li id="area">
          <div id="lTop">总面积</div>
          <div id="lBottom">
            <span id="bl">146</span>
            <span id="br">公顷</span>
          </div>
        </li>
        <li style="text-align: center; padding-top: 50px;">
          <div>
            <span style="font-size: 30px;margin-right: 5px;">5675.2</span>
            <span>亿</span>
          </div>
          <div style="color: rgb(60,191,223);font-size: 10px;">固定资产</div>
        </li>
        <li style="text-align: center; padding-top: 50px;">
          <div>
            <span style="font-size: 30px;margin-right: 5px;">800</span>
            <span>种</span>
          </div>
          <div style="color: rgb(60,191,223);font-size: 10px;">野生动物种类</div>
        </li>
        <li style="text-align: center; padding-top: 50px;">
          <div>
            <span style="font-size: 30px;margin-right: 5px;">3000</span>
            <span>台</span>
          </div>
          <div style="color: rgb(60,191,223);font-size: 10px;">设备</div>
        </li>
      </ul>
      <div class="animal">
        <img src="../../assets/pictures/duck.png" alt="">
      </div>
      <ul class="statisticBottom">
        <li>
          <div>人流量</div>
          <PeopleChart></PeopleChart>
        </li>
        <li>
          <div>水质检测</div>
          <WaterChart></WaterChart>
        </li>
        <li>
          <div>空气湿度监测</div>
          <AirChart></AirChart>
        </li>

      </ul>

    </div>
    <div class="right">
      <div class="weather">
        <div class="picture">
          <img src="../../assets/pictures/xining.jpg" alt="">
        </div>
        <div class="fontsize">
          <div class="city">
            <ul>
              <li id="address">西宁城西...</li>
              <li>[切换城市]</li>
            </ul>
          </div>
          <div class="date">
            <ul>
              <li>{{ date }}</li>
              <li>{{ week }}</li>
              <li>{{ time }}</li>
            </ul>
          </div>
        </div>
      </div>
      <ul class="map">
        <li id="satellite">
          <span style="font-size: 22px;">卫星图</span>
          <div>
            <div>
              <el-tabs v-model="activeName1" class="demo-tabs" @tab-click="handleClick1">
                <el-tab-pane label="生态停车场" name="park1">
                  <div>
                    <img src="../../assets/pictures/v2_sah5y2.png" style="width: 100%;height: 100%;">
                  </div>
                </el-tab-pane>
                <el-tab-pane label="卫生间" name="toilet1">
                  <Satellite style="height: 160px;"></Satellite>
                </el-tab-pane>
                <el-tab-pane label="石笼坝" name="shilongba1">
                  <Satellite style="height: 160px;"></Satellite>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div></div>
          </div>
        </li>
        <li id="freehand">
          <span style="font-size: 22px;">手绘图</span>
          <div>
            <el-tabs v-model="activeName2" class="demo-tabs" @tab-click="handleClick2" >
              <el-tab-pane label="生态停车场" name="park2" >
                <div>
                  <img src="../../assets/pictures/v2_sah5y2.png" style="width: 100%;height: 100%;">
                </div>
              </el-tab-pane>
              <el-tab-pane label="卫生间" name="toilet2">
                <Freehand style="height: 180px;"></Freehand>
                </el-tab-pane>
              <el-tab-pane label="石笼坝" name="shilongba2">
                <Satellite style="height: 160px;"></Satellite>
              </el-tab-pane>
            </el-tabs>
          </div>
        </li>
      </ul>
      <div style="height: 240px; margin-top: 20px;">
        <img src="../../assets/pictures/didianjiance.png" style="width: 100%;height: 100%;">
      </div>
    </div>
  </div>
</template>

<script setup>
import MonitarChart from './monitar.vue'
import BirdChart from './wildBird.vue'
import PopulationChart from './population.vue'
import PeopleChart from './people.vue'
import WaterChart from './water.vue'
import AirChart from './air.vue'
import Freehand from './freehand.vue'
import Satellite from './satellite.vue'

import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'
import "moment/dist/locale/zh-cn";


let date = ref(moment().format('YYYY年MM月DD日'))
let week = ref(moment().format('dddd'))
let timer = ref(0)
//存储当前时间
let time = ref(moment().format('h:mm:ss a'))
//卫星图手绘图数据
const activeName1 = ref('park1')
const activeName2 = ref('park2')
// const tabsList = ref([
//     {
//         label: '生态停车场',
//         name: 'park',
//     },  
//     {
//         label: '卫生间',
//         name: 'toilet',
//     },
//     {
//         label: '石笼坝',
//         name: 'shilongba',
//     },
// ])
//组件挂载完毕更新当前的事件
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('h:mm:ss a')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})

const activeName = ref('first')

// const handleClick = (tab, event) => {
//   console.log(tab, event)
// }

</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}

.container {
  display: flex;
  color: white;
  // height:1000px;
  // background-color: rgb(11,28,46);
  .left {
    // height: 880px;
    flex: 1;
    background-color: rgb(11, 28, 46);
    margin: 10px 10px;
    border-radius: 5px;

    .introduce {
      height: 100px;
      padding: 40px 15px;
      font-size: 14px;
    }

    ul {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      padding: 25px;
      // margin-top: 40px;
      height: 880px;

      li {
        flex: 1;
        // margin:25px;
        padding-top: 10px;
        //   #monitarChart{
        //   // height: 100px;
        //   width:400px;

        // }
      }

      #detection {
        border-top: 2px solid rgb(28, 44, 64);

      }

    }
  }

  .middle {
    flex: 2;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    #statisticTop {
      display: flex;
      // justify-content: space-around;
      margin-top: 10px;
      border-radius: 5px;
      background-color: rgb(11, 28, 46);
      height: 140px;

      li {
        // display: inline-block;
        flex: 1;
        // padding: 10px;
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

    .animal {
      flex: 2;
      padding: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .statisticBottom {
      flex: 1;
      // height: 240px;
      display: flex;
      border-radius: 5px;
      background-color: rgb(11, 28, 46);
      // justify-content: space-around;
      margin-bottom: 20px 0;

      li {
        flex: 1;
        display: inline-block;
        padding: 20px;

        div {
          margin-bottom: 10px;
        }
      }
    }
  }

  .right {
    flex: 1;
    background-color: rgb(11, 28, 46);
    margin: 10px 10px;
    padding: 20px;
    border-radius: 5px;

    .weather {
      background-color: rgb(51, 152, 253);
      height: 100px;
      // padding:20px 15px 5px 15px;
      font-size: 14px;
      display: flex;

      .picture {
        flex: 1;
        margin-right: 30px;
        padding: 10px 30px 10px 30px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;

        }
      }

      .fontsize {
        flex: 2;
        display: flex;
        flex-direction: column;

        .city {
          flex: 2;
          display: flex;

          // justify-content: space-around;
          li {
            display: inline-block;
            flex: 1;
            line-height: 50px;
          }

          #address {
            font-size: 22px;
            margin-right: 20px;
          }
        }

        .date {
          font-size: 10px;
          flex: 1;
          display: flex;

          // justify-content: space-around;
          li {
            display: inline-block;
            flex: 1;
            margin-right: 20px;
          }
        }

      }

    }

    .map {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      padding: 25px;
      // height: 880px;

      // .demo-tabs > .el-tabs__content {
      //   padding: 32px;
      //   color: #FFFFFF;
      //   font-size: 32px;
      //   font-weight: 600;
      // }
      li {
        flex: 1;
        // margin: 25px;
        padding-top: 15px;
      }
      .demo-tabs{
          height: 220px;
          // background-color: #fff;
        }
      #satellite {
        border-top: 2px solid rgb(28, 44, 64);
        
        // .demo-tabs>.el-tabs__content {
        //   padding: 32px;
        //   color: #6b778c;
        //   font-size: 32px;
        //   font-weight: 600;
        // }

        ::v-deep .el-tabs__item {
          color: #FFFFFF;
        }

        /**选中 */
        ::v-deep .el-tabs__item.is-active {
          color: #409EFF;
          opacity: 1;
        }

        /*去下划线 */
        ::v-deep .el-tabs__nav-wrap::after {
          position: static !important;
        }

        /*去掉切换时el-tab-pane底部的蓝色下划线*/
        ::v-deep .el-tabs__active-bar {
          background-color: transparent !important;
        }

        // ul li{
        //   display: inline-block;
        //   padding: 0;
        //   margin-left: 0;
        // }
      }
    
      #freehand {
        .demo-tabs>.el-tabs__content {
          padding: 32px;
          color: #6b778c;
          font-size: 32px;
          font-weight: 600;
        }

        ::v-deep .el-tabs__item {
          color: #FFFFFF;

        }

        /**选中 */
        ::v-deep .el-tabs__item.is-active {
          color: #409EFF;
          opacity: 1;
        }

        /*去下划线 */
        ::v-deep .el-tabs__nav-wrap::after {
          position: static !important;
        }

        /*去掉切换时el-tab-pane底部的蓝色下划线*/
        ::v-deep .el-tabs__active-bar {
          background-color: transparent !important;
        }

        ul li {
          display: inline-block;
          padding: 0;
          margin-left: 0;
        }
      }
    }
  }


}
</style>
