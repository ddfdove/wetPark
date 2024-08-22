<template>
  <div class="container flex">

    <div class="left">
      <div class="flex-2 ltop">
        <panelboard :chTitle="'地点监测'" :enTitle="'Location Detection'">
          <div class="flex area">
            <div style="margin: 0 10px 0 10px;">
              <span>区域:</span>
              <el-dropdown @command="deviceChange">
                <span class="el-dropdown-link">
                  <span style="margin-right: 10px;" v-text="deviceMapName"></span><el-icon
                    class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu style="background-color:#030636;color:#ffffff">
                    <el-dropdown-item style="color:#ffffff" v-for="item in deviceOptions" :key="item.id"
                      :command="item.id">{{ item.name }}</el-dropdown-item>

                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div>
              <span class="text-sm" style="margin-right: 10px;">时间:</span>
              <!-- 日期选择器 1 -->
              <el-date-picker v-model="startDate" type="date" placeholder="开始"
                @change="handleDateChange('startDate', $event)"
                :style="{ width: '100px', backgroundColor: '#030636', color: '#ffffff', marginRight: '10px' }"></el-date-picker>
              <span>—</span>
              <!-- 日期选择器 2 -->
              <el-date-picker v-model="endDate" type="date" placeholder="结束"
                @change="handleDateChange('endDate', $event)"
                :style="{ width: '100px', backgroundColor: '#030636', color: '#ffffff', marginLeft: '10px' }"></el-date-picker>
            </div>
          </div>
          <div class="bird">
            <ul>
              <li v-for="(item, index) in birdsStaticList" :key="index">
                <div>
                  <span class="font-25">{{ item.recognitionCount }}</span>
                  <span class="font-18">只</span>
                </div>
                <h5 class="font-18">{{ item.acname }}</h5>
              </li>

            </ul>
          </div>
        </panelboard>
      </div>
      <div class="flex-3 lbottom">
        <panelboard :chTitle="'实时监测'" :enTitle="'Real-time monitoring'">
          <ul>
            <li v-for="(item, index) in places" :key="index" @click="changePlaces(item)">
              <div>
                <span style="color: #4DA6FF;">{{ item.cameraName }}</span>
                <span style="margin-left: 300px;">{{ item.createTime }}</span>
              </div>

            </li>
          </ul>
        </panelboard>
      </div>
    </div>
    <div class="middle">
      <ul class="switchButton">
        <li :class="{ 'active-link': $route.path === '/monitor/environment' }">
          <router-link to="/monitor/environment"><span>环境监测</span></router-link>
        </li>
        <li :class="{ 'active-link': $route.path === '/monitor/bird' }">
          <router-link to="/monitor/bird"><span>鸟类监测</span></router-link>
        </li>
        <li :class="{ 'active-link': $route.path === '/monitor/personnel' }">
          <router-link to="/monitor/personnel"><span>人流监测</span></router-link>
        </li>

      </ul>
      <div class="mTop">
        <panelboard :chTitle="'视频监控'" :enTitle="'Video Surveillance'">

          <!-- <el-tabs v-model="activeName" class="demo-tabs" type="card" tab-position="top">
            <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.label" :name="item.name">
              
            </el-tab-pane>
          </el-tabs> -->
          <div class="video-container">

            <div class="video-container" ref="videoContainer">

              <!-- <Video :cameraIndexCode="videoCode" :id="'prefix-' + videoCode.slice(0, 5) + '-' + index" :width="videoWidth"
            :height="videoHeight"></Video> -->
              <H5Video :id="bird" :playUrl="birdVideoSrc" :width="videoWidth" :height="videoHeight"></H5Video>

            </div>

          </div>
        </panelboard>

      </div>
      <div class="mBottom">
        <panelboard :chTitle="'鸟类增长数据'" :enTitle="'Bird show'">
          <!-- <div class="birdShow">
            <Carousel :birdsList="birdsList"></Carousel>
          </div> -->
          <ul class="statisticBottom" style="margin-top: 10px" v-if="loding">
            <li>
              <div class="monitarChart">
                <PeopleChart class="border" :dataList="seasonList"></PeopleChart>
              </div>
            </li>
            <li>
              <div class="monitarChart">
                <WaterChart class="border" :dataList="dayList"></WaterChart>
              </div>
            </li>
            <!-- <li>

              <div class="monitarChart">
                <AirChart class="border"></AirChart>
              </div>

            </li> -->
          </ul>
        </panelboard>
      </div>
    </div>
    <div class="right">
      <panelboard :chTitle="'种类搜索'" :enTitle="'Category Search'">
        <div class="flex area" style="margin-top: 20px;">
          <div style="margin: 0 10px 0 10px;">
            <span>种类:</span>
            <el-dropdown @command="handleFirstDropdown">
              <span class="el-dropdown-link">
                <span style="margin-right: 10px;">{{ deviceMapName2 }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu style="background-color:#030636;color:#ffffff">
                  <el-dropdown-item v-for="item in deviceOptions" :key="item.id" :command="item.id"
                    style="color:#ffffff">
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div>
            <span class="text-sm" style="margin-right: 10px;">时间:</span>
            <el-dropdown @command="handleSecondDropdown" class="leading-10 h-10">
              <span class="el-dropdown-link">
                <span style="margin-right: 10px;">{{ secondSelected }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu style="background-color:#030636;color:#ffffff">
                  <el-dropdown-item v-for="item in secondOptions" :key="item.id" :command="item.id"
                    style="color:#ffffff">
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>—</span>
            <el-dropdown @command="handleThirdDropdown" class="leading-10 h-10">
              <span class="el-dropdown-link" style="margin-left: 10px;">
                <span style="margin-right: 10px;">{{ thirdSelected }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu style="background-color:#030636;">
                  <el-dropdown-item v-for="item in thirdOptions" :key="item.id" :command="item.id"
                    style="color:#ffffff">
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="bird">
          <ul>
            <li v-for="(item, index) in birdsStaticList2" :key="index">
              <div>
                <span class="font-25">{{ item.recognitionCount }}</span>
                <span class="font-18">只</span>
              </div>
              <h5 class="font-18">{{ item.acname }}</h5>
            </li>
          </ul>
          <!-- <ul>
            <li v-for="(item, index) in birds.slice(0, 5)" :key="index" @click="handleDesc(item.id)">
              <div>
                <span class="font-25">{{ item.quantity }}</span>
                <span class="font-18">只</span>
              </div>
              <h5 class="font-18">{{ item.name }}</h5>
            </li>
          </ul> -->
        </div>
      </panelboard>
      <panelboard :chTitle="'鸟类展示'" :enTitle="'Bird Show'">
        <div class=" animal">
          <div class="name" style="display: flex;justify-content: space-between;padding:0 10px;">
            {{ discription.acName }}
            <a target="_blank" :href="discription.recognition" style="color:skyblue">打开图片</a>
          </div>
          <div class="flex" style="background-color: #030632;">
            <div class="animal flex-1">
              <ul class="flex flex-col">
                <li class="flex-1 family" style="display:flex;">
                  <div style="width:100px;">简介：</div>
                  <div>{{ discription.remark }}</div>
                </li>
                <!-- <li class="flex-1">身高：{{ discription.height }}</li>
                <li class="flex-1">翼展：{{ discription.Wingspan }}</li>
                <li class="flex-1">体重：{{ discription.weight }}</li>
                <li class="flex-1">拉丁学名：{{ discription.scientificName }}</li>
                <li class="flex-1">地理分布：{{ discription.distributed }}</li>-->
              </ul>
            </div>
            <div class="flex-1" style="margin:auto;">

              <img referrerpolicy="no-referrer" :src="discription.bUrl" style="width:100%;height:200px">

            </div>
          </div>

        </div>
      </panelboard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import Carousel from './carousel.vue'
import panelboard from "../../../components/panelboard/index.vue"
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import PeopleChart from './people.vue'
import WaterChart from './water.vue'
import AirChart from './air.vue'
import axios from 'axios';
import { getCameraEquipment } from '@/api/index.js'
import { getBirdsByJi, getBirdsByRi } from "@/api/birddata/index.js";
import http from "@/utils/http";
import Video from './video.vue'
import H5Video from '@/components/h5video.vue'

const $route = useRoute();
let isFetching = false
const firstOptions = ref([]);
const secondOptions = ref([]);
const thirdOptions = ref([]);
const birds = ref([]);
const seasonList = ref([]);
const dayList = ref([]);
const loding = ref(false)
let intervalId = null; // 定时器id
// 获取季度数据
const getBirdsList = async () => {

  try {
    const response = await getBirdsByJi();
    const response2 = await getBirdsByRi();
    //重新构造数据结构
    seasonList.value = configuredBrids(response.data);
    dayList.value = configuredDayBrids(response2.data);
    loding.value = true;
  } catch (error) {
    console.error("Error fetching birds:", error);
  }
};

//数据重新构造
//季增长
const configuredBrids = (data) => {
  // 按季度排序
  data.sort((a, b) => a.quarter - b.quarter);
  const quarterMap = {
    1: "春",
    2: "夏",
    3: "秋",
    4: "冬",
  };
  let yearMap = {}; // 按年份分组
  data.forEach((item) => {
    // 遍历插入数据
    if (!yearMap[item.year]) {
      yearMap[item.year] = {
        name: item.year,
        year: item.year,
        data: [],
        quarter: [],
      };
    }
    yearMap[item.year].data.push(item.new_birds_count);
    yearMap[item.year].quarter.push(quarterMap[item.quarter]);
  });

  let obj = Object.values(yearMap); // 转换为数组
  return obj;
};
//日增长
const configuredDayBrids = (data) => {
  let result = {
    name: "今日",
    data: [],
    new_birds_count: [],
  };

  data.slice(0, 5).forEach((item) => {
    result.data.push(item.date);
    result.new_birds_count.push(item.new_birds_count);
  });

  return [result];
};
const firstSelected = ref('');
const secondSelected = ref('');
const thirdSelected = ref('');

const videoCode = ref('9dd014fd77964be29b236769949dfbdf');
const birdVideoSrc = ref('ws://135.131.1.10:559/openUrl/39wIwdq')
const videoContainer = ref(null)
const videoWidth = ref(730);
const videoHeight = ref(393);
const cameraParams = ref({
  cameraIndexCode: '9dd014fd77964be29b236769949dfbdf',
  protocol: 'ws'
})
const getCameraEqui =async (params) => {
  try {
    const res = await getCameraEquipment(params)
    if (res.code == 0) {
      console.log('code为0')
      console.log('res',res)
      birdVideoSrc.value = res.data.url
    }
    console.log('birdVideoSrc.value',birdVideoSrc.value)
  } catch (error) {
    console.log('获取失败');
  }
}
const updateVideoDimensions = () => {
  if (videoContainer.value) {
    const rect = videoContainer.value.getBoundingClientRect()
    videoWidth.value = Math.max(Math.floor(rect.width)) // 保证最小宽度为 100
    videoHeight.value = Math.max(Math.floor(rect.height)) // 保证最小高度为 100
  }
}
//=======================================地点检测===========================
//鸟类数量统计查询条件
const birdParam = ref({
  cameraIndexCode: "",
  beginTime: '',
  endTime: ''
})
const deviceOptions = ref([]);
//鸟类统计数量
const birdsStaticList = ref([]);
//条件选择事件
const deviceChange = (command) => {
  birdParam.value.cameraIndexCode = command;
  console.log('birdParam.value', birdParam.value)
  getBirdStatistic()
}
const handleDateChange = (type, date) => {
  birdParam.value[type] = date;
  console.log('Date changed:', birdParam.value);
  getBirdStatistic()
};
const asyncBirdOptions = async () => {
  try {
    // const data = await axios.get('http://127.0.0.1:6633/api/wp/artemispost/getNiaoCameras', {});
    const data = await http({
      url: "/api/wp/artemispost/getNiaoCameras",
      method: "get",

    });
    // let data={"msg":"操作成功","total":7,"code":0,"data":[{"cameraIndexCode":"cc612fed05e84543b9719330a396c6aa","cameraName":"北岸高架桥底西侧鸟类云台"},{"cameraIndexCode":"b3c204d059774f308a986b6630e0d5c2","cameraName":"南岸观鸟平台鸟类云台"},{"cameraIndexCode":"ea93f2951988433d90c25ea4f971c90d","cameraName":"北岸峡口4号杆鸟类云台"},{"cameraIndexCode":"3c2a80109dee407189f763037ee1ce10","cameraName":"北岸北河道木栈道东鸟类云台"},{"cameraIndexCode":"1178426d6f4a4dbb88920651c7a0a935","cameraName":"北岸北河道小木屋入口鸟类云台"},{"cameraIndexCode":"2e23e66432294a56b6bb663ab29b6e6c","cameraName":"南岸峡口鸟类云台"},{"cameraIndexCode":"35140747d7664700b97bf019c64368e4","cameraName":"北岸高架桥西4号杆鸟类云台"}],"pageSize":10,"pageNum":1};
    deviceOptions.value = data.data.map(item => { return { id: item.cameraIndexCode, name: item.cameraName } });
  } catch (error) {
    console.error('Error fetching second options:', error);
  }
}

const deviceMapName = computed(() => {
  let obj = deviceOptions.value.find(item => item.id == birdParam.value.deviceId)
  return obj?.name || "==请选择==";
})


const asyncBirdStatistic = (params) => {
  return new Promise((resovle, rejct) => {
    http({
      url: "/api/wp/artemispost/getShibieVoListAll",
      method: "get",
      params

    })
      .then(res => {
        resovle(res);
      }, reject => {
        rejct(reject);
      })
    // let data={"msg":"操作成功","total":2,"code":0,"data":[{"acname":"大白鹭","recognitionCount":1,"bid":2},{"acname":"白鹭","recognitionCount":1,"bid":6}],"pageSize":10,"pageNum":1}
    // resovle(data);
  })
}

const getBirdStatistic = async () => {
  try {
    const data = await asyncBirdStatistic(birdParam.value);
    console.log('鸟类数量', data)
    birdsStaticList.value = data.data.filter((item, index) => index <= 5)
    console.log('birdsStaticList.value', birdsStaticList.value)
  } catch (error) {
    console.error('实时监控错误！', error);
  }
}

//=======================================实时监测===========================
const places = ref([
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
])
const asyncRealTimeMonitor = async () => {
  try {
    // const data = await axios.get('http://127.0.0.1:6633/api/wp/artemispost/getWpBirdObservations', {});
    const data = await http({
      url: "/api/wp/artemispost/getWpBirdObservations",
      method: "get",

    });
    // let data={"msg":"操作成功","total":8,"code":0,"data":[{"createBy":null,"createTime":"2024-08-18 13:40:31","updateBy":null,"updateTime":null,"remark":"","pageNum":null,"pageSize":null,"isSelected":false,"boId":8,"bId":1,"cameraIndexCode":null,"recognition":null,"status":null,"delFlag":null},{"createBy":null,"createTime":"2024-08-18 13:40:01","updateBy":null,"updateTime":null,"remark":"白鹭是鹈形目鹭科白鹭属中型涉禽。白鹭属共有13种鸟类，其中大白鹭、中白鹭、小白鹭和雪鹭四种体羽皆是全白，通称白鹭。体型中等，具有黄色趾；繁殖期时，眼先裸皮为粉红色，头部具有两根条状饰羽，背部和胸部具有蓑羽。非繁殖期时，眼先裸皮为黄绿色，没有头部饰羽和背部蓑羽。雌雄无明显差异。白鹭分布于中国长江流域等地，非洲、欧洲中南部、西亚、中亚、东亚、东南亚、大洋洲等地均有分布。栖息于低海拔地区的湖泊、水塘、河口等水域，常集小群活动于浅水或河滩。常白天于水域觅食，夜晚飞回林地休息。白鹭捕食小鱼、虾、蛙类、软体动物、昆虫等，也啄食少量植物种子。繁殖期3-7月，孵化期约25天，雌鸟留守营巢，由双亲共同孵化哺育。寿命约10年。白鹭出现在很多的文载中，例如唐代诗人杜甫的名句：“两个黄鹂鸣翠柳，一行白鹭上青天”；现代大文豪郭沫若也写了一篇优美散文《白鹭》来赞美它。因其羽毛有很高的经济价值，古代东方人喜欢用它来装饰衣服，西方人则喜欢用它来点缀女帽，加上白鹭喜欢群居，导致很容易被人大量捕捉，导致野生白鹭数量锐减，几乎陷入灭绝的境地，白鹭13种全部列入《世界自然保护联盟濒危物种红色名录》，其中黄嘴白鹭、蓝灰鹭被列为易危(VU)，棕颈鹭被列为近危(NT)。黄嘴白鹭为中国一级重点保护动物。","pageNum":null,"pageSize":null,"isSelected":false,"boId":7,"bId":2,"cameraIndexCode":null,"recognition":null,"status":null,"delFlag":null},{"createBy":null,"createTime":"2024-08-18 13:39:30","updateBy":null,"updateTime":null,"remark":"","pageNum":null,"pageSize":null,"isSelected":false,"boId":6,"bId":1,"cameraIndexCode":null,"recognition":null,"status":null,"delFlag":null},{"createBy":null,"createTime":"2024-08-18 13:39:01","updateBy":null,"updateTime":null,"remark":"","pageNum":null,"pageSize":null,"isSelected":false,"boId":5,"bId":1,"cameraIndexCode":null,"recognition":null,"status":null,"delFlag":null},{"createBy":null,"createTime":"2024-08-18 13:38:31","updateBy":null,"updateTime":null,"remark":"","pageNum":null,"pageSize":null,"isSelected":false,"boId":4,"bId":1,"cameraIndexCode":null,"recognition":null,"status":null,"delFlag":null},{"createBy":null,"createTime":"2024-08-18 13:38:01","updateBy":null,"updateTime":null,"remark":"","pageNum":null,"pageSize":null,"isSelected":false,"boId":3,"bId":1,"cameraIndexCode":null,"recognition":null,"status":null,"delFlag":null},{"createBy":null,"createTime":"2024-08-18 13:37:33","updateBy":null,"updateTime":null,"remark":"","pageNum":null,"pageSize":null,"isSelected":false,"boId":2,"bId":1,"cameraIndexCode":null,"recognition":null,"status":null,"delFlag":null},{"createBy":null,"createTime":"2024-08-18 13:37:31","updateBy":null,"updateTime":null,"remark":"白鹭是鹈形目鹭科白鹭属中型涉禽。白鹭属共有13种鸟类，其中大白鹭、中白鹭、小白鹭和雪鹭四种体羽皆是全白，通称白鹭。体型中等，具有黄色趾；繁殖期时，眼先裸皮为粉红色，头部具有两根条状饰羽，背部和胸部具有蓑羽。非繁殖期时，眼先裸皮为黄绿色，没有头部饰羽和背部蓑羽。雌雄无明显差异。白鹭分布于中国长江流域等地，非洲、欧洲中南部、西亚、中亚、东亚、东南亚、大洋洲等地均有分布。栖息于低海拔地区的湖泊、水塘、河口等水域，常集小群活动于浅水或河滩。常白天于水域觅食，夜晚飞回林地休息。白鹭捕食小鱼、虾、蛙类、软体动物、昆虫等，也啄食少量植物种子。繁殖期3-7月，孵化期约25天，雌鸟留守营巢，由双亲共同孵化哺育。寿命约10年。白鹭出现在很多的文载中，例如唐代诗人杜甫的名句：“两个黄鹂鸣翠柳，一行白鹭上青天”；现代大文豪郭沫若也写了一篇优美散文《白鹭》来赞美它。因其羽毛有很高的经济价值，古代东方人喜欢用它来装饰衣服，西方人则喜欢用它来点缀女帽，加上白鹭喜欢群居，导致很容易被人大量捕捉，导致野生白鹭数量锐减，几乎陷入灭绝的境地，白鹭13种全部列入《世界自然保护联盟濒危物种红色名录》，其中黄嘴白鹭、蓝灰鹭被列为易危(VU)，棕颈鹭被列为近危(NT)。黄嘴白鹭为中国一级重点保护动物。","pageNum":null,"pageSize":null,"isSelected":false,"boId":1,"bId":6,"cameraIndexCode":null,"recognition":null,"status":null,"delFlag":null}],"pageSize":10,"pageNum":1};
    places.value = data.data.filter((item, index) => index < 5)
    //查询鸟类详情
    let obj = places.value[0];
    if (obj.boId) getBirdInfo(obj.boId);
  } catch (error) {
    console.error('实时监控错误！', error);
  }
}
const changePlaces = (item) => {
  if (item.boId) getBirdInfo(item.boId);
}
//========================种类搜索===========
//鸟类统计数量
const birdsStaticList2 = ref([]);
const birdParam2 = ref({
  deviceId: "",
})
//条件选择事件
const handleFirstDropdown = (command) => {
  birdParam2.value.deviceId = command;
  getBirdStatistic2();
}
const deviceMapName2 = computed(() => {
  let obj = deviceOptions.value.find(item => item.id == birdParam2.value.deviceId)
  return obj?.name || "==请选择==";
})
const getBirdStatistic2 = async () => {
  try {
    const data = await asyncBirdStatistic(birdParam2.value);
    birdsStaticList2.value = data.data.filter((item, index) => index <= 5)
  } catch (error) {
    console.error('实时监控错误！', error);
  }
}
//================鸟类展示==============
const discription = ref({})
const getBirdInfo = async (id) => {
  try {
    // const data = await axios.get('http://127.0.0.1:6633/api/wp/artemispost/getWpBirdObservationsByid', {params:{id}});
    const data = await http({
      url: "/api/wp/artemispost/getWpBirdObservationsByid",
      method: "get",
      params: { boId: id }

    });
    // let data={"msg":"操作成功","code":0,"data":{"createBy":null,"createTime":"2024-08-18 19:09:43","updateBy":null,"updateTime":null,"remark":"鸻鹬是脊索动物门动物，澳大利亚鸻鹬鸟类研究组副主席菲力史卓先生对上虞中沙岛的鸟类生态进行了考察，他认为，中沙岛与黄海湿地一样是鸻鹬鸟类国际迁徙途中的“加油站”。鸻鹬鸟类是地球上迁徙距离最远的鸟类。","pageNum":null,"pageSize":null,"isSelected":false,"boId":1923,"bId":58,"bName":"鸻鹬","bUrl":"https://bkimg.cdn.bcebos.com/pic/95eef01f3a292df5e0fe6806317c4b6034a85edfd5d8?x-bce-process=image/resize,m_lfit,w_536,limit_1/quality,Q_70","cameraIndexCode":"35140747d7664700b97bf019c64368e4","cameraName":"北岸高架桥西4号杆鸟类云台","recognition":"https://135.131.1.10:6113/pic?0d8000=54d0ip-ceo921-226*8o0=1867l2=4188*5789233=9177*pt==315**bs=f619*22c65bc58-b0031f-0*l12eod05672=009&AccessKeyId=f1ZQrskinK8TPMfS&Expires=1724065785&Signature=odsLO36FKv6kNQx6HzJ/ZoNtFIw=","status":null,"delFlag":null}}
    discription.value = data.data;
  } catch (error) {
    console.error('Error fetching birds:', error);
  }
};

// getBirdInfo();


const fetchFirstOptions = async () => {
  try {
    // const response = await axios.get('http://127.0.0.1:6633/bird/dropDown/first-options');
    const response = await await http({
      url: "/bird/dropDown/first-options",
      method: "get",


    });
    console.log('response', response);
    firstOptions.value = response.data.data;
    console.log('firstOptions.value', firstOptions.value);
    if (firstOptions.value.length > 0) {
      firstSelected.value = firstOptions.value[0].name;
      fetchSecondOptions(firstOptions.value[0].id);
    }
  } catch (error) {
    console.error('Error fetching first options:', error);
  }
};

const fetchSecondOptions = async (firstOptionId) => {
  try {
    // const response = await axios.get('/bird/dropDown/second-options', {
    //   params: { id: firstOptionId } // 使用 `params` 属性传递查询参数
    // });
    const response = await await http({
      url: "/bird/dropDown/second-options",
      method: "get",
      params: { id: firstOptionId }

    });
    secondOptions.value = response.data.data;
    if (secondOptions.value.length > 0) {
      secondSelected.value = secondOptions.value[0].name;
      fetchThirdOptions(secondOptions.value[0].id);
    }
  } catch (error) {
    console.error('Error fetching second options:', error);
  }
};

const fetchThirdOptions = async (secondOptionId) => {
  try {
    // const response = await axios.get('http://127.0.0.1:6633/bird/dropDown/third-options', {
    //   params: { id: secondOptionId } // 使用 `params` 属性传递查询参数
    // });
    const response = await http({
      url: "/bird/dropDown/third-options",
      method: "get",
      params: { id: secondOptionId }

    });
    thirdOptions.value = response.data.data;
    if (thirdOptions.value.length > 0) {
      thirdSelected.value = thirdOptions.value[0].name;
      fetchBirds(thirdOptions.value[0].id);
    }
  } catch (error) {
    console.error('Error fetching third options:', error);
  }
};

const fetchBirds = async (thirdOptionId) => {
  // try {
  //   const response = await axios.get('/bird/dropDown/getbirds', {
  //     params: { id: thirdOptionId } // 使用 `params` 属性传递查询参数
  //   });
  //   birds.value = response.data.data;
  //   discription.value = birds.value[0].discription
  // } catch (error) {
  //   console.error('Error fetching birds:', error);
  // }
};

const handleDesc = (id) => {
  console.log('birds', birds.value);
  const data = birds.value.find(item => {
    return item.id === id
  })
  discription.value = data.discription
}

// const handleFirstDropdown = (command) => {
//   const selectedOption = firstOptions.value.find((option) => option.id === command);
//   firstSelected.value = selectedOption.name;
//   fetchSecondOptions(command);
// };

const handleSecondDropdown = (command) => {
  const selectedOption = secondOptions.value.find((option) => option.id === command);
  secondSelected.value = selectedOption.name;
  fetchThirdOptions(command);
};

const handleThirdDropdown = (command) => {
  const selectedOption = thirdOptions.value.find((option) => option.id === command);
  thirdSelected.value = selectedOption.name;
  fetchBirds(command);
};

const fetchData = async () => {
  if (isFetching) return; // 如果正在获取数据，直接返回
  isFetching = true; // 标记正在获取数据
  try {
    await Promise.all([
      getBirdsList(), //先调用一次
      asyncRealTimeMonitor()//实时监控
    ]);
    console.log('进入')
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching = false; // 请求完成，重置标志
  }
}
const startPolling = async () => {

  await fetchData(); // 初始加载数据

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
  getCameraEqui(cameraParams.value)
  startPolling();
  fetchFirstOptions();

  asyncBirdOptions();//鸟类数量统计条件
  getBirdStatistic();//左侧鸟类数量统计
  getBirdStatistic2();//右侧鸟类数量统计

  updateVideoDimensions()
  window.addEventListener('resize', updateVideoDimensions)
});
onUnmounted(() => {
  stopPolling();
});

const birdsList = ref([
  { name: '白鹭', src: './cut/bird/bailu.png' },
  { name: '斑嘴鸭', src: '/cut/bird/banzuiya.png' },
  { name: '骨顶鸡', src: '/cut/bird/gudingji.png' },
  { name: '鸟', src: '/cut/bird/niao.png' },
  { name: '鸟', src: '/cut/bird/niao.png' },
  { name: '鸟', src: '/cut/bird/niao.png' }
])
const birdDetails = ref([
  // {
  //   name: '斑嘴鸭',
  //   family: '雁形目>鸭科>鸭属',
  //   height: '58-63cm',
  //   Wingspan: '83-94cm',
  //   weight: '750-1000g',
  //   scientificName: 'Anaszonorhyncha',
  //   distributed: '欧亚，非洲，东洋界， 澳新界， 广泛分布',
  //   src: '/cut/bird/banzuiya.png'
  // },
  // {
  //   name: '白鹭',
  //   family: '鹈形目>鹭科>白鹭属',
  //   height: '55-65cm',
  //   Wingspan: '83-94cm',
  //   weight: '280-710g',
  //   scientificName: 'Egretta garzetta',
  //   distributed: '欧亚，非洲，东洋界， 澳新界， 广泛分布',
  //   src: '/cut/bird/bailu.png'
  // },
  {
    name: '骨顶鸡',
    family: '鹤形目>秧鸡科>骨顶属',
    height: '55-65cm',
    Wingspan: '86-104cm',
    weight: '280-710g',
    scientificName: 'Egretta garzetta',
    distributed: '欧亚，非洲，东洋界， 澳新界， 广泛分布',
    src: '/cut/bird/gudingji.png'
  },
])
const handleCommand = (command) => {
  // ElMessage(`click on item ${command}`)

}
const formatDate = (date, format) => {
  date = new Date(date);
  const o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    "H+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    a: date.getHours() < 12 ? "上午" : "下午", // 上午/下午
    A: date.getHours() < 12 ? "AM" : "PM", // AM/PM
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
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
  //   background-color: #030025!important;
  // }

  :deep(.el-dropdown-item:hover) {
    background-color: #030845;
    color: red
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

  .left {
    flex: 6.2;
    display: flex;
    flex-direction: column;

    span {
      margin: 0 5px;
      height: 40px;
      line-height: 40px;
    }


    .bird {
      // background-image: url('../../assets/images/cut/bird/bird2.png');
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      width: 520px;
      height: 300px;
      margin: 20px 0 0 20px;
      border: 1px solid #021757;
      background-color: #030636;

      ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 40px;

        li {
          background-image: url('/cut/bird/bird4.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 110px;
          height: 125px;
          margin: 10px;
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

    .lbottom {
      ul {
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        // width: 550px;
        li {
          background-color: #030836;
          margin: 22px 20px 0 20px;
          padding: 2px 20px;
          color: rgba(255, 255, 255, 0.87);
          height: 70px;

        }

        li:hover {
          background-color: #030845;
          border: 1px solid #0066FF;
        }
      }
    }


  }

  .middle {
    flex: 6.8;
    display: flex;
    flex-direction: column;
    // margin: 0 0px 0 10px;

    .mTop {
      flex: 5;

      .video-container {
        position: relative;
        // width: 100%;
        margin-left: 10px;
        margin-right: 20px;
        width: 760px;
        // height:100%;
        height: 450px;

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

    .mBottom {
      flex: 3.8;
      padding: 0px 10px;

      .statisticBottom {
        flex: 1;
        display: flex;

        padding-top: 15px;
        // height: 200px;

        // margin-top: 0px;
        li {
          flex: 1;
          display: inline-block;

          .border {
            border: 1px solid #021f66;
            margin: 0 5px;
          }
        }
      }

      .birdShow {
        // background-image: url('../../assets/images/cut/bird/bird6.png');
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        width: 890px;
        height: 296px;
        border: 1px solid #021757;
        background-color: #030632;
        // padding: 35px -5px;
      }
    }
  }

  .right {
    flex: 5;
    height: 100%;
    font-family: MiSans;
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0px;
    margin: 0 10px 0 20px;

    span {
      margin: 0 5px;
      height: 40px;
      line-height: 40px;
    }


    .bird {
      // background-image: url('../../assets/images/cut/bird/bird2.png');
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      width: 530px;
      height: 300px;
      margin: 20px 0 0 10px;
      border: 1px solid #021757;
      background-color: #030636;

      ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 50px;
        // padding-top:30px;

        li {
          background-image: url('/cut/bird/bird4.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 110px;
          height: 125px;
          margin: 10px;
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

    .animal {
      height: 100%;
      display: flex;
      flex-direction: column;
      font-size: 18px;

      .name {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        // margin-top: 20px;

        background-color: #030632;
        margin: 10px 0 25px 0;
      }

      ul {
        padding: 14px 10px;
        height: 382px;

        // padding-bottom: 20px;
        li {
          margin: 10px 0;
        }

        .family {
          color: #4DA6FF;
        }
      }
    }

  }
}
</style>
