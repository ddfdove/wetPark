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
              <span class="time-box">
                <el-date-picker v-model="birdParam.beginTime1" type="date" placeholder="开始" value-format="YYYY-MM-DD"
                  teleported ref="beginDatePicker" @focus="startTimeFocus" @change="handleDateChange()"
                  popper-class="popperClass" :locale="locale"></el-date-picker>
              </span>
              <span>—</span>
              <!-- 日期选择器 2 -->
              <span class="time-box">
                <el-date-picker v-model="birdParam.endTime1" type="date" placeholder="结束" value-format="YYYY-MM-DD"
                  ref="endDatePicker" teleported @focus="endTimeFocus" @blur="endTimeBlur" @change="handleDateChange()"
                  popper-class="popperClass"></el-date-picker>
              </span>
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
              <div style="position: relative;">
                <span style="color: #4DA6FF;">{{ item.cameraName }}</span>
                <span style="position: absolute;right:0">{{ formatDate(item.createTime) }}</span>
                <!-- <span style="margin-left: 300px;">{{item.createTime  }}</span> -->
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

              <Video ref="birdVideo" :cameraIndexCode="videoCode" :id="'prefix-' + videoCode.slice(0, 5) + '-' + index"
                :width="videoWidth" :height="videoHeight"></Video>
              <!-- <H5Video :id="bird" :playUrl="birdVideoSrc" :width="videoWidth" :height="videoHeight"></H5Video> -->

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
                <!-- <PeopleChart class="border" :dataList="seasonList"></PeopleChart> -->
                <lineChart class="border" :dataList="{seasonList: seasonList.dataList }" :categories="seasonList.categories"
                   height="280"></lineChart>
              </div>
            </li>
            <li>
              <div class="monitarChart">
                <!-- <WaterChart class="border" :dataList="dayList"></WaterChart> -->
                <lineChart class="border" :dataList="{dayList: dayList.dataList }" :categories="dayList.categories"
                   height="280"></lineChart>
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
            <el-dropdown @command="birdChange">
              <span class="el-dropdown-link">
                <span style="margin-right: 10px;">{{ deviceMapName2 }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu
                  style="background-color:#030636;max-height: 280px; overflow-y: scroll; scrollbar-width: none; -ms-overflow-style: none;">
                  <el-dropdown-item v-for="item in birdOptions" :key="item.id" :command="item.id">
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div>
            <span class="text-sm" style="margin-right: 10px;">时间:</span>
            <!-- 日期选择器 1 -->
            <span class="time-box">
              <el-date-picker v-model="birdParam.beginTime2" type="date" placeholder="开始" value-format="YYYY-MM-DD"
                teleported ref="beginDatePicker" @focus="startTimeFocus" @change="handleDateChange()"
                popper-class="popperClass" :locale="locale"></el-date-picker>
            </span>
            <span>—</span>
            <!-- 日期选择器 2 -->
            <span class="time-box">
              <el-date-picker v-model="birdParam.endTime2" type="date" placeholder="结束" value-format="YYYY-MM-DD"
                ref="endDatePicker" teleported @focus="startTimeFocus" @blur="startTimeBlur"
                @change="handleDateChange()" popper-class="popperClass"></el-date-picker>
            </span>
          </div>
        </div>
        <div class="bird" @click="handleClickOutside">
          <ul>
            <li v-for="(item, index) in birdsStaticList2" :key="index"
              @click="popUpSnapshot(item.cameraIndexCode)">
              <div>
                <span class="font-25">{{ item.recognition_count }}</span>
                <span class="font-18">只</span>
              </div>
              <h5 class="font-18">{{ item.cameraName }}</h5>
            </li>
          </ul>
          <img v-if="imgUrl" :src="imgUrl" alt="实时抓拍图" classs="snapshot-img" referrerpolicy="no-referrer"
            style="width: 250px; height: 180px; border-radius: 10px;position: fixed;right: 30px;top: 500px;" />
        </div>
      </panelboard>

      <panelboard :chTitle="'鸟类展示'" :enTitle="'Bird Show'">
        <div class=" animal">
          <div class="name" style="display: flex;justify-content: space-between;padding:0 10px;">
            {{ discription.acName }}
            <a target="_blank" :href="discription.recognition" style="color:skyblue">打开图片</a>
          </div>
          <div class="flex" style="background-color: #030632;height:382px">
            <div class="animal-content">
              <div class="image">
                <img referrerpolicy="no-referrer" :src="discription.bUrl">
              </div>

              <div class="family">
                <!-- <div style="width: 100px;font-size:22px;margin-bottom:10px">简介：</div> -->
                <div>
                  <span style="font-size:22px;line-height: 2;">简介：</span><br>
                  {{ discription.remark }}
                </div>
              </div>

            </div>
          </div>

        </div>
      </panelboard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { ElMessage } from 'element-plus'
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { ArrowDown } from '@element-plus/icons-vue'
import panelboard from "@/components/panelboard/index.vue"
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import lineChart from '@/components/chart/line.vue'
import { getCameraEquipment, getPlaceList, getSearchByPlace, getRealTimeMonitoring, getSpeciesList, getSearchBySpecies, getBirdDetail, getSnapshotBySpecies } from '@/api/index.js'
import { getBirdsByJi, getBirdsByRi } from "@/api/birddata/index.js";
import { formatDate } from '@/utils/mapping.js'
import Video from './video.vue'
import dayjs from 'dayjs'


let locale = zhCn
const $route = useRoute();
let isFetching = false
const firstOptions = ref([]);
const secondOptions = ref([]);
const thirdOptions = ref([]);
const birds = ref([]);
const seasonList = ref({});
const dayList = ref({});
const loding = ref(false)
let intervalId = null; // 定时器id
const birdVideo = ref(null)
let beginDatePicker = ref(null)
let endDatePicker = ref(null)
// 获取季度数据
const getBirdsList = async () => {

  try {
    const response = await getBirdsByJi();
    const response2 = await getBirdsByRi();
    //重新构造数据结构
    // console.log('response2', response2.data);
    seasonList.value = configuredBrids(response.data);
    console.log(' seasonList.value', seasonList.value);
    dayList.value = configuredDayBrids(response2.data);
    console.log(' dayList.value', dayList.value);
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
    1: "一季度",
    2: "二季度",
    3: "三季度",
    4: "四季度",
  };
  let result = {
    // name: data[0].month.slice(0,4),
    dataList: [],
    categories: [],
  };
  let yearMap = {}; // 按年份分组
  // data.forEach((item) => {
  //   // 遍历插入数据
  //   if (!yearMap[item.year]) {
  //     yearMap[item.year] = {
  //       name: item.year,
  //       year: item.year,
  //       data: [],
  //       quarter: [],
  //     };
  //   }
  //   yearMap[item.year].data.push(item.new_birds_count);
  //   yearMap[item.year].quarter.push(quarterMap[item.quarter]);
  // });
  data.forEach((item) => {
    const quarter=quarterMap[item.quarter]
    result.categories.push(quarter);
    result.dataList.push(item.new_birds_count);
  });
  return result;
};
//日增长
const configuredDayBrids = (data) => {
  // console.log('年',data[0].momth.slice(0,4));
  
  let result = {
    // name: data[0].month.slice(0,4),
    dataList: [],
    categories: [],
  };

  data.forEach((item) => {
    result.categories.push(item.month);
    result.dataList.push(item.new_birds_count);
  });

  return result;
};
const videoCode = ref('9dd014fd77964be29b236769949dfbdf');
const birdVideoSrc = ref('ws://135.131.1.10:559/openUrl/39wIwdq')
const videoContainer = ref(null)
const videoWidth = ref(730);
const videoHeight = ref(393);
const cameraParams = ref({
  cameraIndexCode: '9dd014fd77964be29b236769949dfbdf',
  protocol: 'ws'
})
const getCameraEqui = async (params) => {
  try {
    const res = await getCameraEquipment(params)
    if (res.code == 0) {
      // console.log('code为0')
      // console.log('res', res)
      birdVideoSrc.value = res.data.url
    }
    // console.log('birdVideoSrc.value', birdVideoSrc.value)
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
  beginTime1: '',
  endTime1: ''
})
const deviceOptions = ref([]);
//鸟类统计数量
const birdsStaticList = ref([]);

//地点搜索下拉列表
const getPlaceListOptions = async () => {
  try {
    const data = await getPlaceList()
    deviceOptions.value = data.data.map(item => { return { id: item.cameraIndexCode, name: item.cameraName } });
  } catch (error) {
    console.error('Error fetching second options:', error);
  }
}
//下拉框选项映射
const deviceMapName = computed(() => {
  let obj = deviceOptions.value.find(item => item.id == birdParam.value.deviceId)
  return obj?.name || "==请选择==";
})

//获取地点搜索数据
const getBirdsSearchByPlace = async (params) => {
  try {
    const data = await getSearchByPlace(params);

    birdsStaticList.value = data.data.filter((item, index) => index <= 5)
    // console.log('birdsStaticList.value', birdsStaticList.value)
  } catch (error) {
    console.error('实时监控错误！', error);
  }
}
//列表选项触发鸟类搜索数据函数
const deviceChange = (command) => {
  birdParam.value.cameraIndexCode = command;

  getBirdsSearchByPlace(birdParam.value)
}
//选择日期触发鸟类搜索数据函数
watch(() => [birdParam.value.beginTime, birdParam.value.endTime], ([newBeginTime, newEndTime]) => {
  if (newBeginTime) {
    // 将 newBeginTime 转换为北京时间，并格式化为 "YYYY-MM-DD 00:00:00"
    birdParam.value.beginTime = dayjs(newBeginTime).format('YYYY-MM-DD 00:00:00');
  }
  if (newEndTime) {
    // 将 newEndTime 转换为北京时间，并格式化为 "YYYY-MM-DD 23:59:59"
    birdParam.value.endTime = dayjs(newEndTime).format('YYYY-MM-DD 23:59:59');
  }
  // console.log('Date range changed:', newBeginTime, newEndTime);
  getBirdsSearchByPlace(birdParam.value)
});
//日期选择器弹出海康插件隐藏
const startTimeFocus = () => {
  nextTick(() => {
    if (birdVideo.value) {
      birdVideo.value.HideWnd()
    }
  });
};
//日期选择器弹关闭海康插件显示
const startTimeBlur = () => {
  nextTick(() => {
    if (birdVideo.value) {
      birdVideo.value.ShowWnd()
    }
  });
}
//日期选择器弹出海康插件隐藏
const endTimeFocus = () => {
  nextTick(() => {
    if (birdVideo.value) {
      birdVideo.value.HideWnd()
    }
  });
};
//日期选择器弹关闭海康插件显示
const endTimeBlur = () => {
  nextTick(() => {
    if (birdVideo.value) {
      birdVideo.value.ShowWnd()
    }
  });
}

const handleDateChange = (pickerRefName) => {
  // 日期选择器值发生变化时，确保海康插件隐藏
  nextTick(() => {

    if (birdVideo.value) {
      birdVideo.value.ShowWnd();
    }
  });
};


//=======================================实时监测===========================
const places = ref([])
const asyncRealTimeMonitor = async () => {
  try {
    const data = await getRealTimeMonitoring()
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
  bId: "",
  beginTime2: '',
  endTime2: ''
})
const birdOptions = ref([]);

//种类搜索下拉框列表
const getBirdsSpeciesList = async () => {
  try {
    const data = await getSpeciesList();
    birdOptions.value = data.data.map(item => { return { id: item.bId, name: item.bCName } });
  } catch (error) {
    console.error('实时监控错误！', error);
  }
}
//种类搜索下拉框映射
const deviceMapName2 = computed(() => {
  let obj = birdOptions.value.find(item => item.id == birdParam2.value.bId)
  return obj?.name || "==请选择==";
})
//种类搜索设备数据
const getDevicesBySpecies = async (params) => {
  try {
    const data = await getSearchBySpecies(params);

    birdsStaticList2.value = data.data.filter((item, index) => index <= 5)
    // console.log('birdsStaticList.value', birdsStaticList.value)
  } catch (error) {
    console.error('实时监控错误！', error);
  }
}
//条件选择事件
const birdChange = (command) => {
  birdParam2.value.bId = command;
  getDevicesBySpecies(birdParam2.value)
}
//选择日期触发鸟类搜索数据函数
watch(() => [birdParam.value.beginTime2, birdParam.value.endTime2], ([newBeginTime, newEndTime]) => {
  if (newBeginTime) {
    // 将 newBeginTime 转换为北京时间，并格式化为 "YYYY-MM-DD 00:00:00"
    birdParam.value.beginTime = dayjs(newBeginTime).format('YYYY-MM-DD 00:00:00');
  }
  if (newEndTime) {
    // 将 newEndTime 转换为北京时间，并格式化为 "YYYY-MM-DD 23:59:59"
    birdParam.value.endTime = dayjs(newEndTime).format('YYYY-MM-DD 23:59:59');
  }
  // console.log('Date range changed:', newBeginTime, newEndTime);
  getDevicesBySpecies(birdParam2.value)
});
//点击云台展示抓拍数据
const imgUrl = ref(null);
const currentCameraCode = ref(null);

const popUpSnapshot = async (code) => {
  if (imgUrl.value && currentCameraCode.value === code) {
    // 如果图片已经显示并且是同一个相机，点击关闭
    imgUrl.value = null;
    currentCameraCode.value = null;
  } else {
    // 如果是新的相机，获取新的数据
    try {
      const res = await getSnapshotBySpecies({code});
      imgUrl.value = res.data.recognition;
      currentCameraCode.value = code; // 保存当前相机代码
    } catch (error) {
      console.error('实时抓拍错误！', error);
    }
  }
};

const handleClickOutside = (event) => {
  const imgElement = event.target.closest('img');
  if (!imgElement) {
    imgUrl.value = null; // 隐藏图片
    currentCameraCode.value = null; // 重置当前相机代码
  }
};
//================鸟类展示==============
const discription = ref({})
const getBirdInfo = async (id) => {
  try {
    const data = await getBirdDetail({ boId: id })
    discription.value = data.data;
  } catch (error) {
    console.error('Error fetching birds:', error);
  }
}

const fetchData = async () => {
  if (isFetching) return; // 如果正在获取数据，直接返回
  isFetching = true; // 标记正在获取数据
  try {
    await Promise.all([
      getPlaceListOptions(),
      getBirdsSearchByPlace(birdParam.value),
      getBirdsSpeciesList(),
      getDevicesBySpecies(birdParam2.value),
      getBirdsList(),
      asyncRealTimeMonitor()//实时监控
    ]);
    // console.log('进入')
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching = false; // 请求完成，重置标志
  }
}
const startPolling = async () => {

  await fetchData(); // 初始加载数据

  intervalId = setInterval(fetchData, 3 * 60000); // 每隔3分钟秒获取一次数据
  // intervalId = setInterval(fetchData, 10000); // 每隔10秒获取一次数据
};
const stopPolling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};
onMounted(() => {
  // getCameraEqui(cameraParams.value)
  startPolling();
  updateVideoDimensions()
  window.addEventListener('resize', updateVideoDimensions)
});
onUnmounted(() => {
  stopPolling();
});


</script>

<style lang="scss">
// 这里是下拉框的样式，需要修改什么样式，就直接通过浏览器查看你要改的样式，然后就改就行
.popperClass {

  //图标样式
  .el-icon {
    color: #030636;
  }

  //头部样式
  .el-date-picker__header-label {
    color: #fff;
    font-size: 18px;

  }

  // 星期样式
  .el-date-table th {
    color: #fff;

  }

  // 时间选择器层样式
  .el-picker-panel {
    z-index: 2007;
    color: #fff;
    background: #030636;
    border: 1px solid rgba(29, 128, 218, 1);

  }
}

// 输入框的样式在这里改就行
.time-box {
  .el-input__wrapper {
    background-color: #030636;
    border: 1px solid rgba(29, 128, 218, 1);
    box-shadow: none;
    // width: 50px;
  }

  .el-input__inner {
    color: #ffffff;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__wrapper {
    background-color: #030636 !important;
    /* 替换为你想要的背景颜色 */
    color: #ffffff !important;
    /* 确保文本颜色适应新的背景颜色 */
    border: none;
    /* 如果你想去掉边框 */
    width: 120px;
  }

  .el-input__wrapper:hover {
    box-shadow: none;
  }

  .el-input {
    --el-input-focus-border-color: transparent;
    --el-input-border: none;
  }

  .el-popper.is-light {
    background: #255783;
    border: 1px solid #106c94;
  }
}

// 弹出框popper层样式
.el-picker__popper.el-popper {

  background: rgba(30, 84, 128, 0.8);
  border: 1px solid rgba(29, 128, 218, 1);
  box-shadow: rgba(30, 84, 128, 0.8);
}

// 弹出框外部尖三角样式
.el-popper.is-light .el-popper__arrow::before {
  border: 1px solid rgba(29, 128, 218, 1);
  background: rgba(29, 128, 218, 1);
}
</style>
<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: #030025;
  color: #FFFFFF;

  :deep(.el-dropdown-link) {
    width: 120px;
    // line-height: 30px;
    margin-right: 10px;
    border: none;
    color: #FFFFFF;
    text-align: center;
    border: 1px solid #106c94;
    border-radius: 5px;
    // background-image: url('/cut/bird/bird1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }


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

    .area {
      span {
        margin: 0 5px;
        height: 40px;
        line-height: 40px;
      }
    }

    .bird {
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
          line-height: 60px;
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
      width: 530px;
      height: 300px;
      margin: 20px 0 0 10px;
      border: 1px solid #021757;
      background-color: #030636;
      position: relative;

      .snapshot-img {}

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


      .animal-content {
        padding: 10px;
        height: auto;
        overflow: hidden;

        .family {
          height: 384px;

          color: #4DA6FF;
          margin: 10px 0;
          line-height: 1.8;
          /* 调整行间距 */
          font-size: 18px;
          /* 设置字体大小 */
          letter-spacing: 2px;
          /* 多行文本省略号 */
        }

        img {
          margin-right: 10px;
          float: left;
          width: 250px;
          height: 180px;
          border-radius: 10px;
        }
      }
    }

  }
}
</style>
