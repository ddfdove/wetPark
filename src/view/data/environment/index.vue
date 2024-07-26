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

                    <AreaChart :dataList="{ airTemperatureList }" :categories="evnCollectTimeList"
                        :isExcellent="isEnvExcellent">
                    </AreaChart>

                </li>
                <li>

                    <lineChart :dataList="{carbonDioxideList, sulfurDioxideList }" :categories="evnCollectTimeList"
                        :isExcellent="isEnvExcellent">
                    </lineChart>


                </li>

                <li>
                    <AreaChart :dataList="{ totalRadiationList }" :categories="evnCollectTimeList"
                        :isExcellent="isEnvExcellent">
                    </AreaChart>


                </li>
            </ul>
            <!-- </panelboard> -->
        </div>


        <div class="middle">

            <!-- <ul class="switchButton">
          <li :class="{ 'active-link': $route.path === '/monitor/bird' }">
            <router-link to="/monitor/bird"><span>鸟类监测</span></router-link>
          </li>
          <li :class="{ 'active-link': $route.path === '/monitor/personnel' }">
            <router-link to="/monitor/personnel"><span>人员监测</span></router-link>
          </li>
          <li :class="{ 'active-link': $route.path === '/monitor/environment' }">
            <router-link to="/monitor/environment"><span>环境监测</span></router-link>
          </li>
  
        </ul> -->
            <div class="environment">
                <!-- <button class="moreButton" @click=" $router.push({ path: '/data/enviroment' })">
                    <i class="iconfont icon-gengduoshuangjiantou" style="font-size: 12px;margin-right: 8px;"></i>
                    <span>MORE</span>
                </button> -->
                <!-- <panelboard :chTitle="'环境监测'" :enTitle="'Environmental Monitoring'"> -->

                <!-- <ul>
                        <li>
                            <div style="margin:10px 0 40px 0;">
                                <lineChart :dataList="{ airTemperatureList, airHumidityList }"
                                    :categories="evnCollectTimeList" :isExcellent="isEnvExcellent">
                                </lineChart>
                            </div>
                        </li>
                        <li style="flex:1">
                            <div>
                                <lineChart :dataList="{ carbonDioxideList, sulfurDioxideList }"
                                    :categories="evnCollectTimeList" :isExcellent="isEnvExcellent">
                                </lineChart>
                            </div>
                        </li>
                    </ul> -->
                <ul>
                    <li>
                        <PolarChart :dataList="{ windSpeedList }" :categories="evnCollectTimeList"
                            :isExcellent="isEnvExcellent">
                        </PolarChart>



                    </li>
                    <li>
                        <PieChart :dataList="{ pm25List }" :categories="evnCollectTimeList"
                            :isExcellent="isEnvExcellent">
                        </PieChart>
                    </li>

                    <li>
                        <PolarChart :dataList="{ windDirectionList }" :categories="evnCollectTimeList"
                            :isExcellent="isEnvExcellent"></PolarChart>


                    </li>
                </ul>
                <!-- </panelboard> -->
            </div>

        </div>
        <div class="right">
            <ul>
                <li>
                    <div>
                        <AreaChart :dataList="{ airHumidityList }" :categories="evnCollectTimeList"
                            :isExcellent="isEnvExcellent">
                        </AreaChart>
                    </div>
                </li>
                <li>
                    <div>
                        <BarChart :dataList="{ rainfallList }" :categories="evnCollectTimeList"
                            :isExcellent="isEnvExcellent">
                        </BarChart>
                       



                    </div>
                </li>

                <li>
                    <div>
                        <AreaChart :dataList="{ atmosphericPressureList }" :categories="evnCollectTimeList"
                            :isExcellent="isEnvExcellent">
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
import AreaChart from '../components/area.vue'
import BarChart from '../components/bar.vue'
import PieChart from '../components/pie.vue'
import lineChart from '../components/line.vue'
import PolarChart from '../components/polar.vue'
import BoxChart from '../box.vue'
import PyramidChart from '../pyramid.vue'
import TleftChart from '../MiddleChart/tLeft.vue'
import TrightChart from '../MiddleChart/tRighr.vue'
import BleftChart from '../MiddleChart/bLeft.vue'
import BrightChart from '../MiddleChart/bRight.vue'
import panelboard from "@/components/panelboard/index.vue"



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
// const collectTimeList = ref([])
const store = useDataStore(); // 使用 Pinia store
const fetchData = async () => {
    if (isFetching) return; // 如果正在获取数据，直接返回
    isFetching = true; // 标记正在获取数据
    try {
        await Promise.all([
            setParams(null, 5),
            // store.getWaterData(params.value),
            // store.getSoilData(params.value),
            store.getEnvironmentData(params.value)
        ]);

        // mappingWater(store.waterData.value)
        // mappingSoil(store.soilData.value)
        mappingEnv(store.envData.value)

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        isFetching = false; // 请求完成，重置标志
    }
};


const startPolling = () => {
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
    // console.log('store.waterData.value.pHList',store.waterData.value.pHList);
    // console.log('waterPHList',waterPHList.value);
    // console.log('waterDissolvedOxygenList',waterDissolvedOxygenList.value);
    // console.log('soilPHList',soilPHList.value);
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

    .switchButton {
        margin-left: 160px;
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
    }

    .moreButton:hover {
        color: aquamarine
    }

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