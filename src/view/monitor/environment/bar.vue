<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue"
import { keyMap, colorMap, keyToChineseMap, getIndicators, formatDate,unitMap } from '@/utils/mapping.js'
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
    height: {
        type: Number,
        default: 290
    },
});
const chartOptions = ref({
    chart: {
        type: 'column',
        backgroundColor: '#030025',
        height: props.height,
        events: {
            load() {
                const chart = this;
                chart.series.forEach(series => {
                    series.update({
                        events: {
                            hide: updateChartAxes,
                            show: updateChartAxes
                        }
                    });
                });
            }
        },
        // spacing:[0,0,0,0],
        options3d: {
            enabled: true,
            // alpha: 15, // 调整alpha以旋转图表
            beta: 30,  // 调整beta以旋转图表
            depth: 70, // 增加深度以使柱子看起来更立体
            viewDistance: 0 // 调整视角距离
        }
    },
    title: {
        text: '',
        style: {
            color: '#ffffff',
            fontSize: "18px"
        }
    },
    xAxis: {

        categories: props.categories,
        title: {
            text: null
        },
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
            rotation: 0,
            enabled: true,
            style: {
                color: '#ffffff',
                fontSize: "12px"
            }
        },

    },
    yAxis: {
        // categories: ['0', '100', '200', '300','400','500','600'],
        //   min: 0,
        title: {
            text: null,
        },
        labels: {
            enabled: true,
            overflow: 'justify',
            style: {
                color: '#ffffff',
                fontSize: "12px"
            }
        },
        gridLineDashStyle: 'solid',//网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: '#221f3f',
        // min: props.parameters.min,//最小值
        // tickInterval: props.parameters.tickInterval, //间隔
        // max: props.parameters.max //最大值
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
    plotOptions: {
        column: {
            borderRadius: '50',
            depth: 25,
            dataLabels: {
                enabled: true,
                // color: 'rgb(255,204,0)'
                color: '#FFFFFF'
            },
            borderColor: '',//去边框
            shadow: false,		//去阴影
            groupPadding: 0.1,
            // color:'red'
        },
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: 'do',
        data: props.dataList,
        color: {
            linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 }, // 从底部到顶部渐变
            stops: [
                [0.01, 'rgba(1, 56, 222, 0.2)'],
                [0.99, '#006BBC']
            ]
        },
        pointPadding: 0.3,
        // groupPadding: 0.2,
    }
    ]
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
    if (!dataList || !categories) {
        return; // 数据不完整时直接返回
    }
    let globalMin = Infinity;
    let globalMax = -Infinity;
    chartOptions.value.series = Object.keys(dataList).map(key => {
        const seriesData = dataList[key];
        const baseKey = findBaseKey(key);

        if (baseKey) {
            const excellentRange = findExcellentRange(baseKey, isExcellent);
            if (excellentRange) {
                const seriesMin = Math.min(...seriesData);
                const seriesMax = Math.max(...seriesData);

                globalMin = Math.min(globalMin, seriesMin);
                globalMax = Math.max(globalMax, seriesMax);
            }
        }
        return {
            name: keyToChineseMap[key],
            data: seriesData,
            color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 }, // 从底部到顶部渐变
                stops: [
                    [0.01, 'rgba(1, 56, 222, 0.2)'],
                    [0.99, '#006BBC']
                ]
            },
            pointPadding: 0.3,
        };
    });
    //更新y轴的最小值，最小值和间隔y
    updateYAxis(globalMin, globalMax);
    // 更新x轴 categories 的显示格式
    const cleanedCategories = categories.map(date => formatDate(date));
    chartOptions.value.xAxis.categories = cleanedCategories;
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
    //标题显示
    chartOptions.value.title.text = chartOptions.value.series.length > 0 ? chartOptions.value.series[0].name : '柱状图';
}

const updateYAxis = (globalMin, globalMax) => {
    // 调整最大值和最小值，并计算间隔
    const adjustedMax = Math.ceil(globalMax * 1.2);
    const adjustedMin = globalMin < 0 ? Math.floor(globalMin * 1.1) : 0;
    const range = adjustedMax - adjustedMin;
    const tickInterval = Math.ceil(range / 4);
    chartOptions.value.yAxis = {
        title: {
            text: null
        },
        labels: {
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        },
        gridLineDashStyle: 'solid',
        gridLineColor: '#221f3f',
        min: adjustedMin,  // 设置最小值
        max: adjustedMax,  // 设置最大值
        tickInterval: tickInterval  // 设置刻度间隔
    };
};

const updateChartAxes = function () {
    let globalMin = Infinity;
    let globalMax = -Infinity;

    this.chart.series.forEach(series => {
        if (series.visible) {
            const seriesMin = Math.min(...series.yData);
            const seriesMax = Math.max(...series.yData);

            globalMin = Math.min(globalMin, seriesMin);
            globalMax = Math.max(globalMax, seriesMax);
        }
    });

    updateYAxis(globalMin, globalMax);
    this.chart.yAxis[0].update(chartOptions.value.yAxis);
};
// 监听 props.dataList、props.categories 和 props.isExcellent 的变化，并更新 chartOptions
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