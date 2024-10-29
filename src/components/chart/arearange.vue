<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue"
import { keyMap, colorMap, keyToChineseMap, getIndicators, formatDate, unitMap } from '@/utils/mapping.js'
// 定义组件的 props
const props = defineProps({
    dataList: {
        type: Object,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    isExcellent: {
        type: Array,
        required: true
    },
    height: {
        type: Number,
        default: 290
    },
    name: {
        type: String,
        default: '土壤'
    }

});
const chartOptions = ref({
    chart: {
        polar: true,
        type: 'arearange',
        backgroundColor: '#030632',
        height: props.height,
    },
    title: {
        text: null
    },
    xAxis: {
        categories: [],
        tickmarkPlacement: 'on',
        lineWidth: 0,
        labels: {
            rotation: 0,
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        }
    },
    yAxis: {
        type: 'logarithmic', // 设置为对数轴
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        // min: 0,
        // max: 300, // 设置一个合理的最大值，根据你的数据最大值调整
        // tickPositions: [0, 0.1, 1, 10,  100], // 手动设置刻度线位置
        labels: {
            style: {
                color: '#ffffff',
                fontSize: "14px",
            }
        },
    },
    legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        // symbolHeight:14,
        // symbolWidth:20,
        // symbolRadius:5,
        itemStyle: { 'color': '#FFFFFF' }
    },
    tooltip: {
        shared: true,
        padding: 16,
        headerFormat: '{point.key}<br>',
        backgroundColor: 'rgba(0, 170, 255, 0.15)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: 'rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        style: {
            color: '#ccc',
            fontSize: '14px',
        },
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: 'Soil Parameters Range',
        data: [
            [10.000, 25.000], // Soil Temperature min and max
            [60.000, 80.000], // Soil Moisture min and max
            [0.500, 5.000],   // Soil Conductivity min and max
            [0.050, 0.500],   // Soil Nitrogen min and max
            [0.020, 0.200],   // Soil Phosphorus min and max
            [0.100, 2.000],   // Soil Potassium min and max
            [5.500, 7.500]    // Soil pH min and max
        ],
        pointPlacement: 'on',
        zIndex: 0,
        fillOpacity: 0.2
    }, {
        name: 'Soil Parameters',
        type: 'line',
        data: [
            15.250, // Soil Temperature current value
            42.500, // Soil Moisture current value
            1.318,  // Soil Conductivity current value
            0.378,  // Soil Nitrogen current value
            0.335,  // Soil Phosphorus current value
            64.168, // Soil Potassium current value
            5.175   // Soil pH current value
        ],
        pointPlacement: 'on',
        zIndex: 1
    }]
})
let min = ref(null)
let max = ref(null)
let status = ref('优')
const findBaseKey = (key) => keyMap[key];

const findExcellentRange = (baseKey, isExcellent) => {
    if (!baseKey) return undefined;
    return isExcellent.find(item => item[`${baseKey}_min`] !== undefined && item[`${baseKey}_max`] !== undefined);
};

const processData = (dataList) => {
    const keys = Object.keys(dataList);
    const rangeData = [];
    const currentData = [];

    keys.forEach(key => {
        const values = dataList[key];
        const max = Math.max(...values);
        const min = Math.min(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;

        rangeData.push([min, max]);
        currentData.push(avg);
    });

    return { rangeData, currentData };
};
// 更新 chartOptions 的方法
const updateChartOptions = (dataList, categories, isExcellent) => {
    if (!dataList || !categories) {
        return;
    }

    const { rangeData, currentData } = processData(dataList);
    // 更新series数据
    chartOptions.value.series = [{
        name: props.name+'参数范围',
        data: rangeData,
        pointPlacement: 'on',
        zIndex: 0,
        fillOpacity: 0.2
    }, {
        name: props.name+'参数平均值',
        type: 'line',
        data: currentData,
        pointPlacement: 'on',
        zIndex: 1
    }];
    // 更新 xAxis categories 为土壤参数的中文名称
    const parameterKeys = Object.keys(dataList);
    const cleanedCategories = parameterKeys.map(key => keyToChineseMap[key]);
    chartOptions.value.xAxis.categories = cleanedCategories;
    // 更新 tooltip 的 formatter 函数
    chartOptions.value.tooltip.formatter = function () {
        return this.points.reduce((s, point) => {
            const chineseName = keyToChineseMap[point.x] || point.x; // 使用 x 轴的值作为中文名称的键
            const getEnglishName = (chineseName) => {
                for (const key in keyToChineseMap) {
                    if (keyToChineseMap[key] === chineseName) {
                        return key;
                    }
                }
                return null; // 如果没有找到对应的英文名，可以根据需要返回 null 或其他默认值
            }
            const englishName = getEnglishName(point.x);
            const baseKey = findBaseKey(englishName); // 使用中文名称找到对应的 baseKey
            const excellentRange = findExcellentRange(baseKey, isExcellent);
             min.value = excellentRange[`${baseKey}_min`];
             max.value = excellentRange[`${baseKey}_max`];
           
            getIndicators(englishName, point.y, min.value, max.value, status);
            let rangeInfo = '';
            const unit = unitMap[chineseName] || '';
            if (point.series.name === `${props.name}参数范围`) {
                const [min, max] = rangeData[point.point.index] || [0, 0];
                rangeInfo = `: [ ${min} - ${max} ] `;
            } else if (point.series.name === `${props.name}参数平均值`) {
                const avg = currentData[point.point.index] || 0;
                rangeInfo = `: ${avg.toFixed(2)}  ${unit} `;
            }

           
            return s + `<b>${point.series.name}</b>: ${rangeInfo}<br>`;
        }, `<b>${this.x} (整体：${status.value})</b><br/> `) ;
    };
};
watch(
    [() => props.dataList, () => props.categories, () => props.isExcellent],
    ([newDataList, newCategories, newIsExcellent]) => {
        updateChartOptions(newDataList, newCategories, newIsExcellent);
    },
    { immediate: true }
);

onMounted(() => {
    updateChartOptions(props.dataList, props.categories, props.isExcellent);
});
</script>
