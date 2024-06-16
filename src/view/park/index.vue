<template>
  <div class="container flex">
    <div class="left">
      <div>
        <div class="title">
          <span>公园简介</span>
        </div>
        <div class="introduce">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;海湖湿地公园位于西宁市海晏路绿地云香郡北侧，公园内绿草繁盛，河道绵延，有休闲广场、桥栈、拱桥等景观，是一个集湿地保育、科普宣教、合理利用、管理服务等多功能与一体的湿地生态展示示范基地
        </div>
      </div>
      <ul>
        <li class="flex-1 detection">
          <div class="title">
            <span>监测数据</span>
          </div>
          <div class="monitarChart">
            <MonitarChart id="monitarChart"></MonitarChart>
          </div>

        </li>
        <li class="flex-1">
          <div class="title">
            <span>野生鸟类种类</span>
          </div>
          <BirdChart></BirdChart>
        </li>
        <li class="flex-1">
          <div class="title">
            <span>种群趋势分析</span>
          </div>
          <PopulationChart></PopulationChart>
        </li>
      </ul>

    </div>
    <div class="middle">
      <ul class="statisticTop flex">
        <li class="flex-1" v-for="(item, index) in statistic" :key="index"
          :style="{ backgroundImage: `url(${item.image})` }">
          <div>{{ item.description }}</div>
          <span>{{ item.quantity }}</span>
        </li>
      </ul>
      <div class="animal">
        <div class="title">
          <span>公园简介</span>
        </div>
        <img src="/cut/bird/bird5.png" alt="">
      </div>
      <ul class="statisticBottom">
        <li>
          <div class="title">
            <span>人流量</span>
          </div>
          <PeopleChart class="border"></PeopleChart>
        </li>
        <li>
          <div class="title">
            <span>水质检测</span>
          </div>
          <WaterChart class="border"></WaterChart>
        </li>
        <li>
          <div class="title">
            <span>空气湿度检测</span>
          </div>
          <AirChart class="border"></AirChart>
        </li>

      </ul>

    </div>
    <div class="right">
      <div class="rTop">
        <div class="title">
          <span>城市时间</span>
        </div>
        <div class="weather">
          <div class="picture">
            <img src="@/assets/images/xining.jpg" alt="">
          </div>
          <div class="fontsize">
            <div class="city">
              <ul>
                <li id="address">西宁城西</li>
                <li><el-button class="custom-button">[切换城市]</el-button>
                </li>
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
      </div>
      <div class="rMiddle">
        <div class="title">
          <span>地图详情</span>
        </div>
        <ul class="map">
          <li id="satellite">
            <span style="font-size: 22px;">卫星图</span>
            <div>
              <div>
                <el-tabs v-model="activeName1" class="demo-tabs" @tab-click="handleClick1">
                  <el-tab-pane label="生态停车场" name="park1">
                    <div>
                      <img src="../../assets/images/v2_sah5y2.png" style="width: 100%;height: 100%;">
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
          <!-- <li id="freehand">
          <span style="font-size: 22px;">手绘图</span>
          <div>
            <el-tabs v-model="activeName2" class="demo-tabs" @tab-click="handleClick2">
              <el-tab-pane label="生态停车场" name="park2">
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
        </li> -->
        </ul>
      </div>
      <div class="rBottom">
        <div class="title">
          <span>地点检测</span>
        </div>
        <div class="flex area">
          <div style="margin: 0 10px 0 10px;">
            <span>区域:</span>
            <el-dropdown @command="handleCommand" popper-class="custom-dropdown">
              <span class="el-dropdown-link">
                <span style="margin-right: 10px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">Action 1</el-dropdown-item>
                  <el-dropdown-item command="b">Action 2</el-dropdown-item>
                  <el-dropdown-item command="c">Action 3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div>
            <span class="text-sm" style="margin-right: 10px;">时间:</span>
            <el-dropdown @command="handleCommand" class="leading-10 h-10">
              <span class="el-dropdown-link">
                <span style="margin-right: 10px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">Action 1</el-dropdown-item>
                  <el-dropdown-item command="b">Action 2</el-dropdown-item>
                  <el-dropdown-item command="c">Action 3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>—</span>
            <el-dropdown @command="handleCommand" class="leading-10 h-10">
              <span class="el-dropdown-link" style="margin-left: 10px;">
                <span style="margin-right: 10px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">Action 1</el-dropdown-item>
                  <el-dropdown-item command="b">Action 2</el-dropdown-item>
                  <el-dropdown-item command="c">Action 3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="bird">
          <ul>
            <li v-for="(item, index) in birds.slice(0, 5)" :key="index">
              <div>
                <span class="font-25">{{ item.quantity }}</span>
                <span class="font-18">只</span>
              </div>
              <h5 class="font-18">{{ item.name }}</h5>
            </li>

          </ul>
        </div>
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
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import moment from 'moment'
import "moment/dist/locale/zh-cn";

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
const birds = ref([
  {
    name: '斑嘴鸭',
    quantity: '5'
  },
  {
    name: '白鹭',
    quantity: '1'
  },
  {
    name: '骨顶鸡',
    quantity: '3'
  },
  {
    name: '动物',
    quantity: '5'
  },
  {
    name: '鸟',
    quantity: '9'
  },

])
let date = ref(moment().format('YYYY年MM月DD日'))
let week = ref(moment().format('dddd'))
let timer = ref(0)
//存储当前时间
let time = ref(moment().format('h:mm:ss '))
//卫星图手绘图数据
const activeName1 = ref('park1')
const activeName2 = ref('park2')
//组件挂载完毕更新当前的事件
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('h:mm:ss ')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})

const activeName = ref('first')

const handleCommand = (command) => {
  ElMessage(`click on item ${command}`)
}

</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: #030025;
  color: #FFFFFF;

  :deep(.el-dropdown-link) {
    width: 120px;
    line-height: 40px;
    margin-right: 10px;
    border: none;
    color: #FFFFFF;
    text-align: center;
    background-image: url('/cut/bird/bird1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  // :deep(.el-dropdown-menu) {
  //   background-color: #b91616;
  // }

  // :deep(.el-dropdown-menu .el-dropdown-item) {
  //   background-color: #ae2222
  // }

  // :deep(.el-dropdown-menu .el-dropdown-item:hover) {
  //   background-color: #ba2828
  //     /* 设置悬停时的背景颜色 */
  // }

  .title {
    margin: 10px 0;

    span {
      margin-left: 10px;
    }
  }

  .left {
    flex: 1.1;
    height: 100%;
    padding-bottom: 10px;



    .introduce {
      height: 100px;
      padding: 15px 30px;
      font-size: 14px;
      background-color: #030632;
      line-height: 1.5;
      border: 1px solid #021f66;
    }

    ul {
      display: flex;
      flex-direction: column;

      .monitarChart {
        // height: 240px;
        border: 1px solid #021f66;
        padding: 10px;
      }
    }
  }

  .middle {
    flex: 1.8;
    display: flex;
    flex-direction: column;
    // margin-bottom: 10px;
    margin: 0 10px;

    .statisticTop {
      display: flex;
      height: 160px;
      padding: 50px 20px 10px 20px;

      li {
        background-size: 98% 100%;
        background-repeat: no-repeat;
        margin: 0 25px;
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

    .animal {
      flex: 2;

      .title {
        margin: 10px 0;

        span {
          margin-left: 30px;
        }
      }

      img {
        width: 100%;
        height: 450px;
        // margin-left: 20px;
      }
    }

    .statisticBottom {
      flex: 1;
      display: flex;

      li {
        flex: 1;
        display: inline-block;

        .border {
          border: 1px solid #021f66;
          margin: 0 5px;
        }

        .title {
          margin: 10px 0;

          span {
            margin-left: -10px;
          }
        }


      }
    }
  }

  .right {
    flex: 1.1;
    // background-color: rgb(11, 28, 46);
    margin: 10px 0;
    // padding: 20px;
    // border-radius: 5px;

    .weather {
      background-color: #030e36;
      height: 100px;
      // padding:20px 15px 5px 15px;
      padding: 5px;
      margin-right: 5px;
      font-size: 14px;
      display: flex;

      .picture {
        flex: 1;
        // margin-right: 30px;
        // padding: 10px 30px 10px 30px;
        margin-right: 20px;

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
          // padding: 0 20px;

          // justify-content: space-around;
          li {
            display: inline-block;
            flex: 1;
            line-height: 50px;
          }

          #address {
            font-size: 18px;
            margin-right: 60px;
            letter-spacing: 2px;
          }

          .custom-button {
            font-size: 18px;
            background-color: transparent;
            border: none;
            color: inherit;
            letter-spacing: 1px;
            /* 添加你需要的其他样式 */
          }

          .custom-button:hover {
            color: #00c2ff;
            /* 悬停时的文本颜色 */
          }
        }

        .date {
          font-size: 18px;
          flex: 1;
          display: flex;
          font-family: PangMenZhengDao;
          color: #00c2ff;
          letter-spacing: 2px;
          font-weight: 600;


          // justify-content: space-around;
          li {
            display: inline-block;
            flex: 1;
            margin-right: 5px;
          }
        }

      }

    }

    .map {
      display: flex;
      flex-direction: column;
      padding: 0px 25px 10px 25px;
      margin-bottom: 23px;


      li {
        flex: 1;
        padding-top: 15px;
      }

      .demo-tabs {
        height: 220px;
        // background-color: #fff;
      }

      #satellite {
        // border-top: 2px solid rgb(28, 44, 64);

        // .demo-tabs>.el-tabs__content {
        //   padding: 32px;
        //   color: #6b778c;
        //   font-size: 32px;
        //   font-weight: 600;
        // }

        :deep(.el-tabs__item) {
          color: #FFFFFF;
        }

        /**选中 */
        :deep(.el-tabs__item.is-active) {
          color: #409EFF;
          opacity: 1;
        }

        /*去下划线 */
        :deep(.el-tabs__nav-wrap::after) {
          position: static !important;
        }

        /*去掉切换时el-tab-pane底部的蓝色下划线*/
        :deep(.el-tabs__active-bar) {
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

        :deep(.el-tabs__item) {
          color: #FFFFFF;

        }

        /**选中 */
        :deep(.el-tabs__item.is-active) {
          color: #409EFF;
          opacity: 1;
        }

        /*去下划线 */
        :deep(.el-tabs__nav-wrap::after) {
          position: static !important;
        }

        /*去掉切换时el-tab-pane底部的蓝色下划线*/
        :deep(.el-tabs__active-bar) {
          background-color: transparent !important;
        }

        ul li {
          display: inline-block;
          padding: 0;
          margin-left: 0;
        }
      }
    }

    .rBottom {
      display: flex;
      flex-direction: column;


      span {
        margin: 0 5px;
        height: 40px;
        line-height: 40px;
      }

      .area {
        margin-top: 10px;
      }

      .bird {
        width: 520px;
        height: 290px;
        // height: 100%;
        margin: 20px 0 0 20px;
        border: 1px solid #021757;
        background-color: #030636;
        margin-right: 5px;

        ul {
          display: flex;
          flex-wrap: wrap;
          padding-left: 60px;

          li {
            background-image: url('/cut/bird/bird4.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            width: 110px;
            height: 125px;
            margin: 0px 0 10px 20px;
            padding-bottom: 5px;
            /* 添加一些外边距，使元素分开显示 */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            /* 设置文字颜色为白色 */
            font-size: 14px;

          }
        }
      }
    }

  }


}
</style>
