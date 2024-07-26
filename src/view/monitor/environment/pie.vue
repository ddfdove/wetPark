<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue"
import {keyMap,colorMap,keyToChineseMap,formatDate} from '@/utils/mapping.js'
// 定义组件的 props
const props = defineProps({
    dataList: {
        type: Object,
        // default: () => {
        //     return {
        //         series: [
        //             { name: '土壤湿度', data: [88, 232, 876, 312, 94] },
        //             { name: '土壤温度', data: [842, 512, 132, 332, 958] }
        //         ]
        //     }

        // }
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
        type: 'variablepie',
        backgroundColor: 'rgba(0,0,0,0)',
        // spacing:[0,0,0,0],
        // width: 500,
        height: props.height
        // spacing:[20,20,20,20]
        // options3d: {
        //     enabled: true,
        //     alpha: 45,
        //     beta: 0,
        //     // depth: 50, // 增加饼图的深度
        //     viewDistance: 25 // 调整视角距离
        // },
    },
    title: {
        text: '',
        style: {
            color: '#ffffff',
            fontSize: "18px"
        }
    },
    plotOptions: {
        variablepie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderColor: '',//去边框
            shadow: false,		//去阴影
            groupPadding: 0.1,
            depth: 50, // 增加饼图的深度
            innerSize: '20%',
            zMin: 0,
            dataLabels: {
                enabled: true,
                format:'{point.y}',
                distance: -50,
                style: {
                  color: 'rgb(255,204,0)',
                  fontSize: "14px"
                }
                
            }
        }
    },
    tooltip: {
        enable: false,
        headerFormat: '',
        backgroundColor: 'rgba(0, 170, 255, 0.5)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: ' rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        pointFormat: ' <b> {point.name}</b><br> {series.name}: {point.y}&nbspNTU '

    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        // type: "pie",
        // minPointSize: 10,

        // borderRadius: 3,
        // itemStyle: {
        //     normal: {
        //         borderColor: '#fff',
        //         borderWidth: '0'
        //     },
        //     emphasis: {
        //         borderColor: '#fff',
        //         borderWidth: '0'
        //     }
        // },
        data: [{
            name: '数据一',
            y: 40,
            z: 400,

        }, {
            name: '数据二',
            y: 32,
            z: 320,

        }, {
            name: '数据三',
            y: 28,
            z: 280,

        }, {
            name: '数据四',
            y: 25,
            z: 250,

        }, {
            name: '数据五',
            y: 18,
            z: 180,

        }],
        colors: [
            'rgb(88,148,255)',
            'rgb(114,205,215)',
            'rgb(88,165,92)',
            'rgb(242,189,66)',
            'rgb(238,117,47)',
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
            data: dataList[key].map((value, index) =>({
                
                name: cleanedCategories[index],
                y: value,
                z: value
            })),
            colors: [
            'rgb(88,148,255)',
            'rgb(114,205,215)',
            'rgb(88,165,92)',
            'rgb(242,189,66)',
            'rgb(238,117,47)',
            ]
            
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


// // 更新 chartOptions 的方法
// const updateChartOptions = (dataList, categories, parameters) => {
//     if (!dataList || !parameters || !categories) {
//         return; // 数据不完整时直接返回
//     }
//     // 使用 map 方法处理每个日期字符串
//     const cleanedCategories = categories.map(time => {
//         // 将日期字符串拆分成日期和时间部分
//         let [datePart, timePart] = time.split(' ');
//         // 将日期部分从 "YYYY-MM-DD" 格式转换成 "MM-DD" 格式
//         let [month, day] = datePart.split('-').slice(1); // 从第二项开始，去掉年份部分
//         // 拼接成 "7月15日 11:15" 格式
//         return `${parseInt(month)}月${parseInt(day)}日 ${timePart}`;
//     });
//     const seriesData = dataList.map((value, index) => ({

//         y: value, // 将数组中的每个值作为 y 值
//         z: value,
//         name: cleanedCategories[index] // 使用参数中的 collectTimeList 数组中的时间戳
//     }));
    
   

//     chartOptions.value.series = [{
//         name: parameters.name,
//         data: seriesData,
//         colors: [
//             'rgb(88,148,255)',
//             'rgb(114,205,215)',
//             'rgb(88,165,92)',
//             'rgb(242,189,66)',
//             'rgb(238,117,47)',
//         ]
//     }];

//     // chartOptions.value.yAxis.min = parameters.min;
//     // chartOptions.value.yAxis.tickInterval = parameters.tickInterval;
//     // chartOptions.value.yAxis.max = parameters.max;

//     // chartOptions.value.xAxis.categories = categories;

//      //标题显示
//      chartOptions.value.title.text = chartOptions.value.series.length > 0 ? chartOptions.value.series[0].name : '面积图';
// }

// // 监听 props.dataList 和 props.categories 的变化，并更新 chartOptions
// watch(
//     [() => props.dataList, () => props.categories, () => props.parameters],
//     ([newDataList, newCategories, newParameters]) => {
//         updateChartOptions(newDataList, newCategories, newParameters);
//     },
//     { immediate: true }
// );

// // 初次加载时更新 chartOptions
// onMounted(() => {
//     updateChartOptions(props.dataList, props.categories, props.parameters);
// });

</script>