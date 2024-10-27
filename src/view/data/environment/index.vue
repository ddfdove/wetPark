<template>
    <div class="container">
        <div class="left">
            <!-- <button class="moreButton" @click=" $router.push({ path: '/data/water' })">
                <i class="iconfont icon-gengduoshuangjiantou" style="font-size: 12px;margin-right: 8px;"></i>
                <span>MORE</span>
            </button> -->
            <!-- <panelboard :chTitle="'水质监测'" :enTitle="'Water quality Monitoring'"> -->
            <ul>
                <li>
                    <AreaChart
                        :dataList="{ airTemperatureList: envChartData.dataList.airTemperatureList, thirdPartyTempValueList: thirdenvChartData.thirdPartyTempValueList }"
                        :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent">
                    </AreaChart>
                </li>
                <li>

                    <lineChart
                        :dataList="{ carbonDioxideList: envChartData.dataList.carbonDioxideList, sulfurDioxideList: envChartData.dataList.sulfurDioxideList, thirdPartyEryangValueList: thirdenvChartData.thirdPartyEryangValueList }"
                        :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent">
                    </lineChart>


                </li>

                <li>
                    <AreaChart :dataList="{ totalRadiationList: envChartData.dataList.totalRadiationList }"
                        :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent">
                    </AreaChart>


                </li>
            </ul>
            <!-- </panelboard> -->
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
                        <PolarChart :dataList="{ windSpeedList: envChartData.dataList.windSpeedList }"
                            :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent">
                        </PolarChart>
                    </li>
                    <li>
                        <PieChart :dataList="{ pm25List: envChartData.dataList.pm25List }"
                            :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent">
                        </PieChart>
                    </li>

                    <li>
                        <PolarChart :dataList="{ windDirectionList: envChartData.dataList.windDirectionList }"
                            :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent">
                        </PolarChart>
                    </li>
                </ul>
                <!-- </panelboard> -->
            </div>

        </div>
        <div class="right">
            <ul>
                <li>
                    <div>
                        <AreaChart
                            :dataList="{ airHumidityList: envChartData.dataList.airHumidityList, thirdPartyHumidityValueList: thirdenvChartData.thirdPartyHumidityValueList }"
                            :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent">
                        </AreaChart>
                    </div>
                </li>
                <li>
                    <div>
                        <BarChart
                            :dataList="{ rainfallList: envChartData.dataList.rainfallList, thirdPartyRainfallValueList: thirdenvChartData.thirdPartyRainfallValueList }"
                            :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent">
                        </BarChart>
                    </div>
                </li>
                <li>
                    <div>
                        <AreaChart
                            :dataList="{ atmosphericPressureList: envChartData.dataList.atmosphericPressureList }"
                            :categories="envChartData.envCollectTimeList" :isExcellent="envChartData.isEnvExcellent">
                        </AreaChart>
                    </div>
                </li>
            </ul>
            <!-- </panelboard> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute } from 'vue-router';
import { useDataStore } from '@/store/modules/data.js'
import { useParkStore } from '@/store/modules/park.js'
import { getThirdEnvironmentData } from '@/api/index.js'
import * as mapping from '@/utils/mapping.js'
import AreaChart from '../components/area.vue'
import BarChart from '../components/bar.vue'
import PieChart from '../components/pie.vue'
import lineChart from '../components/line.vue'
import PolarChart from '../components/polar.vue'



const parkStore = useParkStore()

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

//环境数据
const envChartData = ref({
    dataList: {
        airTemperatureList: [],  //空气温度
        airHumidityList: [],  //空气湿度
        atmosphericPressureList: [],  //气压
        carbonDioxideList: [],  //二氧化碳
        sulfurDioxideList: [], //二氧化硫
        totalRadiationList: [],  //总辐射
        windDirectionList: [],  //风向
        windSpeedList: [],  //风速
        rainfallList: [],  //降雨量
        pm25List: []  //PM2.5
    },
    envCollectTimeList: [],
    isEnvExcellent: []  //优良指标
})

//第三方环境数据
const thirdenvChartData = ref({
    thirdPartyEryangValueList: [], // 二氧化碳
    thirdPartyYqValueList: [],    // 氧气值
    thirdPartyPm25ValueList: [],   // PM2.5值
    thirdPartyPm10ValueList: [],  // PM10值
    thirdPartyTempValueList: [],  // 温度值
    thirdPartyHumidityValueList: [], // 湿度值
    thirdPartyWindDirectionValueList: [], // 风向值
    thirdPartyWindSpeedValueList: [], // 风速值
    thirdPartyRainfallValueList: [], // 降雨量值
})

const store = useDataStore(); // 使用 Pinia store
const fetchData = async () => {
    if (isFetching) return; // 如果正在获取数据，直接返回
    isFetching = true; // 标记正在获取数据
    try {
        await Promise.all([
            store.getEnvironmentData(params.value)
        ]);
        mapping.mappingEnv(store.envData.value, envChartData.value)
        if (params.value.number === 12) {
            envChartData.value.envCollectTimeList = envChartData.value.envCollectTimeList.map(item => {
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
        const response = await getThirdEnvironmentData({ year: currentYear }); // 需要根据你的实际 API 调整
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

    thirdenvChartData.value = {
        thirdPartyEryangValueList: [], // 二氧化碳
        thirdPartyYqValueList: [],    // 氧气值
        thirdPartyPm25ValueList: [],   // PM2.5值
        thirdPartyPm10ValueList: [],  // PM10值
        thirdPartyTempValueList: [],  // 温度值
        thirdPartyHumidityValueList: [], // 湿度值
        thirdPartyWindDirectionValueList: [], // 风向值
        thirdPartyWindSpeedValueList: [], // 风速值
        thirdPartyRainfallValueList: [], // 降雨量值
    }
    const thirdPartyData = await fetchThirdPartyData(); // 获取第三方数据
    thirdPartyData.forEach(item => {
        // console.log('item.month.slice(4,6)',item.month.slice(4,6));
        // evnCollectTimeList.value.push(item.month.slice(5, 7) + '月');
        thirdenvChartData.value.thirdPartyEryangValueList.push(item.eryangvalue);
        thirdenvChartData.value.thirdPartyYqValueList.push(item.yqvalue);
        thirdenvChartData.value.thirdPartyPm25ValueList.push(item.pm25value);
        thirdenvChartData.value.thirdPartyPm10ValueList.push(item.pm10value);
        thirdenvChartData.value.thirdPartyTempValueList.push(item.tempvalue);
        thirdenvChartData.value.thirdPartyHumidityValueList.push(item.humidityvalue);
        thirdenvChartData.value.thirdPartyWindDirectionValueList.push(item.winddirectionvalue);
        thirdenvChartData.value.thirdPartyWindSpeedValueList.push(item.windspeedvalue);
        thirdenvChartData.value.thirdPartyRainfallValueList.push(item.rainfallvalue);
    });
    console.log('thirdenvChartData.value', thirdenvChartData.value);


};
//获取实时数据
const fetchRealTimeData = () => {
    setParams(4, 5); // 设置为实时数据
    fetchData(); // 获取数据
    thirdenvChartData.value = {
        thirdPartyEryangValueList: [], // 二氧化碳
        thirdPartyYqValueList: [],    // 氧气值
        thirdPartyPm25ValueList: [],   // PM2.5值
        thirdPartyPm10ValueList: [],  // PM10值
        thirdPartyTempValueList: [],  // 温度值
        thirdPartyHumidityValueList: [], // 湿度值
        thirdPartyWindDirectionValueList: [], // 风向值
        thirdPartyWindSpeedValueList: [], // 风速值
        thirdPartyRainfallValueList: [], // 降雨量值
    }
};

const startPolling = () => {
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

onMounted(async() => {
    await setParams(4,5,parkStore.parkId)
    startPolling();
});

onUnmounted(() => {
    stopPolling();
});



const $route = useRoute();
const isBirdLinkActive = (path) => {
    return $route.path === path ||
        ($route.path === '/personnel' && path === '/bird') ||
        ($route.path === '/environment' && path === '/bird');
};

// const PHData = ref([
//   { name: '土壤湿度', data: [38, 52, 76, 32, 84] },
//   { name: '土壤温度', data: [22, 12, 32, 26, 28] }
// ])
const AtmosphericData = ref([
    { name: '绝对湿度', data: [88, 32, 76, 32, 94] },
    { name: '人体舒适度', data: [22, 32, 37, 12, 38] }
])
const rainfullData = ref([
    { name: '降雨量', data: [55, 42, 84, 42, 94] },
    { name: '积水量', data: [22, 12, 62, 21, 58] }
])
const tableList = ref([
    {
        prop: "garden",
        label1: "园区",
    },
    {
        prop: "area",
        label1: "地区",
    },
    {
        prop: "landArea",
        label1: "占地",
    },
    {
        prop: "device",
        label1: "设备(在线/总数)",
    },
    {
        prop: "device",
        label1: "操作",
    },
]);
const tableData = ref([
    {
        garden: "海湖湿地游乐园",
        area: "西宁市城西区",
        device: "130/132",
        landArea: '1836.45亩'
    },
    {
        garden: "海湖湿地游客中心",
        area: "西宁市城西区",
        device: "130/132",
        landArea: '1836.45亩'
    },
    {
        garden: "海湖湿地双湖",
        area: "西宁市城西区",
        device: "130/132",
        landArea: '1836.45亩'
    },
    {
        garden: "海湖湿地游乐园",
        area: "西宁市城西区",
        device: "130/132",
        landArea: '1836.45亩'
    },
    {
        garden: "海湖湿地游乐园",
        area: "西宁市城西区",
        device: "130/132",
        landArea: '1836.45亩'
    },

]);
const headerRowStyle = ({ row, rowIndex }) => {
    return {
        backgroundColor: "rgba(0, 0, 0, 0)",
        color: "#428fdf",
        height: '60px',
        fontSize: '18px'

    };
};
const headerCellStyle = ({ row, column, rowIndex, columnIndex }) => {
    return {
        backgroundColor: "rgba(0, 0, 0, 0)",
        padding: "0px",
        borderBottom: '1px solid #ffffff',
        border: "none",
        width: '160px'

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
.container {
    display: flex;
    // padding: 20px;
    height: 100%;
    background-color: #030025;

    .left {
        flex: 1;
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
        flex: 1;
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
            top: 10px;
            /* 根据需要调整位置 */
            left: 0;
            right: 0;
            margin-bottom: 10px;

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
        flex: 1;
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