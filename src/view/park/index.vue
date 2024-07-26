<template>
  <div class="container flex">
    <div class="left">
      <panelboard :chTitle="'公园简介'" :enTitle="'Park Introduction'">
        <div class="introduce">
          海湖湿地公园位于西宁市海晏路绿地云香郡北侧，公园内绿草繁盛，河道绵延，有休闲广场、桥栈、拱桥等景观，是一个集湿地保育、科普宣教、合理利用、管理服务等多功能与一体的湿地生态展示示范基地
        </div>
      </panelboard>
      <ul>
        <li class="flex-1 detection">
          <panelboard :chTitle="'水质监测'" :enTitle="'Water quality Monitoring'">
            <div class="monitarChart">
              <LineChart class="border" :dataList="waterDataList" :categories="waterCollectTimeList"
                :isExcellent="isWaterExcellent"></LineChart>
            </div>
          </panelboard>
        </li>
        <li class="flex-1">
          <panelboard :chTitle="'土壤监测'" :enTitle="'Soil Monitoring'">
            <div class="monitarChart">
              <!-- <PeopleChart class="border" ></PeopleChart> -->
              <LineChart class="border" :dataList="soilDataList" :categories="soilCollectTimeList"
                :isExcellent="isSoilExcellent"></LineChart>
            </div>
          </panelboard>
        </li>
        <li class="flex-1">
          <panelboard :chTitle="'环境监测'" :enTitle="'Environmental Monitoring'">
            <div class="monitarChart">
              <LineChart class="border" :dataList="envDataList" :categories="envCollectTimeList"
                :isExcellent="isEnvExcellent"></LineChart>
            </div>
          </panelboard>
        </li>
      </ul>

    </div>
    <div class="middle">
      <ul class="statisticTop flex">
        <li class="flex-1" v-for="(item, index) in statistic" :key="index"
          :style="{ backgroundImage: `url(${item.image})` }">
          <div style="  color: #00A3FF;margin-bottom: 5px;font-size: 18px;">{{ item.description }}</div>
          <div>
            <span style="font-size: 25px;margin-right: 5px; ">{{ item.quantity }}</span>
            <span style="font-size: 12px;">{{ item.unit }}</span>
          </div>
        </li>
      </ul>
      <div class="animal">
        <panelboard :chTitle="'视频监控'" :enTitle="'Video Surveillance'" style="margin-top:38px;">
          <div class="video-container">
            <!-- controls="controls" -->
            <div class="date-time">2024年06月15日 星期六 15:44:01</div>
            <video width="100%" height="100%" autoplay poster="../../assets/images/cut/bird/bird5.png">
              <source src="">
              你的浏览器不支持HTML5视频。
            </video>
          </div>
        </panelboard>
      </div>
      <ul class="statisticBottom">
        <!-- <li>
         
          <panelboard :chTitle="'监测数据'" :enTitle="'Monitoring data'">
            <div class="monitarChart">
              <MonitarChart id="monitarChart" :dataList="monitorData"></MonitarChart>
            </div>
          </panelboard>
        </li> -->
        <li>

          <panelboard :chTitle="'野生鸟类种类'" :enTitle="'Wild bird species'">
            <div class="monitarChart" style="margin-right: 20px;">
              <mvcProgress :dataList="birdList"></mvcProgress>
            </div>
          </panelboard>
        </li>
        <li>

          <panelboard :chTitle="'种群趋势分析'" :enTitle="'Population trend analysis'">
            <div class="monitarChart">
              <PopulationChart :dataList></PopulationChart>
            </div>
          </panelboard>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="rTop">
        <panelboard :chTitle="'城市时间'" :enTitle="'City Time'">
          <div class="weather">
            <div class="picture">
              <img src="@/assets/images/xining.jpg" alt="">
            </div>
            <div class="fontsize">
              <div class="city">
                <ul>
                  <li id="address">西宁城西</li>
                  <!-- <li><el-button class="custom-button">[切换城市]</el-button>
                  </li> -->
                </ul>
              </div>
              <div class="date">
                <ul>
                  <!-- <li>{{ date }}</li>
                  <li>{{ week }}</li>
                  <li>{{ time }}</li> -->
                  <li>今日空气质量优</li>
                  <li>今日气温适宜</li>
                  <li>今日水质良好</li>
                  <li>今日土壤指标正常</li>
                </ul>
              </div>
            </div>
          </div>
        </panelboard>
      </div>
      <div class="rMiddle">
        <panelboard :chTitle="'地区摄像'" :enTitle="'Regional Photography'">
          <ul class="map">
            <li id="satellite">
              <span style="font-size: 22px;">摄像头</span>
              <div>
                <el-tabs v-model="activeName1" class="demo-tabs" @tab-click="handleClick1">
                  <el-tab-pane label="生态停车场" name="park1">
                    <div style="height: 210px;">
                      <img src="../../assets/images/v2_sah5y2.png" style="width: 100%;height: 100%;">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="卫生间" name="toilet1">
                    <div style="height: 210px;">
                      <img src="../../assets/images/v2_sah5y2.png" style="width: 100%;height: 100%;">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="石笼坝" name="shilongba1">
                    <div style="height: 210px;">
                      <img src="../../assets/images/v2_sah5y2.png" style="width: 100%;height: 100%;">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="沙湖" name="shahu">
                    <div style="height: 210px;">
                      <img src="../../assets/images/v2_sah5y2.png" style="width: 100%;height: 100%;">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="双湖佳境" name="shuanghu">
                    <img src="../../assets/images/v2_sah5y2.png" style="width: 100%;height: 100%;">
                  </el-tab-pane>
                </el-tabs>
              </div>
            </li>
          </ul>
        </panelboard>

      </div>
      <div class="rBottom">
        <panelboard :chTitle="'监测数据'" :enTitle="'Monitoring data'">
          <div class="flex area" style="margin-top: 10px;">
            <div>
              <span style="margin-right: 10px;font-size: 18px;">设备对比:</span>
              <el-dropdown @command="handleFirstDropdown" class="leading-10 h-10">
                <span class="el-dropdown-link">
                  <span style="margin-right: 10px;">{{ firstSelected }}</span>
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu style="background-color:#030636;max-height: 200px; overflow-y: scroll; scrollbar-width: none; -ms-overflow-style: none;">
                    <el-dropdown-item v-for="item in firstOptions" :key="item.id" :command="item.id"
                      @mouseover="handleMouseOver($event)" @mouseleave="handleMouseLeave($event)"
                      style="color:#ffffff;">
                      {{ item.name }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <span>—</span>
              <el-dropdown @command="handleSecondDropdown" class="leading-10 h-10">
                <span class="el-dropdown-link" style="margin-left: 10px;">
                  <span style="margin-right: 10px;">{{ secondSelected }}</span>
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu style="background-color:#030636;max-height: 200px; overflow-y: auto;">
                    <el-dropdown-item v-for="item in secondOptions" :key="item.id" :command="item.id" @mouseover="handleMouseOver($event)" @mouseleave="handleMouseLeave($event)"
                      style="color:#ffffff">
                      {{ item.name }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="monitarChart">
            <BarChart :dataList="waterCompData" :categories="valueList" :isExcellent="isWaterComExcellent"
              :devicesList="devicesList"></BarChart>
          </div>
        </panelboard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useDataStore } from '@/store/modules/data.js'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import moment from 'moment'
import "moment/dist/locale/zh-cn";
import { getWaterEquipmentList } from '@/api/index.js'
import MonitarChart from './monitar.vue'
import BirdChart from './wildBird.vue'
import PopulationChart from './population.vue'
import PeopleChart from './people.vue'
import LineChart from './line.vue'
import BarChart from './bar.vue'
import AirChart from './air.vue'
import Freehand from './freehand.vue'
import Satellite from './satellite.vue'

import panelboard from "@/components/panelboard/index.vue"
import mvcProgress from "./components/mvc-progress.vue"


let monitorData = ref([
  { name: '监测次数', data: [842, 512, 632, 342, 958] },
  { name: '识别次数', data: [88, 232, 376, 312, 654] },
])
let statistic = ref([
  {
    description: '总面积',
    quantity: '120',
    unit: '公顷',
    image: '/cut/rect.png'
  },
  {
    description: '人流量',
    quantity: '5675',
    unit: '人',
    image: '/cut/rect.png'
  },
  {
    description: '野生动物种类',
    quantity: '800',
    unit: '种',
    image: '/cut/rect.png'
  },
  {
    description: '设备',
    quantity: '3000',
    unit: '台',
    image: '/cut/rect.png'

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
const birdList = ref([
  {
    name: "黑水鸭",
    value: 200,
  }, {
    name: "绿头鸭",
    value: 100,
  }, {
    name: "班头鸭",
    value: 400,
  }, {
    name: "白骨顶",
    value: 300,
  }, {
    name: "灰燕",
    value: 200,
  }, {
    name: "刺麻鸭",
    value: 140,
  }
])
let date = ref(moment().format('YYYY年MM月DD日'))
let week = ref(moment().format('dddd'))
let timer = ref(0)
//存储当前时间
let time = ref(moment().format('h:mm:ss '))
//卫星图手绘图数据
const activeName1 = ref('park1')
const activeName2 = ref('park2')


//种群趋势图表数据
const populationList = ref([])

//图表数据定义
let intervalId = null;
let isFetching = false;
const params = ref({
  timeType: null,
  number: 4
})
//设置请求参数
const setParams = (type, number) => {
  params.value.timeType = type
  params.value.number = number
}
//水质对比参数
const waterComParams = ref({
  edId1: null,
  edId2: null
})
const firstOptions = ref([
  // { id: 1, name: '设备1' },
  // { id: 2, name: '设备2' },
  // { id: 3, name: '设备3' },
  // Add more options here
],)
const secondOptions = ref(
  [
    // { id: 1, name: '设备1' },
    // { id: 2, name: '设备2' },
    // { id: 3, name: '设备3' },
    // Add more options here
  ],
)
const firstSelected = ref(null)
const secondSelected = ref(null)
const equipmentType = ref({
  Type: 2
})
const handleMouseOver = (event) => {
  event.target.style.backgroundColor = '#223e87'; // 更改背景颜色
}
const handleMouseLeave = (event) => {
  event.target.style.backgroundColor = ''; // 恢复默认背景颜色
}
const fetchOptions = async () => {
  try {
    const res = await getWaterEquipmentList(equipmentType.value);
    const data = res.data
    firstOptions.value = data;
    secondOptions.value = data;
    // 默认选择第一项和第二项
    if (data.length > 0) {
      firstSelected.value = data[0].name;
      waterComParams.value.edId1 = data[0].id;
    }
    if (data.length > 1) {
      secondSelected.value = data[1].name;
      waterComParams.value.edId2 = data[1].id;
    }
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};
const handleFirstDropdown = (command) => {
  const selectedOption = firstOptions.value.find((option) => option.id === command);
  // if (selectedOption.id === waterComParams.value.edId2) {
  //   ElMessage.error('不能选择相同的设备');
  //   return;
  // }
  firstSelected.value = selectedOption.name;
  waterComParams.value.edId1 = selectedOption.id;

};

const handleSecondDropdown = async (command) => {
  const selectedOption = secondOptions.value.find((option) => option.id === command);
  if (selectedOption.id === waterComParams.value.edId1) {
    ElMessage.error('不能选择相同的设备');
    return;
  }
  secondSelected.value = selectedOption.name;
  waterComParams.value.edId2 = selectedOption.id;
  await fetchWaterComData();
};
const fetchWaterComData = async () => {
  await store.getWaterComData(waterComParams.value);
  mappingWaterCom(store.waterComData.value);
};
//水数据
const waterDataList = ref({
  waterPHList: [], //PH值
  waterDissolvedOxygenList: [], //溶解氧值
  waterTurbidityList: [],  //浊度
  waterTemperatureList: [], //水温
  waterChlorophyllList: [], //叶绿素
  waterConductivityList: [],//导电率
  //  waterCollectTimeList:[]
})
const isWaterExcellent = ref([])
const waterCollectTimeList = ref([])
//土壤数据
const soilDataList = ref({
  soilPHList: [], //土壤PH值
  soilTemperatureList: [], //土壤温度
  soilMoistureList: [],  //土壤水分
  soilConductivityList: [], //土壤电导率
  soilNitrogenList: [], //土壤氮含量
  soilPhosphorusList: [],//土壤磷含量
  soilPotassiumList: [],//土壤钾含量
})
const isSoilExcellent = ref([])
const soilCollectTimeList = ref([])
//环境数据
const envDataList = ref({
  airTemperatureList: [], //空气温度
  airHumidityList: [], //空气湿度
  pm25List: [],//PM2.5
  atmosphericPressureList: [], //气压
  carbonDioxideList: [], //二氧化碳
  sulfurDioxideList: [],//二氧化硫
  totalRadiationList: [],//总辐射
  windDirectionList: [],//风向
  windSpeedList: [],//风速
  rainfallList: [],//降雨量

})
const isEnvExcellent = ref([])
const envCollectTimeList = ref([])
//双设备对比数据
const waterCompData = ref({
  devices1List: [],
  devices2List: [],
})
const devicesList = ref([])
const isWaterComExcellent = ref([])
const valueList = ref([])
//映射水数据
const mappingWater = (waterData) => {

  waterCollectTimeList.value = waterData.collectTimeList;
  isWaterExcellent.value = waterData.mapList
  waterDataList.value.waterPHList = waterData.pHList;
  waterDataList.value.waterDissolvedOxygenList = waterData.doList;
  waterDataList.value.waterTemperatureList = waterData.wtList;
  waterDataList.value.waterConductivityList = waterData.wcList;
  waterDataList.value.waterTurbidityList = waterData.tList;
  waterDataList.value.waterChlorophyllList = waterData.cList;
}
//映射土壤数据
const mappingSoil = (soilData) => {
  soilCollectTimeList.value = soilData.collectTimeList;
  isSoilExcellent.value = soilData.mapList
  soilDataList.value.soilPHList = soilData.pHList;
  soilDataList.value.soilTemperatureList = soilData.stList;
  soilDataList.value.soilMoistureList = soilData.smList;
  soilDataList.value.soilConductivityList = soilData.scList;
  soilDataList.value.soilNitrogenList = soilData.sncList;
  soilDataList.value.soilPhosphorusList = soilData.sphcList;
  soilDataList.value.soilPotassiumList = soilData.spocList;
}
//映射环境数据
const mappingEnv = (envData) => {
  envCollectTimeList.value = envData.collectTimeList;
  isEnvExcellent.value = envData.mapList
  envDataList.value.airTemperatureList = envData.airTemperatureList;
  envDataList.value.airHumidityList = envData.airHumidityList;
  envDataList.value.pm25List = envData.pm2_5List;
  envDataList.value.atmosphericPressureList = envData.atmosphericPressureList;
  envDataList.value.carbonDioxideList = envData.carbonDeviceList;
  envDataList.value.sulfurDioxideList = envData.sulfurDioxideList;
  envDataList.value.totalRadiationList = envData.totalRadiationList;
  envDataList.value.windDirectionList = envData.windDirection360List;
  envDataList.value.windSpeedList = envData.windSpeedList;
  envDataList.value.rainfallList = envData.rainList;

}
//映射双设备对比数据
const mappingWaterCom = (waterComData) => {
  if (waterComData == null) {
    valueList.value = []
    isWaterComExcellent.value = []
    devicesList.value = []
    waterCompData.value.devices1List = []
    waterCompData.value.devices2List = []
  } else {
    valueList.value = waterComData.valueList
    isWaterComExcellent.value = waterComData.strList
    devicesList.value = waterComData.devicesList
    waterCompData.value.devices1List = waterComData.devices1List
    waterCompData.value.devices2List = waterComData.devices2List
  }

}
const store = useDataStore(); // 使用 Pinia store
//组件挂载完毕更新当前的事件
const fetchData = async () => {
  if (isFetching) return; // 如果正在获取数据，直接返回
  isFetching = true; // 标记正在获取数据


  try {
    await Promise.all([
      setParams(null, 5),
      store.getWaterData(params.value),
      store.getSoilData(params.value),
      store.getEnvironmentData(params.value),
      // store.getWaterComData(waterComParams.value),
      fetchOptions()

    ]);
    if (waterComParams.value.edId1 && waterComParams.value.edId2) {
      await fetchWaterComData();
    }
    mappingWater(store.waterData.value)
    mappingSoil(store.soilData.value)
    mappingEnv(store.envData.value)
    // mappingWaterCom(store.waterComData.value)

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching = false; // 请求完成，重置标志
  }

};
const startPolling = async () => {
  fetchData(); // 初始加载数据

  intervalId = setInterval(fetchData, 3 * 60000); // 每隔3分钟秒获取一次数据
  // intervalId = setInterval(fetchData, 30000); // 每隔3分钟秒获取一次数据
};
const stopPolling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};
onMounted(() => {
  startPolling();

  timer.value = setInterval(() => {
    time.value = moment().format('h:mm:ss ')
  }, 1000)




});
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
onUnmounted(() => {
  stopPolling();

});

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

  :deep(.custom-dropdown-item:hover) {
    background-color: #1e2a4a;
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

        div {}

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

      .video-container {
        position: relative;
        width: 100%;
        height: 460px;
        padding-top: 10px;

        // border:1px dashed grey;
        .date-time {
          position: absolute;
          left: 40px;
          top: 37px;
          color: #fff;
          font-size: 25px;
        }
      }

    }

    .statisticBottom {
      flex: 1;
      display: flex;
      // padding-top: 10px;
      height: 200px;
      padding: 0 0px 0 30px;

      // margin-top: 0px;
      li {
        flex: 1;
        display: inline-block;
        // margin: 0 10px;

        .border {
          border: 1px solid #021f66;
          margin: 0 5px;
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

          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          // justify-content: space-around;
          // li {
          //   display: inline-block;
          //   flex: 1;
          //   margin-right: 5px;
          // }
        }

      }

    }

    .map {
      display: flex;
      flex-direction: column;
      padding: 0px 25px 0px 25px;
      margin-bottom: 60px;

      li {
        flex: 1;
        padding-top: 15px;
      }

      .demo-tabs {
        height: 220px;
        // background-color: #fff;
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