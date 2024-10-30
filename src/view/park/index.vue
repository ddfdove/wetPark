<template>
  <div class="container flex">
    <div class="left">
      <panelboard :chTitle="`${parkStore.parkIntroduce.title}简介`">
        <div class="introduce">
          {{ parkStore.parkIntroduce.introduce }}
        </div>
      </panelboard>
      <ul>
        <li>
          <panelboard :chTitle="'水质监测'" :enTitle="'Water quality Monitoring'">
            <div class="monitarChart">
              <LineChart :dataList="{
                waterPHList: waterChartData.dataList.waterPHList, waterDissolvedOxygenList: waterChartData.dataList.waterDissolvedOxygenList,
                waterTurbidityList: waterChartData.dataList.waterTurbidityList, waterTemperatureList: waterChartData.dataList.waterTemperatureList
              }" :categories="waterChartData.waterCollectTimeList" :isExcellent="waterChartData.isWaterExcellent"
                height="190">
              </LineChart>
            </div>
          </panelboard>
        </li>
        <li>
          <panelboard :chTitle="'土壤监测'" :enTitle="'Soil Monitoring'">
            <div class="monitarChart">
              <LineChart :dataList="{
                soilPHList: soilChartData.dataList.soilPHList, soilTemperatureList: soilChartData.dataList.soilTemperatureList,
                soilMoistureList: soilChartData.dataList.soilMoistureList, soilConductivityList: soilChartData.dataList.soilConductivityList
              }" :categories="soilChartData.soilCollectTimeList" :isExcellent="soilChartData.isSoilExcellent"
                height="190">
              </LineChart>
            </div>
          </panelboard>
        </li>
        <li>
          <panelboard :chTitle="'环境监测'" :enTitle="'Environmental Monitoring'">
            <div class="monitarChart">
              <LineChart :dataList="{
                airTemperatureList: envChartData.dataList.airTemperatureList, airHumidityList: envChartData.dataList.airHumidityList,
                pm25List: envChartData.dataList.pm25List, atmosphericPressureList: envChartData.dataList.atmosphericPressureList
              }" :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent" height="190">
              </LineChart>
            </div>
          </panelboard>
        </li>
      </ul>
    </div>
    <div class="middle">
      <div class="statisticTop">
        <panelboard :chTitle="'数据统计'" :enTitle="'Statistics'">
          <ul>
            <li class="flex-1" v-for="(item, index) in stats" :key="index"
              :style="{ backgroundImage: `url('/cut/rect.png')` }">
              <div style="  color: #00A3FF;margin-bottom: 10px;font-size: 22px;">{{ item.label }}</div>
              <div>
                <span style="font-size: 30px;margin-right: 5px; ">{{ item.value }}</span>
                <span style="font-size: 14px;">{{ item.unit }}</span>
              </div>
            </li>
          </ul>
        </panelboard>
      </div>
      <div class="surveillance">
        <panelboard :chTitle="'视频监控'" :enTitle="'Video Surveillance'">
          <div class="video-container" ref="videoContainer" style="position: relative;">
            <Video1 :cameraIndexCode="videoCode" :id="'prefix-' + videoCode.slice(0, 5) + '-' + index"
              :width="videoWidth" :height="videoHeight"></Video1>
            <!-- <H5Video :id="`video`+String(videoCode.slice(0,5))" :playUrl="videoSrc" :width="videoWidth" :height="videoHeight"></H5Video> -->
          </div>
        </panelboard>
      </div>
      <div class="statisticBottom">
        <ul>
          <li>
            <panelboard :chTitle="'野生鸟类种类'" :enTitle="'Wild bird species'">
              <div class="monitarChart" style="margin-right: 20px;height: 260px;">
                <mvcProgress :dataList="parkWildBirds"></mvcProgress>
              </div>
            </panelboard>
          </li>
          <li>
            <panelboard :chTitle="'种群趋势分析'" :enTitle="'Population trend analysis'">
              <div class="monitarChart">
                <PopulationChart :dataList="birdsPopulation"></PopulationChart>
              </div>
            </panelboard>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <button class="moreButton" @click=" router.push({ path: '/' })">
        <i class="iconfont icon-gengduoshuangjiantou" style="margin-right: 8px;"></i>
        <span>回到首页</span>
      </button>

      <div class="rTop">
        <panelboard :chTitle="'城市时间'" :enTitle="'City Time'">
          <div class="weather">
            <div class="picture">
              <img src="@/assets/images/xining.jpg" alt="">
            </div>
            <div class="details">
              <div class="city-time">
                <ul>
                  <li id="address">{{ weather.city }}</li>
                  <li id="date">{{ date }}</li>
                  <li id="week">{{ week }}</li>
                  <li id="time">{{ time }}</li>
                </ul>
              </div>
              <div class="weather-info">
                <ul>
                  <li><i class="fas fa-thermometer-half"></i> 温度：<span style="font-size:22px">{{ weather.temperature
                      }}</span>℃&nbsp({{ weather2[0].nighttemp
                    }}-{{ weather2[0].daytemp }}℃)</li>
                  <li><i class="fa fa-sun"></i>天气：{{ weather.weather }}</li>
                  <li><i class="fa fa-water"></i> 湿度：{{ weather.humidity }}%</li>
                  <li><i class="fa fa-location-arrow"></i> 风向：{{ weather.winddirection }}</li>
                  <li><i class="fa fa-smog"></i>PM2.5: {{ averagePM25 }} &nbsp{{ airQuality }} </li>
                </ul>
              </div>
            </div>
          </div>
        </panelboard>
      </div>
      <div class="rMiddle">

        <panelboard :chTitle="'地区摄像'" :enTitle="'Regional Photography'">

          <div class="photography">
            <el-button type="primary" @click="downloadFile"
              style="position:absolute;top:-50px;right:20px;background: #021f66;border:none">下载视频插件</el-button>
            <div>
              <!-- <div class="video-grid">
                单独展示第一个视频
                <div v-if="SurveillanceVideo && SurveillanceVideo.length > 0">
                  <div ref="cameraContainer" style="height:80%;width:100%">
                    <Video :cameraIndexCode="SurveillanceVideo[0].cameraIndexCode" :id="0" :width="cameraWidth"
                      :height="cameraHeight"></Video>
                  </div>
                  <p style="font-size: 13px;cursor: pointer;margin-top:5px">{{ SurveillanceVideo[0].name }}</p>
                </div>

                遍历展示其余视频
                <div v-for="(source, index) in SurveillanceVideo.slice(1)" :key="index + 1">
                  <div style="height:80%;width:100%">
                    <Video :cameraIndexCode="source.cameraIndexCode" :id="index + 1" :width="cameraWidth"
                      :height="cameraHeight"></Video>
                  </div>
                  <p @click="handleItemClick(source, index + 1)" style="font-size: 13px;cursor: pointer;margin-top:5px">
                    {{ source.name }}</p>
                </div>
              </div> -->
              <div class="video-grid">
                <div v-for="(source, index) in SurveillanceVideo" :key="index" class="video-item">
                  <div :ref="el => caemraContainers[index] = el" style="height:80%;width:100%">
                    <Video :cameraIndexCode="source.cameraIndexCode" :id="index" :width="cameraWidth"
                      :height="cameraHeight"></Video>
                  </div>
                  <p @click="handleItemClick(source, index)" style="font-size: 13px;cursor: pointer;margin-top:5px">
                    {{ source.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </panelboard>
      </div>
      <div class="rBottom">
        <panelboard :chTitle="'监测数据'" :enTitle="'Monitoring data'">
          <div class="flex ">
            <div>
              <span style="margin-right: 10px;font-size: 16px;">设备对比:</span>
              <el-dropdown @command="handleFirstDropdown" class="leading-10 h-10">
                <span class="el-dropdown-link">
                  <span style="margin-right: 10px;">{{ firstSelected }}</span>
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu
                    style="background-color:#030636;max-height: 180px; overflow-y: scroll; scrollbar-width: none; -ms-overflow-style: none;">
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
                    <el-dropdown-item v-for="item in secondOptions" :key="item.id" :command="item.id"
                      @mouseover="handleMouseOver($event)" @mouseleave="handleMouseLeave($event)" style="color:#ffffff">
                      {{ item.name }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div>
            <CylinderChart :dataList="waterCompData" :categories="valueList" :isExcellent="isWaterComExcellent"
              :devicesList="devicesList"></CylinderChart>
          </div>
        </panelboard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount, computed, nextTick } from 'vue'
import axios from 'axios';
import { getWaterEquipmentList, getCameraEquipments, getBirds, getBirdsBybType, getMonitorEquipment, getWildBirds } from '@/api/index.js'
import * as mapping from '@/utils/mapping.js'
import { useRoute, useRouter } from 'vue-router';
import { useDataStore } from '@/store/modules/data.js'
import { useParkStore } from '@/store/modules/park.js'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import moment from 'moment'
import "moment/dist/locale/zh-cn";


import PopulationChart from './components/population.vue'
// import LineChart from './components/line.vue'
import LineChart from '@/components/chart/line.vue'
// import BarChart from '@/components/chart/bar.vue'
import CylinderChart from '@/components/chart/cylinder.vue'
import panelboard from "@/components/panelboard/index.vue"
import mvcProgress from "@/components/chart/mvc-progress.vue"
import Video from './components/video.vue'
import Video1 from './components/video1.vue'

const store = useDataStore(); // 使用 Pinia store
const parkStore = useParkStore()
const route = useRoute();
const router = useRouter();


//左侧图表参数定义
let intervalId = null;  //定时器清除id
let isFetching = false;  //是否正在获取数据
let timer = ref(0)   //清除定时器传的时间
//请求水质土壤环境图表的参数
const params = ref({
  timeType: 4,
  number: 4,
  parkId: 1
})
//水质图表数据
const waterChartData = ref({
  dataList: {
    waterPHList: [], //PH值
    waterDissolvedOxygenList: [], //溶解氧值
    waterTurbidityList: [],  //浊度
    waterTemperatureList: [], //水温
    waterChlorophyllList: [], //叶绿素
    waterConductivityList: [],//导电率
    //  waterCollectTimeList:[]
  },
  isWaterExcellent: [],
  waterCollectTimeList: []
})
//土壤图标数据
const soilChartData = ref({
  dataList: {
    soilPHList: [], //土壤PH值
    soilTemperatureList: [], //土壤温度
    soilMoistureList: [],  //土壤水分
    soilConductivityList: [], //土壤电导率
    soilNitrogenList: [], //土壤氮含量
    soilPhosphorusList: [],//土壤磷含量
    soilPotassiumList: [],//土壤钾含量
  },
  isSoilExcellent: [],
  soilCollectTimeList: []
})
//环境图表数据
const envChartData = ref({
  dataList: {
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
  },
  isEnvExcellent: [],
  envCollectTimeList: []
})

//数据统计园区面积
const parkArea = ref('120')
//数据统计园区人流量
const parkTraffic = ref('5765')
//数据统计野生动物种类
const birdParams = ref({
  parkId: 1
})
const parkBirds = ref(0)
//数据统计园区设备
const monitorParams = ref({
  parkId: 1
})
const parkEquirments = ref(0)
// 统计项数组
const stats = ref([
  { label: '总面积', value: parkArea.value, unit: '公顷' },
  { label: '人流量', value: parkTraffic.value, unit: '人' },
  { label: '野生动物种类', value: parkBirds.value, unit: '种' },
  { label: '设备', value: parkEquirments.value, unit: '台' }
]);
//视频监控海康插件宽度
const videoWidth = ref(760)
//视频监控海康插件高度
const videoHeight = ref(443)
//获取海康
const videoContainer = ref(null)
//地区摄像海康插件宽度
const cameraWidth = ref(155)
//地区摄像海康插件高度
const cameraHeight = ref(72)
const cameraContainer = ref(null);
const caemraContainers = ref([]);

//野生鸟类种类数据
const parkWildBirds = ref([
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
//种群趋势分析数据
const birdsPopulation = ref([])

//右侧城市时间数据
//右侧城市时间格式化时间
let date = ref(moment().format('YYYY年MM月DD日'))
let week = ref(moment().format('dddd'))
//存储当前时间
let time = ref(moment().format('h:mm:ss '))
//天气相关数据
const weatheKkey = ref('f89095713ad2705c9308afbe0e535127');
const weather = ref({
  province: "青海",
  city: "西宁市",
  adcode: "630100",
  weather: "",      //天气状况，例如晴、阴、雨、雪等。
  temperature: "",  //天气状况，例如晴、阴、雨、雪等。
  winddirection: "",  //风向，表示风从哪个方向吹来，例如东风、西风等。
  windpower: "",  //风力，表示风的强度，例如轻风、微风、强风等，通常用级别表示。
  humidity: "",  //湿度，以百分比表示的空气湿度，表示空气中水汽的含量。
  reporttime: "", //报告时间，表示天气数据的更新时间。
  temperature_float: "",  //浮动温度，通常用于表示最高温度和最低温度之间的范围。
  humidity_float: "",  //浮动湿度，表示湿度的变化范围，例如一天中的最高和最低湿度。
  temperatureSuitability: '',
});
const weather2 = ref([
  {
    "date": "2024-07-30",
    "week": "2",
    "dayweather": "多云",
    "nightweather": "晴",
    "daytemp": "25",
    "nighttemp": "8",
    "daywind": "北",
    "nightwind": "北",
    "daypower": "1-3",
    "nightpower": "1-3",
    "daytemp_float": "25.0",
    "nighttemp_float": "8.0"
  },
  {
    "date": "2024-07-31",
    "week": "3",
    "dayweather": "晴",
    "nightweather": "晴",
    "daytemp": "28",
    "nighttemp": "14",
    "daywind": "北",
    "nightwind": "北",
    "daypower": "1-3",
    "nightpower": "1-3",
    "daytemp_float": "28.0",
    "nighttemp_float": "14.0"
  },

]);
//天气图标
const iconCondition = ref(null); // icon值
const averagePM25 = ref(2.8)  //pm平均值
const airQuality = ref('空气质量优秀')  //空气指数
//地区摄像视频监控数据
//摄像头监控参数
const cameraParams = ref({
  protocol: 'rtsp'
})
const SurveillanceVideo = ref([])
const videoSrc = ref("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
const videoCode = ref('9dd014fd77964be29b236769949dfbdf')
//右侧水质设备对比的下拉框的数据定义
//水质双设备对比参数
const waterComParams = ref({
  edId1: null,
  edId2: null,
  parkId: 1
})
//双设备对比数据
const waterCompData = ref({
  devices1List: [],
  devices2List: [],
})
const devicesList = ref([])
const isWaterComExcellent = ref([])
const valueList = ref([])
const firstOptions = ref([])
const secondOptions = ref([])
const firstSelected = ref(null)
const secondSelected = ref(null)
const equipmentType = ref({
  Type: 2,
  parkId: 1
})

//获取园区介绍
const getParkIntroduce = async () => {
  const id = route.query.id;
  if (id) {
    await parkStore.setParkId(id)
  }
  parkStore.getParkIntroduce();
  params.value.parkId = parkStore.parkId
  equipmentType.value.parkId = parkStore.parkId
  waterComParams.value.parkId = parkStore.parkId
  birdParams.value.parkId = parkStore.parkId
  monitorParams.value.parkId = parkStore.parkId
};
//设置水质土壤环境图表的请求参数
const setParams = (type, number) => {
  params.value.timeType = type
  params.value.number = number
}
// 更新统计项值
const updateStats = () => {
  stats.value[2].value = parkBirds.value || 0; // 更新鸟类数量
  stats.value[3].value = parkEquirments.value;  // 更新设备数量
}
//获取园区展示中间动物种类
const getParkBirds = async () => {
  try {
    const res = await getBirds(birdParams.value);
    parkBirds.value = res.data;
    updateStats();
  } catch (error) {
    console.error("获取鸟类数据失败:", error);
  }
}
//获取园区展示设备总数
const getParkEquirments = async () => {
  try {
    const res = await getMonitorEquipment(monitorParams.value);
    if (res.code === 0) {
      const totalDeviceCount = res.data.reduce((count, category) => {
        if (category.tvdata) {
          count += category.tvdata.length;
        }
        if (category.data) {
          category.data.forEach(subCategory => {
            if (subCategory.detail) {
              count += subCategory.detail.length;
            }
          });
        }
        return count;
      }, 0);

      parkEquirments.value = totalDeviceCount;
      updateStats();
    } else {
      console.error("获取设备数据失败:", res.msg);
    }
  } catch (err) {
    console.error("请求失败", err);
  }
}

//根据页面的放大缩小自动获取海康插件的宽高
const updateVideoDimensions = async () => {
  await nextTick();
  if (videoContainer.value) {
    // console.log('videoContainer.value', videoContainer.value);
    const rect = videoContainer.value.getBoundingClientRect()
    videoWidth.value = Math.max(Math.floor(rect.width)) // 保证最小宽度为 100
    videoHeight.value = Math.max(Math.floor(rect.height)) // 保证最小高度为 100
    // console.log('videoHeight.value', videoHeight.value);
  }

  // if (cameraContainer.value) {
  //   console.log('进来了');
  //   console.log('cameraContainer.value', cameraContainer.value);
  //   const rect = cameraContainer.value.getBoundingClientRect();
  //   cameraWidth.value = Math.floor(rect.width);
  //   cameraHeight.value = Math.floor(rect.height);
  //   console.log('cameraHeight.value', cameraHeight.value);
  // }
  caemraContainers.value.forEach((container) => {
    if (container) {
      // console.log('container', container);
      const rect = container.getBoundingClientRect();
      cameraWidth.value = Math.max(Math.floor(rect.width)); // 保证最小宽度为 100
      cameraHeight.value = Math.max(Math.floor(rect.height)); // 保证最小高度为 100
      // console.log('Updated cameraWidth:', cameraWidth.value, 'cameraHeight:', cameraHeight.value);
    }
  });
}
//获取园区展示野生鸟类种类
const getParkWildBirds = async () => {
  try {
    const res = await getWildBirds()
    if (res.code == 0) {
      parkWildBirds.value = res.data.slice(0, 6).map((item) => {
        return {
          name: item.acname,
          value: item.bid,
          type: item.protectionLevel
        }
      })
    }
  } catch (error) {

  }
}
//获取园区展示种群趋势分析
const getBirdsPopulation = async () => {
  await getBirdsBybType()
  try {
    const res = await getBirdsBybType()
    if (res.code == 0) {
      birdsPopulation.value = res.data

    }
  } catch (error) {
    console.error("请求失败", err);
  }
}

//天气相关函数
// 设置icon
const setWeatherIcon = (weather) => {
  // 只处理了基础的天气，可以继续精细化处理
  if (weather === '晴') {
    return 'clear-day';
  } else if (weather.includes('云')) {
    return 'partly-cloudy-day';
  } else if (weather.includes('风')) {
    return 'wind';
  } else if (weather.includes('雨')) {
    return 'rain';
  } else if (weather.includes('雪')) {
    return 'snow';
  } else if (weather.includes('雾')) {
    return 'fog';
  }
  return 'cloudy';
};
// 获取天气详情
const getWeather = async () => {
  const params = {
    key: weatheKkey.value,
    city: 630100,
    extensions: 'base'
  };
  const params2 = {
    key: weatheKkey.value,
    city: 630100,
    extensions: 'all'
  };

  try {
    const response1 = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', { params });
    if (response1.data.lives && response1.data.lives.length > 0) {
      weather.value = response1.data.lives[0];
      iconCondition.value = setWeatherIcon(response1.data.lives[0]?.weather);
    }
  } catch (error) {
    console.error('获取实时天气信息失败', error);
  }

  try {
    const response2 = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', { params: params2 });
    if (response2.data.forecasts && response2.data.forecasts.length > 0) {
      weather2.value = response2.data.forecasts[0].casts;
    }
  } catch (error) {
    console.error('获取天气预报信息失败', error);
  }
};
//pm2.5指数
const calculateAveragePM25 = (pm25List) => {
  if (pm25List.length === 0) return 0;
  const total = pm25List.reduce((sum, value) => sum + value, 0);
  const average = total / pm25List.length;
  return average.toFixed(2); // 保留两位小数
}
//根据pm2.5指数判断空气质量
const getAirQuality = (pm25Average) => {
  if (pm25Average <= 35) {
    return '空气质量优秀';
  } else if (pm25Average <= 75) {
    return '空气质量良好';
  } else if (pm25Average <= 115) {
    return '空气轻度污染';
  } else if (pm25Average <= 150) {
    return '空气中度污染';
  } else if (pm25Average <= 250) {
    return '空气重度污染';
  } else {
    return '空气严重污染';
  }
}

//点击右侧监控视频中间展示放大
const handleItemClick = (source, index) => {
  videoCode.value = source.cameraIndexCode
  videoSrc.value = source.url
};
//获取地区摄像监控视频摄像头设备列表
const getCameraEquipmentList = async (params) => {
  try {
    const res = await getCameraEquipments(params);
    if (res.code == 0) {
      SurveillanceVideo.value = res.data.map((item, index) => {
        return {
          url: item.url,
          cameraIndexCode: item.cameraIndexCode,
          name: item.cameraName
        }
      });
      if (SurveillanceVideo.value.length > 0) {
        videoCode.value = SurveillanceVideo.value[0].cameraIndexCode;
        videoSrc.value = SurveillanceVideo.value[0].url;
      }
    } else {
      console.log(res.msg);
    }
  } catch (err) {
    console.error("请求失败", err);
    // 处理请求失败的情况
  }

}
const downloadFile = () => {
  const downloadUrl = "http://111.12.140.2:13338/VideoWebPlugin.exe";
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "VideoWebPlugin.exe"; // 可选，指定下载文件名
  link.click();
};
//双设备对比相关函数
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

//组件挂载完毕更新当前的事件
const fetchData = async () => {
  if (isFetching) return; // 如果正在获取数据，直接返回
  isFetching = true; // 标记正在获取数据

  try {
    await Promise.all([
      getWeather(),
      setParams(4, 5),
      store.getWaterData(params.value),
      store.getSoilData(params.value),
      store.getEnvironmentData(params.value),
      getBirdsPopulation(),
      getParkWildBirds(),
      fetchOptions(),
      getParkBirds(),
      getParkEquirments(),

    ]);
    mapping.mappingWater(store.waterData.value, waterChartData.value)
    mapping.mappingSoil(store.soilData.value, soilChartData.value)
    mapping.mappingEnv(store.envData.value, envChartData.value)
    if (waterComParams.value.edId1 && waterComParams.value.edId2) {
      await fetchWaterComData();
    }
    averagePM25.value = calculateAveragePM25(envChartData.value.dataList.pm25List);
    airQuality.value = getAirQuality(averagePM25.value);

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching = false; // 请求完成，重置标志
  }

};
const startPolling = async () => {
  fetchData(); // 初始加载数据

  // intervalId = setInterval(fetchData, 3 * 60000); // 每隔3分钟秒获取一次数据
  intervalId = setInterval(fetchData, 10000); // 每隔10秒获取一次数据
};
const stopPolling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onMounted(async () => {
  getParkIntroduce()
  startPolling()
  await getCameraEquipmentList(cameraParams.value)
  updateVideoDimensions(); // 更新尺寸
  window.addEventListener('resize', updateVideoDimensions)
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
      height: 145px;
      padding: 10px 20px;
      font-size: 14px;
      background-color: #030632;
      line-height: 1.5;
      border: 1px solid #021f66;
      text-indent: 30px;
    }

    ul {
      display: flex;
      flex-direction: column;

      li {
        flex: 1;
      }

      .monitarChart {
        border: 1px solid #021f66;
      }
    }
  }

  .middle {
    flex: 1.8;
    display: flex;
    flex-direction: column;
    margin: 0 10px;

    .statisticTop {
      margin: 10px 0;

      ul {
        display: flex;

        li {
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin: 0 15px;
          height: 110px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          padding-top: 5px;
        }

      }
    }

    .surveillance {
      flex: 1;

      .video-container {
        width: 100%;
        height: 420px;
      }
    }

    .statisticBottom {
      // flex: 1;
      padding: 0 0px 0 10px;
      height: 280px;

      ul {
        display: flex;

        li {
          flex: 1;
          // height: 100%;
        }
      }

    }
  }

  .right {
    flex: 1.1;
    margin: 10px 0;
    position: relative;

    .moreButton {
      position: absolute;
      top: -10px;
      right: 20px;
      width: 110px;
      height: 40px;
      font-size: 16px;
      line-height: 30px;
      border: none;
      background-color: #021f66;
      border-radius: 5px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      cursor: pointer;


    }

    .moreButton:hover {
      color: aquamarine
    }

    .weather {
      background-color: #030e36;
      height: 158px;
      // padding:20px 15px 5px 15px;
      padding: 5px;
      margin-right: 5px;
      font-size: 14px;
      display: flex;

      .picture {
        flex: 1;
        // margin-right: 30px;
        padding: 10px 0px 0px 0px;
        margin-right: 10px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;

        }
      }

      .details {
        flex: 2;
        display: flex;
        flex-direction: column;

        .city-time {
          display: flex;

          ul {
            li {
              display: inline-block;
              // flex: 1;
              // line-height: 40px;
              margin: 10px 0 0px 0;
            }

            #address {
              font-size: 20px;
              margin-right: 10px;
              letter-spacing: 2px;
            }

            letter-spacing: 2px;

            #week {
              margin: 0 5px;
            }

            #time {
              font-size: 20px;
              margin-right: 10px;
              letter-spacing: 2px;
            }

          }
        }

        .weather-info {
          font-size: 18px;
          display: flex;
          font-family: PangMenZhengDao;
          color: #00c2ff;
          letter-spacing: 1px;
          font-weight: 600;
          // padding-right: 5px;
          // margin-bottom: 20px;
          line-height: 22px;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              margin: 10px 10px 0px 0;
            }

            i {
              margin-right: 10px;
              font-size: 20px;
              text-align: center;
              color: #f36103;
              /* 绿色 */
            }

            // justify-content: space-between;

          }
        }

      }

    }

    .photography {
      display: flex;
      flex-direction: column;
      padding: 0px 25px 0px 25px;
      position: relative;
      // margin-bottom: 20px;

      .video-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 10px;
        height: 320px;
        // width: 580px;

        // .video-item {
        //   position: relative;
        //   overflow: hidden;

        //   img {
        //     width: 100%;
        //     height: 100%;
        //     object-fit: cover;
        //   }

        //   .content {
        //     position: absolute;
        //     top: 55%;
        //     left: 10%;
        //     /* 文字背景颜色 */
        //     color: white;
        //     /* 文字颜色 */
        //     font-size: 14px;
        //     /* 文字大小 */
        //   }

        // }

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
        height: 32px;
        line-height: 32px;
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
