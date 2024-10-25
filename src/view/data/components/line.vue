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

});
const chartOptions = ref({
    chart: {
        type: 'spline',
        backgroundColor: '#030025',
        // width:400,
        height: props.height,
    },
    title: {
        text: null
    },
    xAxis: {
        categories: props.categories,
        title: {
            text: null
        },
        crosshair: true,
        labels: {
            rotation: 0,
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        }
    },
    yAxis: {
        // categories: [],
        // type: 'logarithmic', // 使用对数轴
        title: {
            text: null
        },
        labels: {
            style: {
                color: '#ffffff',
                fontSize: "14px",
            }
        },
        gridLineDashStyle: 'solid',//网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: '#221f3f',
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        },
        series: {
            marker: {
                enabled: true
            },
            dataLabels: {
                enabled: true, // 启用数据标签
                format: '{y}', // 可以设置数据标签显示的格式，这里显示y值
                style: {
                    textOutline: 'none', // 文本描边，可选
                    color: 'white', // 文本颜色，可选
                    fontSize: '12px' // 文本字号，可选
                }
            },
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
        pointFormatter: function () {
            const key = this.series.name;
            const baseKey = findBaseKey(key);
            const excellentRange = findExcellentRange(baseKey);

            let status = '良好';
            if (excellentRange) {
                const min = excellentRange[`${baseKey}_min`];
                const max = excellentRange[`${baseKey}_max`];
                if (this.y >= min && this.y <= max) {
                    status = '优';
                }
            }
            // 获取对应的单位，如果没有找到则使用空字符串
            const unit = unitMap[key] || '';
            return `<b>${key}</b>&nbsp&nbsp&nbsp&nbsp${this.y}${unit} &nbsp&nbsp&nbsp ${status}<br>${excellentRange} `;
        }
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: []
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
        return;
    }
    let globalMin = Infinity;
    let globalMax = -Infinity;
    //更新series数据
    chartOptions.value.series = Object.keys(dataList).map(key => {
        const seriesData = dataList[key];
        const baseKey = findBaseKey(key);
        // 检查 seriesData 是否为空
        const isEmptyData = Array.isArray(seriesData) && seriesData.length === 0;
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
            // name: isEmptyData ? '' : keyToChineseMap[key],
            name:  keyToChineseMap[key],
            data: seriesData,
            color: colorMap[key],
            lineWidth: 1
        };
    });
    //更新y轴的最小值，最小值和间隔y
    // updateYAxis(globalMin, globalMax);

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
};
const updateYAxis = (globalMin, globalMax) => {
    // 调整最大值和最小值，并计算间隔
    const adjustedMax = Math.ceil(globalMax * 1.2);
    const adjustedMin = globalMin < 0 ? Math.floor(globalMin * 1.1) : 0;
    const range = adjustedMax - adjustedMin;
    const tickInterval = Math.ceil(range / 5);
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