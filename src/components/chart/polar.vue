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
    },
    height: {
        type: Number,
        default: 290
    },
    width: {
        type: Number,

    },
    isShowLegend: {
        type: Boolean,
        default: true
    }

});
const chartOptions = ref({
    chart: {
        polar: true,
        type: 'column',
        // backgroundColor: '#030632',
        backgroundColor: 'transparent',
        height: props.height,
        width: props.width,
        // spacing: [0, 0, 0, 0]
    },
    title: {
        text: '',
        style: {
            color: '#ffffff',
            fontSize: "18px"
        }
    },
    xAxis: {
        categories: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
        tickmarkPlacement: 'on',
        lineWidth: 0,
        title: {
            text: null
        },
        crosshair: true,
        labels: {
            rotation: 0,
            style: {
                color: '#ffffff',
                fontSize: "12px"
            }
        }
    },
    yAxis: {
        gridLineInterpolation: 'polygon',
        // 使用 tickPositions 来手动设置刻度
        // tickPositions: [0, 10, 20, 360], // 手动设置 y 轴的刻度
        lineWidth: 0,
        min: 0,
        labels: {
            rotation: 0,
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        }
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
        backgroundColor: 'rgba(0, 170, 255, 0.15)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: ' rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        style: {
            color: '#ccc',
            // letterSpacing: '2px',
            fontSize: '14px',
        },
        headerFormat: '{point.key}<br>',
        pointFormat: ' <b> {series.name}</b>&nbsp&nbsp&nbsp {point.y}℃ <br>',
        style: {
            color: '#ccc',
            letterSpacing: '2px',
            fontSize: '14px',
        },
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: 'Wind Direction',
        data: [1, 8, 200, 356, 2],
        pointPlacement: 'on'
    }]
})

let min = ref(null)
let max = ref(null)
let status = ref('良')
const findBaseKey = (key) => keyMap[key];

const findExcellentRange = (baseKey, isExcellent) => {
    if (!baseKey) return undefined;
    return isExcellent.find(item => item[`${baseKey}_min`] !== undefined && item[`${baseKey}_max`] !== undefined);
};
// 更新 chartOptions 的方法
const updateChartOptions = (dataList, categories, isExcellent) => {
    // console.log('props.dataList',dataList);
    // console.log('props.categories',categories);
    // console.log('props.isExcellent',isExcellent);
    if (!dataList || !categories) {
        return;
    }
    // let globalMin = Infinity;
    // let globalMax = -Infinity;
    //更新series数据
    chartOptions.value.series = Object.keys(dataList).map(key => {
        const seriesData = dataList[key];
        // const baseKey = findBaseKey(key);

        // if (baseKey) {
        //     const excellentRange = findExcellentRange(baseKey, isExcellent);
        //     if (excellentRange) {
        //         const seriesMin = Math.min(...seriesData);
        //         const seriesMax = Math.max(...seriesData);

        //         globalMin = Math.min(globalMin, seriesMin);
        //         globalMax = Math.max(globalMax, seriesMax);
        //     }
        // }

        return {
            name: keyToChineseMap[key],
            data: seriesData,
            pointPlacement: 'on'
            // color: colorMap[key],
            // lineWidth: 1
        };
    });
    // //更新y轴的最小值，最小值和间隔y
    // updateYAxis(globalMin, globalMax);

    // 更新x轴 categories 的显示格式
    const cleanedCategories = categories.map(date => formatDate(date));
    chartOptions.value.xAxis.categories = cleanedCategories;
    //更新 tooltip 中 pointFormatter 的数据
    chartOptions.value.tooltip.pointFormatter = function () {
        const getEnglishName = (chineseName) => {
            for (const key in keyToChineseMap) {
                if (keyToChineseMap[key] === chineseName) {
                    return key;
                }
            }
            return null; // 如果没有找到对应的英文名，可以根据需要返回 null 或其他默认值
        }
        const chineseName = this.series.name
        const englishName = getEnglishName(this.series.name);
        const baseKey = findBaseKey(englishName);
        const excellentRange = findExcellentRange(baseKey, isExcellent);


        if (excellentRange) {
            min.value = excellentRange[`${baseKey}_min`];
            max.value = excellentRange[`${baseKey}_max`];
            getIndicators(englishName, this.y, min.value, max.value, status)

        }
        // 获取对应的单位，如果没有找到则使用空字符串
        const unit = unitMap[chineseName] || '';
        return isExcellent && isExcellent.length > 0
            ? `<b>${chineseName}</b>&nbsp&nbsp&nbsp&nbsp${this.y}&nbsp${unit}&nbsp&nbsp&nbsp&nbsp ${status.value}<br>`
            : `<b>${chineseName}</b>&nbsp&nbsp&nbsp&nbsp${this.y}&nbsp${unit}<br>`;
    };
    //标题
    // chartOptions.value.title.text = chartOptions.value.series.length > 0 ? chartOptions.value.series[0].name : '';
};
// 监听 props.dataList、props.categories 和 props.isExcellent 的变化，并更新 chartOptions
watch(
    [() => props.dataList, () => props.categories, () => props.isExcellent, () => props.isShowLegend],
    ([newDataList, newCategories, newIsExcellent, newIsShowLegend]) => {
        updateChartOptions(newDataList, newCategories, newIsExcellent);
        chartOptions.value.legend.enabled = newIsShowLegend;
    },
    { immediate: true }
);

// 初次加载时更新 chartOptions
onMounted(() => {

    updateChartOptions(props.dataList, props.categories, props.isExcellent);
});
</script>