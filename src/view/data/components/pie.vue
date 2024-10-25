<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue"
import { keyMap, colorMap, keyToChineseMap, getIndicators, formatDate,unitMap } from '@/utils/mapping.js'
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
        type: 'pie',
        backgroundColor: '#030632',
        // spacing:[0,0,0,0],
        // width: 500,
        height: props.height,
        // spacing:[20,20,20,20]
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
            // depth: 50, // 增加饼图的深度
            viewDistance: 25 // 调整视角距离
        },
    },
    title: {
        text: '',
        style: {
            color: '#ffffff',
            fontSize: "18px"
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderColor: '',//去边框
            shadow: false,		//去阴影
            groupPadding: 0.1,
            depth: 80, // 增加饼图的深度
            // innerSize: '20%',
            zMin: 0,
            dataLabels: {
                enabled: true,
                format:'{point.y}',
                distance: -40,
                style: {
                  color: 'rgb(255,204,0)',
                  
                  fontSize: "14px"
                }
                
            }
        }
    },
    legend: {
    enabled: true,
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    itemStyle: { 'color': '#FFFFFF' }
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
let min = ref(null)
let max = ref(null)
let status = ref('优')
const findBaseKey = (key) => keyMap[key];

const findExcellentRange = (baseKey, isExcellent) => {
    if (!baseKey) return undefined;
    return isExcellent.find(item => item[`${baseKey}_min`] !== undefined && item[`${baseKey}_max`] !== undefined);
};
// 更新 chartOptions 的方法
const updateChartOptions = (dataList, categories,isExcellent) => {
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
   // 更新 tooltip 中 pointFormatter 的数据
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
        return `<b>${chineseName}</b>&nbsp&nbsp&nbsp&nbsp${this.y}&nbsp${unit}&nbsp&nbsp&nbsp&nbsp ${status.value}<br> `;
    };
    // chartOptions.value.xAxis.categories = cleanedCategories;
     //标题显示
     chartOptions.value.title.text = chartOptions.value.series.length > 0 ? chartOptions.value.series[0].name : '';
}

// 监听 props.dataList 和 props.categories 的变化，并更新 chartOptions
watch(
    [() => props.dataList, () => props.categories, () => props.isExcellent],
    ([newDataList, newCategories, newIsExcellent]) => {
        updateChartOptions(newDataList, newCategories, newIsExcellent);
    },
    { immediate: true }
);

// 初次加载时更新 chartOptions
onMounted(() => {
    updateChartOptions(props.dataList, props.categories, props.isExcellent);
});


</script>