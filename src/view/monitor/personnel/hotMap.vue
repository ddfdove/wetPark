<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive,toRefs ,watch} from "vue";

// 定义组件的 props
const props = defineProps({
    dataList: {
        type: Object,
        default: () => {}
    },
});
// 更新 heatmapData
const heatmapData = [
    // 格式: [x, y, value]
    // x 轴代表季度，从 0 到 3，y 轴代表景点，从 0 到 4
    [0, 0, 100], // 1月，景点1
    [1, 0, 140], // 2月，景点1
    [2, 0, 230], // 3月，景点1
    [3, 0, 88], // 4月，景点1
    [4, 0, 130], // 5月，景点1
    [5, 0, 350], // 6月，景点1
    [0, 1, 150], // 1月，景点2
    [1, 1, 100], // 2月，景点2
    [2, 1, 196], // 3月，景点2
    [3, 1, 340], // 4月，景点2
    [4, 1, 120], // 5月，景点2
    [5, 1, 130], // 6月，景点2
    [0, 2, 250], // 1月，景点3
    [1, 2, 210], // 2月，景点3
    [2, 2, 190], // 3月，景点3
    [3, 2, 220], // 4月，景点3
    [4, 2, 230], // 5月，景点3
    [5, 2, 240], // 6月，景点3
    [0, 3, 220], // 1月，景点4
    [1, 3, 430], // 2月，景点4
    [2, 3, 140], // 3月，景点4
    [3, 3, 110], // 4月，景点4
    [4, 3, 66], // 5月，景点4
    [5, 3, 410], // 6月，景点4
    [0, 4, 130], // 1月，景点5
    [1, 4, 320], // 2月，景点5
    [2, 4, 150], // 3月，景点5
    [3, 4, 120], // 4月，景点5
    [4, 4, 130], // 5月，景点5
    [5, 4, 140], // 6月，景点5
];

const chartOptions = ref({
    chart: {
        type: "heatmap",
        backgroundColor: "#030025",
        spacing: [0, 0, 10, 0], // 去掉图表的内边距
        height: 420,
    },
    title: {
        text: null,
    },
    xAxis: {
        categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
        title: {
            text: null,
        },
        labels: {
            enabled: true,
            style: {
                color: "#ffffff",
                fontSize: "12px",
            },
        },
    },
    yAxis: {
        categories: ["停车场", "卫生间", "游客中心", "游乐场", "美丽水街"],
        title: {
            text: null,
        },
        labels: {
            enabled: true,
            style: {
                color: "#ffffff",
                fontSize: "12px",
                width:'50px'
            },
            useHTML: true, // 启用 HTML 以允许更灵活的标签样式
        },
        gridLineWidth: 2,
        gridLineDashStyle: "solid", //网格线样式
        gridLineColor: "#221f3f",
    },
    colorAxis: {
        min: 0,
        minColor: "#030025",
        maxColor: "#1684fc"
    },
    legend: {
        layout: "horizontal",
        align: "right",
        verticalAlign: "top",
        symbolHeight: 8,
        symbolWidth: 8,
        itemStyle: { color: "#FFFFFF" },
    },
    tooltip: {
        shared: true,
        padding: 16,
        backgroundColor: "rgba(0, 170, 255, 0.15)", // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: " rgba(0, 170, 255, 0.5)", // 提示框边框颜色
        headerFormat: "{point.key}<br>",
        style: {
            color: "#ffffff",
        },
        
        formatter: function () {
        // 使用 this.point 来访问当前点的数据
        return `游客&nbsp${this.point.value}人`;
    },
    },
    credits: {
        enabled: false,
    },
    exporting: { enabled: false },
    series: [
        {
            name: "热力图",
            borderWidth: 1,
            borderColor: "#FFFFFF",
            data: heatmapData,
            dataLabels: {
                enabled: true,
                color: "#000000"
            }
        }
    ],
});
// 监听 dataList 的变化
watch(() => props.dataList, (newDataList) => {
    if (newDataList && newDataList.xCategories && newDataList.yCategories && newDataList.mapData) {
        chartOptions.value.xAxis.categories = newDataList.yCategories;
        chartOptions.value.yAxis.categories = newDataList.xCategories;
        chartOptions.value.series[0].data = newDataList.mapData;
    }
}, { immediate: true });
</script>