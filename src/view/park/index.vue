<template>
  <div class="container flex">
    <div class="left">
      <panelboard :chTitle="'公园简介'" >
        <div class="introduce">
          {{ parkStore.parkIntroduce.introduce }}
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
      <div class="statisticTop">
        <panelboard :chTitle="'数据统计'" :enTitle="'Statistics'">
          <ul>
            <li class="flex-1" 
              :style="{ backgroundImage: `url('/cut/rect.png')` }">
              <div style="  color: #00A3FF;margin-bottom: 10px;font-size: 22px;">总面积</div>
              <div>
                <span style="font-size: 30px;margin-right: 5px; ">120</span>
                <span style="font-size: 14px;">公顷</span>
              </div>
            </li>
            <li class="flex-1"  
              :style="{ backgroundImage: `url('/cut/rect.png')` }">
              <div style="  color: #00A3FF;margin-bottom: 10px;font-size: 22px;">人流量</div>
              <div>
                <span style="font-size: 30px;margin-right: 5px; ">5765</span>
                <span style="font-size: 14px;">人</span>
              </div>
            </li>
            <li class="flex-1"  
              :style="{ backgroundImage: `url('/cut/rect.png')` }">
              <div style="  color: #00A3FF;margin-bottom: 10px;font-size: 22px;">野生动物种类</div>
              <div>
                <span style="font-size: 30px;margin-right: 5px; ">{{parkBirds}}</span>
                <span style="font-size: 14px;">种</span>
              </div>
            </li>
            <li class="flex-1"  
              :style="{ backgroundImage: `url('/cut/rect.png')` }">
              <div style="  color: #00A3FF;margin-bottom: 10px;font-size: 22px;">设备</div>
              <div>
                <span style="font-size: 30px;margin-right: 5px; ">{{parkEquirments}}</span>
                <span style="font-size: 14px;">台</span>
              </div>
            </li>
          </ul>
        </panelboard>
      </div>
      <div class="animal">
        <panelboard :chTitle="'视频监控'" :enTitle="'Video Surveillance'">
           <div class="video-container" ref="videoContainer">
            <Video1 :cameraIndexCode="videoCode" :id="'prefix-' + videoCode.slice(0, 5) + '-' + index" :width="videoWidth" :height="videoHeight"></Video1>
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
        
        <!-- <li>
          <panelboard :chTitle="'监测数据'" :enTitle="'Monitoring data'">
            <div class="monitarChart">
              <MonitarChart id="monitarChart" :dataList="monitorData"></MonitarChart>
            </div>
          </panelboard>
        </li> -->
      </div>
    </div>
    <div class="right">
      <button class="moreButton" @click=" router.push({ path: '/' })">
        <i class="iconfont icon-gengduoshuangjiantou" style="margin-right: 8px;"></i>
        <span>回到首页</span>
      </button>
      
      <div class="rTop">
        <panelboard :chTitle="'城市时间'" :enTitle="'City Time'">
          <!-- <iframe width="590" scrolling="no" height="190" frameborder="0" allowtransparency="true" src="https://i.tianqi.com?c=code&id=27&bgc=%23&bdc=%23FFFFFF&icon=1&py=xining&site=12"></iframe> -->
          <!-- <weatherLiquidfill :titles="warnTitle" :options="warnList"></weatherLiquidfill> -->
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
                  <!-- <li><i class="fa fa-wind"></i> 风力: ≤{{ weather.windpower }}</li> -->
                  <!-- <li><i class="fa fa-check-circle"></i>适宜性: {{ weather.temperatureSuitability }}</li> -->
                  <li><i class="fa fa-smog"></i>PM2.5: {{ averagePM25 }} &nbsp{{ airQuality }} </li>

                  <!-- <li><i class="fa fa-tshirt"></i>穿衣建议: {{ weather.clothingAdvice }}</li>
                  <li><i class="fas fa-car"></i>洗车建议: {{ weather.carWashingAdvice }}</li> -->
                  <!-- <p><i class="fa fa-running"></i>运动建议: {{ weather.exerciseAdvice }}</p> -->
                </ul>
              </div>
            </div>
          </div>

        </panelboard>
      </div>
      <div class="rMiddle">
        <panelboard :chTitle="'地区摄像'" :enTitle="'Regional Photography'">
          <div class="photography">
            <div>
              <!-- <el-tabs v-model="activeName1" class="demo-tabs" @tab-click="handleClick1">
                <el-tab-pane v-for="(item, index) in monitorTabs" :key="index" :label="item.label" :name="item.name"> -->
              <div class="video-grid">
                <div ref="caemraContainer" v-for="(source, index) in SurveillanceVideo" :key="index" class="video-item"
                  @click="handleItemClick(source, index)" >
                    <!-- <Video :cameraIndexCode="source.cameraIndexCode" :id="index" :width="cameraWidth" :height="cameraHeight"></Video> -->
                    <H5Video :playUrl="source.url" :id="`play`+String(index)" ></H5Video>
                 
                </div>
              </div>
              <!-- </el-tab-pane>
              </el-tabs> -->
            </div>
          </div>
        </panelboard>
      
        <!-- <video-player  :src="SurveillanceVideo1.url" :options="playerOptions2" :volume="0.6"></video-player> -->
        <!-- <video ref="videoElement" autoplay width="200" height="150"></video> -->
        <!-- <div id='H5Video'></div>  -->
      </div>
      <div class="rBottom">
        <panelboard :chTitle="'监测数据'" :enTitle="'Monitoring data'">
          <div class="flex area">
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
import { ref, onMounted, onUnmounted, onBeforeUnmount, computed, nextTick } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useDataStore } from '@/store/modules/data.js'
import { useParkStore } from '@/store/modules/park.js'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import moment from 'moment'
import "moment/dist/locale/zh-cn";
import { getWaterEquipmentList,getCameraEquipments,getBirds,getBirdsBybType,getMonitorEquipment ,getWildBirds} from '@/api/index.js'
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
import LocalWeather from '@/components/LocalWeather.vue'
import Video from './video.vue'
import Video1 from './video1.vue'
import H5Video from '@/components/h5video.vue'

const myPlugin = ref(null);
const curIndex = ref(0); // 当前窗口下标

const initCamera = () => {
  const { JSPlugin } = window;
  if (JSPlugin) {
    myPlugin.value = new JSPlugin({
      szId: "H5Video",
      szBasePath: "../../../public/bin", // 确保路径正确
      openDebug: true,
      iMaxSplit: 1,
      iCurrentSplit: 1,
      oStyle: {
        border: "#FFF",
        borderSelect: "#FFCC00",
        background: "#000",
      },
    });
    initPlugin();
  } else {
    console.error('H5 SDK JSPlugin 未正确加载');
  }
};

const initPlugin = () => {
  myPlugin.value.JS_SetWindowControlCallback({
    windowEventSelect: (iWindIndex) => {
      console.log("windowSelect callback: ", iWindIndex);
    },
    pluginErrorHandler: (iWindIndex, iErrorCode, oError) => {
      console.error(`window-${iWindIndex}, errorCode: ${iErrorCode}`, oError);
    },
    windowEventOver: (iWindIndex) => {
      console.log("鼠标移过回调", iWindIndex);
    },
    windowEventOut: (iWindIndex) => {
      console.log("鼠标移出回调", iWindIndex);
    },
    windowFullCcreenChange: (bFull) => {
      console.log("全屏切换回调", bFull);
    },
    firstFrameDisplay: (iWndIndex, iWidth, iHeight) => {
      console.log("首帧显示回调", iWndIndex, iWidth, iHeight);
    },
    performanceLack: (iWndIndex) => {
      console.log("性能不足回调", iWndIndex);
    },
  });
  realplay();
};

const realplay = async () => {
  try {
    const res2 = await getCameraWs(); // 后端接口获取 WS 地址
    const playURL1 = 'rtsp://rtspstream:111c140a7de78d40ba5e3249819b9632@zephyr.rtsp.stream/movie'; // 监控点预览取流 URL
    const playURL2 = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'; // 监控点预览取流 URL
    const playURL3 = 'http://vjs.zencdn.net/v/oceans.mp4'; // 监控点预览取流 URL
    await myPlugin.value.JS_Play(
      playURL3,
      {
        playURL3,
        mode: 1, // 高级模式
      },
      curIndex.value
    );
    console.info("JS_Play success");
  } catch (err) {
    console.error("JS_Play failed:", err);
  }
};

const getCameraWs = async () => {
  // 实现获取 WebSocket 地址的逻辑
  // 例如，通过 axios 请求获取数据
  // return axios.get('/api/getCameraWs').then(response => response.data);
  return { url: 'ws://example.com/stream' }; // 示例
};


//获取webRtc服务
// 视频元素的引用
const videoWidth = ref(760)
const videoHeight = ref(443)
const cameraWidth = ref(178)
const cameraHeight = ref(103)
const videoContainer = ref(null)
const caemraContainer=ref(null)

const videoElements = ref([]);
const webRtcServers = ref([]);
const webrtcVideo = ref(null);
const webRtcServerIp = ref('127.0.0.1:9001');
const videoSrc = ref("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
const videoCode=ref('9dd014fd77964be29b236769949dfbdf')
const imageSrc = ref('/cut/bird/bird5.png');
const isWebRTC = ref(false);
const updateVideoDimensions = () => {
  if (videoContainer.value) {
    const rect = videoContainer.value.getBoundingClientRect()
    videoWidth.value = Math.max(Math.floor(rect.width)) // 保证最小宽度为 100
    videoHeight.value = Math.max(Math.floor(rect.height)) // 保证最小高度为 100
  }
  if (caemraContainer.value && Array.isArray(caemraContainer.value)) {
        caemraContainer.value.forEach((container, index) => {
            if (container) {  // 这里进一步确保每个元素都存在
                const rect2 = container.getBoundingClientRect();
                cameraWidth.value = Math.max(Math.floor(rect2.width)); // 保证最小宽度为 100
                cameraHeight.value = Math.max(Math.floor(rect2.height)); // 保证最小高度为 100
            }
        });
    }
}




const store = useDataStore(); // 使用 Pinia store
const parkStore = useParkStore()
const route = useRoute();
const router = useRouter();
const dataList = ref([
  {
    type: 'weather',
    name: '天气预报',
    value: 'sunny',  //天气图标详情见下方样式设置
    text: '晴天',
    tips: '' 		 //red, yellow, blue, orange
  },
  {
    type: 'typhoon',
    name: '台风预警',
    value: '',		//例：100m/s
    text: '无台风',	//台风名称
    tips: '' //red, yellow, blue, orange
  },
  {
    type: 'heavy', 	//暴雨类型
    name: '暴雨预警',
    value: 'heavy-rain', //图标类型与天气一样
    text: '大雨',
    tips: 'blue' //red, yellow, blue, orange
  },
  {
    type: 'high-temp',
    name: '高温预警',
    value: '27°C',
    text: '正常',
    tips: ''//red, yellow, blue, orange, 空green
  },
  {
    type: 'flood',
    name: '汛情水位',
    value: '2.7m', //当前值
    text: '4.9m', //警戒线
    tips: 'green' //red, yellow, blue, orange, green
  }
])
//园区展示中间上面的数据
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
//video配置项
const playerOptions = ref({
  playbackRates: [0.7, 1.0, 1.5, 2.0],
  autoplay: "false",
  muted: true,
  loop: true,
  preload: "auto",
  language: "zh-CN",
  fluid: true,
  // aspectRatio: "16:9", 
  notSupportedMessage: "此视频暂无法播放，请稍后再试",
  controls: true,
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true,
  },
});
const playerOptions2 = ref({
  playbackRates: [0.7, 1.0, 1.5, 2.0],
  autoplay: "false",
  muted: true,
  loop: true,
  preload: "auto",
  language: "zh-CN",
  fluid: true,
  
  notSupportedMessage: "此视频暂无法播放，请稍后再试",
  controls: false,
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true,
  },
});
//点击右侧监控视频中间展示放大
const handleItemClick = (source, index) => {
  console.log('source.cameraIndexCode',source.cameraIndexCode)
  videoCode.value=source.cameraIndexCode
  videoSrc.value=source.url
  console.log('videoCode.value',videoCode.value);
};
//中间下面野生鸟类种类展示
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
//右侧城市时间格式化时间
let date = ref(moment().format('YYYY年MM月DD日'))
let week = ref(moment().format('dddd'))
let timer = ref(0)
//存储当前时间
let time = ref(moment().format('h:mm:ss '))
//天气相关数据
const key = ref('f89095713ad2705c9308afbe0e535127');
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
  clothingAdvice: '',
  carWashingAdvice: '',
  exerciseAdvice: ''
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
const iconCondition = ref(null); // icon值
//视频监控数据
const SurveillanceVideo = ref([])


const monitorsources = ref([
  {
    src: '/cut/bird/bird5.png',
    content: '生态停车场'
  },
  {
    src: '/cut/bird/bird5.png',
    content: '卫生间'
  },
  {
    src: '/cut/bird/bird5.png',
    content: '石笼坝'
  },
  {
    src: '/cut/bird/bird5.png',
    content: '沙湖'
  },
  {
    src: '/cut/bird/bird5.png',
    content: '儿童游乐场'
  },
  {
    src: '/cut/bird/bird5.png',
    content: '双湖佳境'
  },
  {
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    content: '游客中心'
  },
  {
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    content: '滑板街区'
  },
  {
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    content: '西宁湟水国家湿地科普馆'
  },
]);

//图表参数定义
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
//设置摄像机监控参数
const cameraParams = ref({
  
  protocol:'ws'
})
//设置水质对比参数
const waterParams = ref({
  timeType: null,
  number: 4
})
//设置水质对比参数
//水质对比参数
const waterComParams = ref({
  edId1: null,
  edId2: null
})
//右侧水质设备对比的下拉框的函数定义
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
const averagePM25 = ref(2.8)
const airQuality = ref('空气质量优秀')
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

//获取园区介绍
const getParkIntroduce = () => {
  const id = route.query.id;
  if (id) {
    const params = {
      parkId: id
    }
    parkStore.getParkIntroduce(params);
    console.log(parkStore.parkIntroduce);
  } else {
    console.error('ID parameter is missing in the URL');
  }
};
//获取园区展示种群趋势分析
const birdsPopulation=ref([])
const getBirdsPopulation=async()=>{
  await getBirdsBybType()
  try {
    const res =  await getBirdsBybType()
    if (res.code == 0) {
      birdsPopulation.value=res.data

    }
  } catch (error) {
    console.error("请求失败", err);
  }
}
const parkBirds=ref(null)
//获取园区展示中间动物种类
const getParkBirds=async()=>{
   try {
     const res=await getBirds()
     parkBirds.value=res.data
   } catch (error) {
    
   }
}
const parkWildBirds=ref([

])
//获取园区展示野生鸟类种类
const getParkWildBirds=async()=>{
  try {
    const res=await getWildBirds()
    if(res.code==0){
      parkWildBirds.value=res.data.slice(0,6).map((item)=>{
        return {
          name:item.acname,
          value:item.bid
        }
    })
    }
    
    console.log('parkWildBirds.value',parkWildBirds.value);
  } catch (error) {
    
  }
}
//获取园区展示设备总数
const parkEquirments=ref(2563)
const getParkEquirments = async () => {
  try {
    const res = await getMonitorEquipment();
    if (res.code == 0) {
      // 初始化设备总数
      let totalDeviceCount = 0;

      // 遍历 res.data 以计算总设备数
      res.data.forEach(category => {
        if (category.tvdata) {
          // 如果该类别有 tvdata 数组，则计算其设备数量
          totalDeviceCount += category.tvdata.length;
        }
        if (category.data) {
          // 如果该类别有 data 数组，则遍历每一个 data 对象并计算设备数量
          category.data.forEach(subCategory => {
            if (subCategory.detail) {
              totalDeviceCount += subCategory.detail.length;
            }
          });
        }
      });

      // 将计算得到的设备总数赋值给 parkEquirments
      parkEquirments.value = totalDeviceCount;
      console.log("设备总数:", parkEquirments.value);
    } else {
      console.log("获取设备数据失败:", res.msg);
    }
  } catch (err) {
    console.error("请求失败", err);
    // 处理请求失败的情况
  }
};
//获取园区展示监控视频摄像头设备列表
const getCameraEquipmentList = async (params) => {

  try {
    const res = await getCameraEquipments(params);
    
    // console.log('res.code === 0', res.code == 0);
    if (res.code == 0) {
      console.log('res.data', res.data);
      SurveillanceVideo.value = res.data.map((item, index) => {
        return {
          content: monitorsources.value[index].content,
          url: item.url,
          cameraIndexCode:item.cameraIndexCode
        }
        
      });
      if (SurveillanceVideo.value.length > 0) {
        videoCode.value = SurveillanceVideo.value[0].cameraIndexCode;
        videoSrc.value = SurveillanceVideo.value[0].url;
      }
      console.log('SurveillanceVideo.value',SurveillanceVideo.value)
      // SurveillanceVideo1.value=res.data
    } else {
      console.log(res.msg);
    }
  } catch (err) {
    console.error("请求失败", err);
    // 处理请求失败的情况
  }

}
// 获取用户位置信息
const getLocationInfo = async () => {
  const params = {
    key: key.value,
  };
  try {
    const { data } = await axios.get('https://restapi.amap.com/v3/ip', { params });
    // data.adcode值为获取天气需要的city值
    getWeather('630100');
  } catch (error) {
    console.error('获取位置信息失败', error);
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

//天气相关函数
// 温度适宜度
function temperatureSuitability(temperature) {
  if (temperature >= 25) {
    return '非常热不太适宜长时间户外活动';
  } else if (temperature >= 20) {
    return '温暖舒适，适宜户外活动';
  } else if (temperature >= 10) {
    return '凉爽，适宜户外活动，注意保暖';
  } else {
    return '寒冷，尽量减少户外活动，注意保暖';
  }
}
// 穿衣建议
function clothingAdvice(temperature) {
  if (temperature >= 25) {
    return '短袖T恤、短裤';
  } else if (temperature >= 20) {
    return '长袖T恤或衬衫，薄外套';
  } else if (temperature >= 10) {
    return '长袖衣物，搭配一件外套';
  } else {
    return '保暖衣物，羽绒服或大衣';
  }
}
// 洗车建议
function carWashingAdvice(weather) {
  if (weather === '晴' || weather === '多云') {
    return '天气晴朗，适宜洗车';
  } else {
    return '近期可能有雨，请等待晴天再洗车';
  }
}
// 运动建议
function exerciseAdvice(temperature, windpower) {
  if (temperature >= 25) {
    return '高温下请减少剧烈运动，可以选择室内运动';
  } else if (temperature >= 10) {
    if (parseInt(windpower) <= 3) {
      return '适宜户外运动';
    } else {
      return '风力较大，建议选择室内运动';
    }
  } else {
    return '天气较冷，请注意保暖，避免长时间户外运动';
  }
}
// 获取天气详情
const getWeather = async (adcode) => {
  const params = {
    key: key.value,
    city: adcode,
    extensions: 'base'
  };
  const params2 = {
    key: key.value,
    city: adcode,
    extensions: 'all'
  };

  try {
    const response1 = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', { params });
    if (response1.data.lives && response1.data.lives.length > 0) {
      weather.value = response1.data.lives[0];
      iconCondition.value = setWeatherIcon(response1.data.lives[0]?.weather);
      // 添加建议
      weather.value.temperatureSuitability = temperatureSuitability(weather.value.temperature);
      weather.value.clothingAdvice = clothingAdvice(weather.value.temperature);
      weather.value.carWashingAdvice = carWashingAdvice(weather.value.weather);
      weather.value.exerciseAdvice = exerciseAdvice(weather.value.temperature, weather.value.windpower);
    }
  } catch (error) {
    console.error('获取实时天气信息失败', error);
  }

  try {
    const response2 = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', { params: params2 });
    if (response2.data.forecasts && response2.data.forecasts.length > 0) {
      weather2.value = response2.data.forecasts[0].casts;
      // console.log('天气预报信息:', response2.data.forecasts[0].casts);
    }
  } catch (error) {
    console.error('获取天气预报信息失败', error);
  }
};
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
//组件挂载完毕更新当前的事件
const fetchData = async () => {
  if (isFetching) return; // 如果正在获取数据，直接返回
  isFetching = true; // 标记正在获取数据

  
  getLocationInfo();
  // getParkSurveillanceVideos()
  
  getBirdsPopulation()
  getParkWildBirds()
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
    averagePM25.value = calculateAveragePM25(envDataList.value.pm25List);
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

onMounted(() => {
  getCameraEquipmentList(cameraParams.value)
  updateVideoDimensions()
   getParkBirds()
   getParkEquirments()
  window.addEventListener('resize', updateVideoDimensions)
  // initCamera();
  getParkIntroduce()
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

      .monitarChart {
        // height: 240px;
        border: 1px solid #021f66;
        // padding: 10px;
      }
    }
  }

  .middle {
    flex: 1.8;
    display: flex;
    flex-direction: column;
    margin: 0 10px;

    .statisticTop {
      // flex: 0.6;
      margin: 10px 0;

      ul {
        display: flex;
        //  padding: 20px 10px 10px 10px;
        // padding-top: 10px;

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

    .animal {
      flex: 1;
      // margin-bottom: 60px;

      .video-container {
        position: relative;
        width: 100%;
        height: 420px;
        // padding-top: 10px;

        .video-player {
          width: 100%;
          height: 100%;
        }

        .image-display {
          width: 100%;
          // height: 340px;
        }

        // .video-player video {
        //   width: 100% !important;
        //   height: 100% !important;
        //   object-fit: cover;
        // }

        // .image-display img {
        //   width: 100%;
        //   height: 100%;
        //   object-fit: cover;
        // }


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
      // flex: 1;
      padding: 0 0px 0 10px;
      height: 280px;

      ul {
        display: flex;

        li {
          flex: 1;
          height: 100%;
        }
      }

    }
  }

  .right {
    flex: 1.1;
    // background-color: rgb(11, 28, 46);
    margin: 10px 0;
    position: relative;

    // padding: 20px;
    // border-radius: 5px;
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
      margin-bottom: 20px;

      .video-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 10px;
        height: 300px;

        .video-item {
          position: relative;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .content {
            position: absolute;
            top: 55%;
            left: 10%;
            /* 文字背景颜色 */
            color: white;
            /* 文字颜色 */
            font-size: 14px;
            /* 文字大小 */
          }

        }

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

      // .area {
      //   margin-top: 10px;
      // }

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
