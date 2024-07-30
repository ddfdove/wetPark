<template>
    <div class="home">
        <highcharts :options="chartOptions" />
    </div>
</template>

<script setup>
import { ref, reactive,watch,onMounted } from "vue"
import {keyMap,colorMap,keyToChineseMap,formatDate} from '@/utils/mapping.js'
// 定义组件的 props
const props = defineProps({
    dataList: {
        type: Object,
     
        required: true
    },
    categories: {
        type: Array,
        // default: () => {
        //   return  ['今日', '本月', '本季度', '上季度', '全年']

        // }
        required: true
    },
    isExcellent: {
        type: Array,
        required: true
    },
    height:{
        type: Number,
        default: 290
    },
});
const chartOptions = ref({
    chart: {
        type: 'pyramid3d',
        // marginRight: 60,
        // width:460,
        height: props.height,
        spacing:[10,20,10,20],
        backgroundColor: 'rgba(0,0,0,0)',
        options3d: {
            enabled: true,
            alpha: 10,
            depth: 60,
            viewDistance: 50
        }
    },
    title: {
        text: '',
        style: {
            color: '#ffffff',
            fontSize: "18px"
        }
    },
    plotOptions: {
        series: {
            borderColor: '',//去边框
            shadow: false,		//去阴影
            reversed: false,
            dataLabels: {
                enabled: false,
                format:'{point.y}',
                // distance: -60,
                style: {
                  color: '#FFFFFF',
                  fontSize: "16px"
                }
                
            }
        },
        // width: '60%',
        //     height: '80%',
        //     center: ['50%', '45%']
    },
    legend: {
        enabled: false
    },
    tooltip: {
        enable: false,
        headerFormat: '',
        backgroundColor: 'rgba(0, 170, 255, 0.5)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: ' rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        pointFormat: ' <b> {point.name}</b>&nbsp&nbsp&nbsp{series.name}: {point.y}&nbsp% '
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: '数据',
        data: [
            ['数据一', 100],
            ['数据二', 80],
            ['数据三', 60],
            ['数据四', 40],
            ['数据五', 20]
        ]
    }]
})

// 更新 chartOptions 的方法
const updateChartOptions = (dataList, categories) => {
    if (!dataList || !categories) {
        return; // 数据不完整时直接返回
    }
     // 使用 map 方法处理每个日期字符串
     const cleanedCategories = categories.map(date => formatDate(date));
    chartOptions.value.series = Object.keys(dataList).map(key => {
        return {
            name: keyToChineseMap[key],
            data: dataList[key].map((value, index) => [cleanedCategories[index], value])
        };
    });
   
    // chartOptions.value.xAxis.categories = cleanedCategories;
     //标题显示
     chartOptions.value.title.text = chartOptions.value.series.length > 0 ? chartOptions.value.series[0].name : '';
}

// 监听 props.dataList 和 props.categories 的变化，并更新 chartOptions
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