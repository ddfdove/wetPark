<template>
    <div class="container">
        <div class="left">
            <ul>
                <li>
                    <AreaChart
                        :dataList="{ soilTemperatureList: soilChartData.dataList.soilTemperatureList, thirdPartySoilTemperatureList: thirdSoilChartData.SoilTemperatureList }"
                        :categories="soilChartData.soilCollectTimeList" :isExcellent="soilChartData.isSoilExcellent">
                    </AreaChart>
                </li>
                <li>
                    <BarChart :dataList="{ soilNitrogenList: soilChartData.dataList.soilNitrogenList }"
                        :categories="soilChartData.soilCollectTimeList" :isExcellent="soilChartData.isSoilExcellent">
                    </BarChart>
                </li>
                <li>
                    <lineChart
                        :dataList="{ soilMoistureList: soilChartData.dataList.soilMoistureList, thirdPartySoilHumidityList: thirdSoilChartData.SoilHumidityList }"
                        :categories="soilChartData.soilCollectTimeList" :isExcellent="soilChartData.isSoilExcellent">
                    </lineChart>
                </li>
            </ul>
        </div>
        <div class="middle">
            <div class="btn-group">
                <el-button @click="fetchRealTimeData">
                    <i class="iconfont icon-gengduoshuangjiantou" style="font-size: 12px;margin-right: 8px;"></i>
                    实时数据
                </el-button>
                <el-button @click="fetchAnnualData">
                    <i class="iconfont icon-gengduoshuangjiantou" style="font-size: 12px;margin-right: 8px;"></i>
                    年度数据
                </el-button>
                <el-button @click=" $router.push({ path: '/monitor/environment' })">
                    <i class="iconfont icon-gengduoshuangjiantou" style="font-size: 12px;margin-right: 8px;"></i>
                    返回
                </el-button>
            </div>
            <div class="environment">
                <ul>
                    <li>
                        <BarChart
                            :dataList="{ soilConductivityList: soilChartData.dataList.soilConductivityList, thirdPartySoilElectricalConductivityList: thirdSoilChartData.SoilElectricalConductivityList }"
                            :categories="soilChartData.soilCollectTimeList"
                            :isExcellent="soilChartData.isSoilExcellent" :height="270">
                        </BarChart>
                    </li>
                    <li>
                        <AreaRangeChart :dataList="soilChartData.dataList"
                            :categories="soilChartData.soilCollectTimeList"
                            :isExcellent="soilChartData.isSoilExcellent">
                        </AreaRangeChart>
                    </li>
                    <li>
                        <div style="margin: 0;padding: 0;">
                            <el-table :data="waterMonitorInfo" height="260"
                                style="width: 800px;background-color: #030632;color:#ffffff"
                                :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle"
                                :row-style="rowStyle" :cell-style="cellStyle">
                                <el-table-column type="index" width="60" label="序号" />
                                <el-table-column prop="sdName" label="设备名称" width="80"></el-table-column>
                                <el-table-column prop="ph" label="pH值" width="70"></el-table-column>
                                <el-table-column prop="soilTemperature" label="温度" width="70"></el-table-column>
                                <el-table-column prop="soilMoisture" label="湿度" width="70"></el-table-column>
                                <el-table-column prop="conductivity" label="电导率" width="70"></el-table-column>
                                <el-table-column prop="nitrogenContent" label="氮含量" width="70"></el-table-column>
                                <el-table-column prop="phosphorusContent" label="磷含量" width="70"></el-table-column>
                                <el-table-column prop="potassiumContent" label="钾含量" width="70"></el-table-column>
                                <el-table-column prop="collectTime" label="收集时间" width="110" sortable></el-table-column>
                                <el-table-column prop="collectPlace" label="收集地点" width="110" fixed="right" sortable>
                                    <template #default="{ row }">
                                        {{ row.collectPlace == null ? '无' : row.collectPlace }}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination background layout="prev, pager, next" :total="total" :page-size="waterInfoParams.pageSize"
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
                    <AreaChart
                        :dataList="{ soilPHList: soilChartData.dataList.soilPHList, thirdPartySoilPhList: thirdSoilChartData.SoilPhList }"
                        :categories="soilChartData.soilCollectTimeList" :isExcellent="soilChartData.isSoilExcellent">
                    </AreaChart>
                </li>
                <li>
                    <BarChart :dataList="{ soilPhosphorusList: soilChartData.dataList.soilPhosphorusList }"
                        :categories="soilChartData.soilCollectTimeList" :isExcellent="soilChartData.isSoilExcellent">
                    </BarChart>
                </li>
                <li>
                    <lineChart :dataList="{ soilPotassiumList: soilChartData.dataList.soilPotassiumList }"
                        :categories="soilChartData.soilCollectTimeList" :isExcellent="soilChartData.isSoilExcellent">
                    </lineChart>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute } from 'vue-router';
import { useDataStore } from '@/store/modules/data.js'
import { useParkStore } from '@/store/modules/park.js'
import { getSoilEquMonitorInfo, getThirdSoilData } from '@/api/index.js'
import AreaChart from '../../../components/chart/area.vue'
import BarChart from '../../../components/chart/bar.vue'
import LineChart from '../../../components/chart/line.vue'
import AreaRangeChart from '../../../components/chart/arearange.vue'
import * as mapping from '@/utils/mapping.js'



const parkStore = useParkStore()
const store = useDataStore(); // 使用 Pinia store
let intervalId = null;
let isFetching = false;
const params = ref({
  timeType: 4,
  number: 5,
  parkId:1
})
const setParams = (type, number, parkId) => {
  if(type) params.value.timeType = type
  if(number) params.value.number = number
  if(parkId) params.value.parkId = parkId
}
const waterInfoParams=ref({
  pageSize: 10,
  pageNum: 1,
  parkId:1
})
const setWaterParamsData = (id) => {
  // if(pageSize)  waterInfoParams.value.pageSize=pageSize
  // if(pageNum)  waterInfoParams.value.pageNum=pageNum
  waterInfoParams.value.parkId=id
}
//表格数据土壤信息
const waterMonitorInfo = ref([])
const total = ref(0)

//土壤数据
const soilChartData = ref({
    dataList: {
        soilPHList: [],  //土壤PH值
        soilTemperatureList: [],  //土壤温度
        soilMoistureList: [],  //土壤湿度
        soilConductivityList: [],  //土壤电导率
        soilNitrogenList: [],  //土壤氮含量
        soilPhosphorusList: [],  //土壤磷含量
        soilPotassiumList: []  //土壤钾含量
    },
    soilCollectTimeList: [],
    isSoilExcellent: []
})

//第三方土壤数据
const thirdSoilChartData = ref({
    SoilTemperatureList: [],    // 土壤温度
    SoilHumidityList: [],  // 土壤湿度
    SoilElectricalConductivityList: [],  // 土壤电导率
    SoilPhList: [],  // 土壤pH值
})

//获取土壤监测信息
const getSoilMonInfo = async (data) => {
    try {
        const res = await getSoilEquMonitorInfo(waterInfoParams.value);
        if (res.code === 0) {
            waterMonitorInfo.value = res.data.map(item => {
                return {
                    sdName: item.sdName,
                    collectTime: item.collectTime,
                    ph: item.phLevel,
                    soilTemperature: item.soilTemperature,
                    soilMoisture: item.soilMoisture,
                    conductivity: item.conductivity,
                    nitrogenContent: item.nitrogenContent,
                    phosphorusContent: item.phosphorusContent,
                    potassiumContent: item.potassiumContent
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

const fetchData = async () => {
    if (isFetching) return; // 如果正在获取数据，直接返回
    isFetching = true; // 标记正在获取数据
    try {
        await Promise.all([
            store.getSoilData(params.value),
            getSoilMonInfo()
        ]);

        mapping.mappingSoil(store.soilData.value, soilChartData.value)
        if (params.value.number === 12) {
            soilChartData.value.soilCollectTimeList = soilChartData.value.soilCollectTimeList.map(item => {
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
        const response = await getThirdSoilData({ year: currentYear }); // 需要根据你的实际 API 调整
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
    thirdSoilChartData.value = {
        SoilTemperatureList: [],    // 土壤温度
        SoilHumidityList: [],  // 土壤湿度
        SoilElectricalConductivityList: [],  // 土壤电导率
        SoilPhList: [],  // 土壤pH值
    }
    const thirdPartyData = await fetchThirdPartyData(); // 获取第三方数据
    thirdPartyData.forEach(item => {
        // soilCollectTimeList.value.push(item.month);
        thirdSoilChartData.value.SoilTemperatureList.push(item.soilTemperature);
        thirdSoilChartData.value.SoilHumidityList.push(item.soilHumidity);
        thirdSoilChartData.value.SoilElectricalConductivityList.push(item.soilElectricalConductivity);
        thirdSoilChartData.value.SoilPhList.push(item.soilPh);
    });

};
//获取实时数据
const fetchRealTimeData = () => {
    setParams(4, 5); // 设置为实时数据
    fetchData(); // 获取数据
    thirdSoilChartData.value = {
        SoilTemperatureList: [],    // 土壤温度
        SoilHumidityList: [],  // 土壤湿度
        SoilElectricalConductivityList: [],  // 土壤电导率
        SoilPhList: [],  // 土壤pH值
    }
};
const handlePageChange = (newPage) => {
    waterInfoParams.value.pageNum = newPage;
    getSoilMonInfo(waterInfoParams.value)
};

const startPolling = () => {
    fetchData(); // 初始加载数据
    // intervalId = setInterval(fetchData, 3 * 60000); // 每隔3分钟秒获取一次数据
    intervalId = setInterval(fetchData, 10000); // 每隔3分钟秒获取一次数据
};

const stopPolling = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
};

onMounted(async() => {
    await setParams(4,5,parkStore.parkId)
    await setWaterParamsData(parkStore.parkId)
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
        // fontSize: '18px'

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

    .left {
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

    .middle {
        flex: 1.2;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        padding-top: 20px;

        .btn-group {
            display: flex;
            justify-content: space-evenly;
            position: absolute;
            /* 使用绝对定位 */
            top: 5px;
            /* 根据需要调整位置 */
            left: 0;
            right: 0;
            margin-bottom: 10px;
            z-index: 100;

            .el-button {
                background-color: #021f66;
                /* 设置按钮背景颜色 */
                color: white;
                /* 设置按钮文字颜色 */
                border: none;
                /* 去掉边框 */
            }

            .el-button:hover {
                color: aquamarine
            }
        }

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
