<template>
  <div class="container">
    <div class="left">
      <ul>
        <li>
          <AreaChart
            :dataList="{ waterTemperatureList: waterChartData.dataList.waterTemperatureList, thirdPartyWaterTemperatureList: thirdWaterChartData.WaterTemperatureList }"
            :categories="waterChartData.waterCollectTimeList" :isExcellent="waterChartData.isWaterExcellent">
          </AreaChart>
        </li>
        <li>
          <BarChart
            :dataList="{ waterTurbidityList: waterChartData.dataList.waterTurbidityList, thirdPartyWaterTurbidityList: thirdWaterChartData.WaterTurbidityList }"
            :categories="waterChartData.waterCollectTimeList" :isExcellent="waterChartData.isWaterExcellent">
          </BarChart>
        </li>
        <li>
          <lineChart
            :dataList="{ waterDissolvedOxygenList: waterChartData.dataList.waterDissolvedOxygenList, thirdPartyWaterDissolvedOxygenList: thirdWaterChartData.WaterDissolvedOxygenList }"
            :categories="waterChartData.waterCollectTimeList" :isExcellent="waterChartData.isWaterExcellent">
          </lineChart>
        </li>
      </ul>
    </div>
    <div class="middle">
      <button class="moreButton" @click=" $router.push({ path: '/monitor/environment' })">
        <i class="iconfont icon-gengduoshuangjiantou" style="font-size: 12px;margin-right: 8px;"></i>
        <span>返回</span>
      </button>
      <button class="moreButton2" @click="fetchAnnualData">
        <i class="iconfont icon-gengduoshuangjiantou" style="font-size: 12px;margin-right: 8px;"></i>
        <span>年度数据</span>
      </button>
      <button class="moreButton3" @click="fetchRealTimeData">
        <i class="iconfont icon-gengduoshuangjiantou" style="font-size: 12px;margin-right: 8px;"></i>
        <span>实时数据</span>
      </button>
      <div class="environment">
        <ul>
          <li>
            <AreaRangeChart :dataList="waterChartData.dataList" :categories="waterChartData.waterCollectTimeList"
              :isExcellent="waterChartData.isWaterExcellent" name="水质" height="500">
            </AreaRangeChart>
          </li>
          <li>
            <div class="table-wrapper">
              <div class="table-container">
                <el-table :data="waterMonitorInfo" height="370"
                  style="width: 720px;background-color: #030632;color:#ffffff;margin-bottom: 5px;"
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
                  <el-table-column prop="collectTime" label="收集时间" width="130" sortable></el-table-column>
                  <el-table-column prop="collectPlace" label="收集地点" width="110" fixed="right" sortable>
                    <template #default="{ row }">
                      {{ row.collectPlace == null ? '无' : row.collectPlace }}
                    </template>
                  </el-table-column>
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
            <AreaChart
              :dataList="{ waterPHList: waterChartData.dataList.waterPHList, thirdPartyWaterPhList: thirdWaterChartData.WaterPhList }"
              :categories="waterChartData.waterCollectTimeList" :isExcellent="waterChartData.isWaterExcellent">
            </AreaChart>
          </div>
        </li>
        <li>
          <div>
            <BarChart :dataList="{ waterChlorophyllList: waterChartData.dataList.waterTurbidityList }"
              :categories="waterChartData.waterCollectTimeList" :isExcellent="waterChartData.isWaterExcellent">
            </BarChart>
          </div>
        </li>
        <li>
          <div>
            <lineChart
              :dataList="{ waterConductivityList: waterChartData.dataList.waterConductivityList, thirdPartyWaterElectricalConductivityList: thirdWaterChartData.WaterElectricalConductivityList }"
              :categories="waterChartData.waterCollectTimeList" :isExcellent="waterChartData.isWaterExcellent">
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
import { getWaterEquMonitorInfo, getThirdWaterData } from '@/api/index.js'
import AreaChart from '../components/area.vue'
import AreaRangeChart from '../components/arearange.vue'
import BarChart from '../components/bar.vue'
import lineChart from '../components/line.vue'
import * as mapping from '@/utils/mapping.js'


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
const waterChartData = ref({
  dataList: {
    waterPHList: [],  //PH值
    waterDissolvedOxygenList: [], //溶解氧值
    waterTurbidityList: [],      //浊度
    waterTemperatureList: [],     //水温
    waterChlorophyllList: [],    //叶绿素
    waterConductivityList: [],   //导电率
  },
  waterCollectTimeList: [],
  isWaterExcellent: []
})

//第三方水数据
const thirdWaterChartData = ref({
  WaterPhList: [],    //PH值
  WaterTemperatureList: [],  //水温
  WaterElectricalConductivityList: [],  //电导率
  WaterDissolvedOxygenList: [],  //溶解氧值
  WaterTurbidityList: [],  //浊度
})
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
      store.getWaterData(params.value),
      getWaterMonInfo(data.value)
    ]);
    mapping.mappingWater(store.waterData.value, waterChartData.value)
    if (params.value.number === 12) {
      waterChartData.value.waterCollectTimeList = waterChartData.value.waterCollectTimeList.map(item => {
        return item.slice(5, 7) + '月'; // 提取月份并加上“月”
      });
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching = false; // 请求完成，重置标志
  }
};
//获取第三方数据
const fetchThirdPartyData = async () => {
  let today = new Date();
  let currentYear = today.getFullYear();
  try {
    const response = await getThirdWaterData({ year: currentYear }); // 需要根据你的实际 API 调整
    return response; // 返回数据
  } catch (error) {
    console.error('获取第三方数据失败', error);
    return null; // 返回 null 表示获取失败
  }
};
//获取年度数据
const fetchAnnualData = async () => {
  setParams(2, 12); // 设置为年度数据
  await fetchData(); // 获取数据
  thirdWaterChartData.value = {
    WaterPhList: [],    //PH值
    WaterTemperatureList: [],  //水温
    WaterElectricalConductivityList: [],  //电导率
    WaterDissolvedOxygenList: [],  //溶解氧值
    WaterTurbidityList: [],  //浊度
  }
  const thirdPartyData = await fetchThirdPartyData(); // 获取第三方数据
  thirdPartyData.forEach(item => {
    thirdWaterChartData.value.WaterPhList.push(item.waterPh);
    thirdWaterChartData.value.WaterTemperatureList.push(item.waterTemperature);
    thirdWaterChartData.value.WaterElectricalConductivityList.push(item.ricalConductivity);
    thirdWaterChartData.value.WaterDissolvedOxygenList.push(item.waterDissolvedOxygen);
    thirdWaterChartData.value.WaterTurbidityList.push(item.waterTurbidity);
  });
};
//获取实时数据
const fetchRealTimeData = () => {
  setParams(null, 5); // 设置为实时数据
  fetchData(); // 获取数据
  thirdWaterChartData.value = {
    WaterPhList: [],    //PH值
    WaterTemperatureList: [],  //水温
    WaterElectricalConductivityList: [],  //电导率
    WaterDissolvedOxygenList: [],  //溶解氧值
    WaterTurbidityList: [],  //浊度
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
    z-index: 99;
  }

  .moreButton:hover {
    color: aquamarine
  }

  .moreButton2 {

    position: absolute;
    top: 0px;
    right: 260px;
    width: 100px;
    height: 30px;
    border: none;
    background-color: #021f66;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    z-index: 99;
  }

  .moreButton2:hover {
    color: aquamarine
  }

  .moreButton3 {

    position: absolute;
    top: 0px;
    right: 500px;
    width: 100px;
    height: 30px;
    border: none;
    background-color: #021f66;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    z-index: 99;
  }

  .moreButton3:hover {
    color: aquamarine
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
