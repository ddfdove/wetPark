<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue"
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
    devicesList: {
        type: Array,
        required: true
    },
    height: {
        type: Number,
        default: 160
    },
});
const chartOptions = ref({
    chart: {
        type: "cylinder",
        backgroundColor: "#030025",
        spacing: [0, 0, 0, 0], // 去掉图表的内边距
        height: 290,
        width: 600,
        options3d: {
            enabled: true,
            // alpha: 10,
            // beta: 30,
            depth: 50,
            // viewDistance: 25
        },
    },
    title: {
        text: null,
    },
    xAxis: {
        categories: ["1月", "2月", "3月", "4月", "5月"],
        title: {
            text: null,
        },
        // crosshair: true,
        // gridLineWidth: 1,
        lineWidth: 0,
        gridLineWidth: 0,
        labels: {
            enabled: true,
            style: {
                color: "#ffffff",
                fontSize: "12px",
            },
        },
    },
    yAxis: {
        type: 'logarithmic', // 使用对数轴
        // minorTickInterval: 0.5,
        title: {
            text: null,
        },
        labels: {
            enabled: true,
            overflow: "justify",
            style: {
                color: "#ffffff",
                fontSize: "12px",
            },
        },
        gridLineWidth: 2,
        gridLineDashStyle: "solid", //网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: "#221f3f",
        // min: 0, //最小值
        // tickInterval: 50, //间隔
        // max: 250, //最大值
    },
    plotOptions: {
        series: {
            depth: 60,
            colorByPoint: false,
            pointWidth: 20, // 控制圆柱体的宽度
            edgeColor: "", // 去除3D效果中的白色部分
            dataLabels: {
                enabled: false,
            },
            groupPadding: 0.15, // 控制组之间的间隔
            // pointPadding: 0.3, // 控制点之间的间隔
            dataLabels: {
                enabled: true, // 启用数据标签
                format: '{y}', // 可以设置数据标签显示的格式，这里显示y值
                style: {
                    textOutline: 'none', // 文本描边，可选
                    color: 'white', // 文本颜色，可选
                    fontSize: '10px' // 文本字号，可选
                }
            },
        },
        cylinder: {
            depth: 25,
            // edgeColor: '#FFFFFF', // 设置圆柱体边缘颜色
            edgeWidth: 2, // 设置边缘宽度
            // zones: [{
            //     value: 1, // 为顶部设置颜色
            //     color: {
            //         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // 纵向渐变
            //         stops: [
            //             [0, 'rgba(0, 117, 255, 0)'],
            //             [1, '#FFFFFF']
            //         ]
            //     }
            // }]
        },
    },
    legend: {
        layout: "horizontal",
        align: "center",
        verticalAlign: "top",
        symbolHeight: 8,
        symbolWidth: 8,
        itemStyle: { color: "#FFFFFF" },
    },
    tooltip: {
        // enable:false,
        shared: false,
        padding: 16,
        backgroundColor: "rgba(0, 170, 255, 0.15)", // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: " rgba(0, 170, 255, 0.5)", // 提示框边框颜色
        headerFormat: "",
        style: {
            color: "#ffffff",
        },
        // <span style="color:{point.color}">\u25CF</span>
        // pointFormat:
        //     " <b> {series.name}</b>&nbsp&nbsp&nbsp&nbsp {point.y} <br><br>",
    },
    credits: {
        enabled: false,
    },
    exporting: { enabled: false },
    series: [],
});
// 更新 chartOptions 的方法
const updateChartOptions = (dataList, categories, isExcellent, devicesList) => {
    if (!dataList || !categories) {
        return;
    }

    //更新series数据
    chartOptions.value.series = Object.keys(dataList).map((key, index) => {
        const colors = [
            {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, // 180度渐变方向
                stops: [
                    [0, "rgba(0, 133, 255, 0.5)"],
                    [1, "rgba(0, 71, 255, 0)"],
                ],
            },
            {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 }, // 横向渐变
                stops: [
                    [0, "rgba(0, 102, 255, 0.6)"],
                    [0.12, "rgba(0, 102, 255, 0.6)"],
                    [0.49, "rgba(135, 212, 255, 0.6)"],
                    [0.91, "rgba(0, 117, 255, 0.6)"],
                    [1, "rgba(0, 117, 255, 0.6)"],
                ],
            },
        ];
        return {
            name: devicesList[index],
            data: dataList[key],
            color: colors[index],
            lineWidth: 1
        };
    });
    // 更新x轴 categories 的显示格式
    chartOptions.value.xAxis.categories = props.categories;
    // 更新 tooltip 的 pointFormatter
    chartOptions.value.tooltip.pointFormatter = function () {
        const category = this.x;
        const key = categories[category];
        const unitMap = {
            'PH值': 'pH',
            '溶解氧': 'mg/L',
            '浊度': 'NTU',
            '水温': '℃',
            '叶绿素': 'μg/L',
            '电导率': 'μS/cm',
        }
        // 获取对应的单位，如果没有找到则使用空字符串
        const unit = unitMap[key] || '';
        const excellentValue = isExcellent[category]; // 根据索引获取 isExcellent 数组中的值
        return `${key}&nbsp单位:${unit}<br><br>${excellentValue} `;

    };
};

// 监听 props.dataList、props.categories 和 props.isExcellent 的变化，并更新 chartOptions
watch(
    [() => props.dataList, () => props.categories, () => props.isExcellent, () => props.devicesList],
    ([newDataList, newCategories, newIsExcellent, newDevicesList]) => {
        updateChartOptions(newDataList, newCategories, newIsExcellent, newDevicesList);
    },
    { immediate: true }
);

// 初次加载时更新 chartOptions
onMounted(() => {
    updateChartOptions(props.dataList, props.categories, props.isExcellent, props.devicesList);
});
</script>
