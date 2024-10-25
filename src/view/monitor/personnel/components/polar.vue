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
    height: {
        type: Number,
        default: 330
    },

});
const chartOptions = ref({
    chart: {
        polar: true,
        type: 'column',
        // backgroundColor: '#030632',
        backgroundColor: 'transparent',
        // height: props.height,
        width: 530,
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
        enabled: false,
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
        pointFormat: ' <b>&nbsp &nbsp &nbsp人流量： {point.y} <br>',
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
    series: []
})


// 更新 chartOptions 的方法
const updateChartOptions = (dataList, categories) => {
    if (!dataList || !categories) {
        return;
    }
    console.log('dataList',dataList);
    console.log('categories',categories);
    //更新series数据
    chartOptions.value.series = Object.keys(dataList).map(key => {
        const seriesData = dataList[key];
       

        return {
            name: keyToChineseMap[key],
            data: seriesData,
            pointPlacement: 'on'
            // color: colorMap[key],
            // lineWidth: 1
        };
    });
   console.log('chartOptions.value.series',chartOptions.value.series);
    // 更新x轴 categories 的显示格式
   
    chartOptions.value.xAxis.categories = categories;
    //标题
    chartOptions.value.title.text = chartOptions.value.series.length > 0 ? chartOptions.value.series[0].name : '';
};
// 监听 props.dataList、props.categories 和 props.isExcellent 的变化，并更新 chartOptions
watch(
    [() => props.dataList, () => props.categories],
    ([newDataList, newCategories]) => {
        updateChartOptions(newDataList, newCategories);
    },
    { immediate: true }
);

// 初次加载时更新 chartOptions
onMounted(() => {
    updateChartOptions(props.dataList, props.categories);
});
</script>