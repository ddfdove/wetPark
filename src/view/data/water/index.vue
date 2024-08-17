<template>
  <div class="container">
    <div class="left">
      <ul>
        <li>
          <AreaChart :dataList="{ waterTemperatureList }" :categories="waterCollectTimeList"
            :isExcellent="isWaterExcellent">
          </AreaChart>
        </li>
        <li>
          <BarChart :dataList="{ waterTurbidityList }" :categories="waterCollectTimeList"
            :isExcellent="isWaterExcellent">
          </BarChart>
        </li>
        <li>
          <lineChart :dataList="{ waterDissolvedOxygenList }" :categories="waterCollectTimeList"
            :isExcellent="isWaterExcellent">
          </lineChart>
        </li>
      </ul>
    </div>
    <div class="middle">
      <button class="moreButton" @click=" $router.push({ path: '/monitor/environment' })">
          <i class="iconfont icon-gengduoshuangjiantou" style="font-size: 12px;margin-right: 8px;"></i>
          <span>BACK</span>
        </button>
      <div class="environment">
        <ul>
          <li>
            <AreaRangeChart
              :dataList="{ waterPHList, waterDissolvedOxygenList, waterTurbidityList, waterTemperatureList, waterChlorophyllList, waterConductivityList }"
              :categories="waterCollectTimeList" :isExcellent="isWaterExcellent" name="水质" height="500">
            </AreaRangeChart>
          </li>
          <li>
            <div class="table-wrapper">
              <div class="table-container">
                <el-table :data="waterMonitorInfo" height="370"
                  style="width: 100%;background-color: #030632;color:#ffffff;margin-bottom: 5px;"
                  :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle" :row-style="rowStyle"
                  :cell-style="cellStyle">
                  <el-table-column type="index" width="60" label="序号" />
                  <el-table-column prop="edName" label="设备名称" width="80"></el-table-column>
                  <el-table-column prop="ph" label="pH值" width="70"></el-table-column>
                  <el-table-column prop="dissolvedOxygen" label="溶解氧" width="70"></el-table-column>
                  <el-table-column prop="turbidity" label="浊度" width="70"></el-table-column>
                  <el-table-column prop="waterConductivity" label="电导率" width="80"></el-table-column>
                  <el-table-column prop="waterTemperature" label="水温" width="80"></el-table-column>
                  <el-table-column prop="chlorophyll" label="叶绿素" width="70"></el-table-column>
                  <el-table-column prop="collectTime" label="收集时间" width="130" fixed="right" sortable></el-table-column>
                </el-table>
              </div>
              <el-pagination background layout="prev, pager, next" :total="total" :page-size="data.pageSize"
                @current-change="handlePageChange">
              </el-pagination>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <ul>
        <li>
          <div>
            <AreaChart :dataList="{ waterPHList }" :categories="waterCollectTimeList" :isExcellent="isWaterExcellent">
            </AreaChart>
          </div>
        </li>
        <li>
          <div>
            <BarChart :dataList="{ waterChlorophyllList }" :categories="waterCollectTimeList"
              :isExcellent="isWaterExcellent">
            </BarChart>
          </div>
        </li>
        <li>
          <div>
            <lineChart :dataList="{ waterConductivityList }" :categories="waterCollectTimeList"
              :isExcellent="isWaterExcellent">
            </lineChart>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useDataStore } from '@/store/modules/data.js'
import { getWaterEquMonitorInfo } from '@/api/index.js'
import AreaChart from '../components/area.vue'
import AreaRangeChart from '../components/arearange.vue'
import BarChart from '../components/bar.vue'
import lineChart from '../components/line.vue'


let intervalId = null;
let isFetching = false;
const params = ref({
  timeType: null,
  number: 5
})
const setParams = (type, number) => {
  params.value.timeType = type
  params.value.number = number
}
const data = ref({
  pageSize: 10,
  pageNum: 1
})
//表格数据水质信息
const waterMonitorInfo = ref([])
const total = ref(0)
//水数据
const waterCollectTimeList = ref([])
const isWaterExcellent = ref([])
const waterPHList = ref([])  //PH值
const waterDissolvedOxygenList = ref([]) //溶解氧值
const waterTurbidityList = ref([])  //浊度
const waterTemperatureList = ref([]) //水温
const waterChlorophyllList = ref([]) //叶绿素
const waterConductivityList = ref([]) //导电率


//土壤数据
const soilCollectTimeList = ref([])
const isSoilExcellent = ref([])
const soilPHList = ref([])  //土壤PH值
const soilTemperatureList = ref([])  //土壤温度
const soilMoistureList = ref([])  //土壤水分
const soilConductivityList = ref([])  //土壤电导率
const soilNitrogenList = ref([])  //土壤氮含量
const soilPhosphorusList = ref([])  //土壤磷含量
const soilPotassiumList = ref([])  //土壤钾含量

//环境数据
const evnCollectTimeList = ref([])
const isEnvExcellent = ref([])
const airTemperatureList = ref([])  //空气温度
const airHumidityList = ref([])  //空气湿度
const atmosphericPressureList = ref([])  //气压
const carbonDioxideList = ref([])  //二氧化碳
const sulfurDioxideList = ref([])  //二氧化硫
const totalRadiationList = ref([])  //总辐射
const windDirectionList = ref([])  //风向
const windSpeedList = ref([])  //风速
const rainfallList = ref([])  //降雨量
const pm25List = ref([])  //PM2.5

//映射水数据
const mappingWater = (waterData) => {
  console.log('函数和执行');
  waterCollectTimeList.value = waterData.collectTimeList;
  isWaterExcellent.value = waterData.mapList
  waterPHList.value = waterData.pHList;
  waterDissolvedOxygenList.value = waterData.doList;
  waterTurbidityList.value = waterData.tList;
  waterTemperatureList.value = waterData.wtList;
  waterChlorophyllList.value = waterData.wcList;
  waterConductivityList.value = waterData.cList;
}
//映射土壤数据
const mappingSoil = (soilData) => {
  soilCollectTimeList.value = soilData.collectTimeList;
  isSoilExcellent.value = soilData.mapList
  soilPHList.value = soilData.pHList;
  soilTemperatureList.value = soilData.stList;
  soilMoistureList.value = soilData.smList;
  soilConductivityList.value = soilData.scList;
  soilNitrogenList.value = soilData.sncList;
  soilPhosphorusList.value = soilData.sphcList;
  soilPotassiumList.value = soilData.spocList;
}

//映射环境数据
const mappingEnv = (envData) => {
  evnCollectTimeList.value = envData.collectTimeList;
  isEnvExcellent.value = envData.mapList
  airTemperatureList.value = envData.airTemperatureList;
  airHumidityList.value = envData.airHumidityList;
  atmosphericPressureList.value = envData.atmosphericPressureList;
  carbonDioxideList.value = envData.carbonDeviceList;
  sulfurDioxideList.value = envData.sulfurDioxideList;
  totalRadiationList.value = envData.totalRadiationList;
  windDirectionList.value = envData.windDirection360List;
  windSpeedList.value = envData.windSpeedList;
  rainfallList.value = envData.rainList;
  pm25List.value = envData.pm2_5List;
}
//获取水质监测信息
const getWaterMonInfo = async (data) => {
  try {
    const res = await getWaterEquMonitorInfo(data);
    if (res.code === 0) {
      waterMonitorInfo.value = res.data.map(item => {
        return {
          edName: item.edName,
          collectTime: item.collectTime,
          ph: item.ph,
          dissolvedOxygen: item.dissolvedOxygen,
          turbidity: item.turbidity,
          waterConductivity: item.waterConductivity,
          waterTemperature: item.waterTemperature,
          chlorophyll: item.chlorophyll
        }
      });
      total.value = res.total
    } else {
      console.error('失败:', res.message);
    }
  } catch (error) {
    console.error('获取失败', error);
  }
}
const store = useDataStore(); // 使用 Pinia store
const fetchData = async () => {
  if (isFetching) return; // 如果正在获取数据，直接返回
  isFetching = true; // 标记正在获取数据
  try {
    await Promise.all([
      setParams(null, 5),
      store.getWaterData(params.value),
      // store.getSoilData(params.value),
      // store.getEnvironmentData(params.value),
      getWaterMonInfo(data.value)
    ]);

    mappingWater(store.waterData.value)
    // mappingSoil(store.soilData.value)
    // mappingEnv(store.envData.value)

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching = false; // 请求完成，重置标志
  }
};
const handlePageChange = (newPage) => {
  data.value.pageNum = newPage;
  getWaterMonInfo(data.value)
};

const startPolling = () => {
  fetchData(); // 初始加载数据
  intervalId = setInterval(fetchData, 3 * 60000); // 每隔3分钟秒获取一次数据
};

const stopPolling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onMounted(() => {
  startPolling();
});

onUnmounted(() => {
  stopPolling();
});

const headerRowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "#428fdf",
    height: '60px',
    // fontSize: '16px'

  };
};
const headerCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: "0px",
    borderBottom: '1px solid #ffffff',
    border: "none",
    // width: '160px'

  };
};
const rowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
    borderBottom: '1px solid #ffffff',
    height: '60px',
    fontSize: '16px'
  };
};
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    // padding: '0px',
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderBottom: '1px dashed #0a559b',
  };
};
</script>


<style scoped lang="less">

:deep(.el-table__inner-wrapper::before) {
  height: 0px;
}

.container {
  display: flex;
  // padding: 20px;
  height: 100%;
  background-color: #030025;

  .moreButton {
   
    position: absolute;
    top: 0px;
    right: 20px;
    width: 100px;
    height: 30px;
    border: none;
    background-color: #021f66;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    z-index:99;
  }
  .moreButton:hover{
    color:aquamarine
  }
  .left {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;


    li {
      flex: 0.9;
      padding: 10px;
      margin: 10px 0;
    }

  }

  .middle {
    flex: 1.2;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;


    li {
      flex: 1;
      padding: 10px;
      margin: 10px 0;
    }
  }

  .right {
    flex: 0.9;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;


    li {
      flex: 1;
      padding: 10px;
      margin: 10px 0;
    }
  }
}
</style>

<style>
.el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
  background-color: skyblue;
  color: #151414;
}

.el-pagination.is-background .el-pager li {
  background-color: #0154ac;
  /* 修改未选中项背景和字体颜色 */
  color: #fff;
}

.el-pagination.is-background .el-pager li:hover {
  background-color: skyblue;
  color: #151414 !important;
  /* hover 时的文字颜色 */
}

.el-pagination.is-background .btn-prev.is-first,
.el-pagination.is-background .btn-next.is-last {
  background-color: #0154ac;
  /* 设置箭头按钮背景颜色 */
  color: #ffffff;
  /* 设置箭头按钮文字颜色 */
}

.el-pagination.is-background .btn-prev:hover,
.el-pagination.is-background .btn-next:hover {
  background-color: skyblue;
  /* 设置箭头按钮 hover 时的背景颜色 */
  color: #151414;
  /* 设置箭头按钮 hover 时的文字颜色 */
}
</style>
