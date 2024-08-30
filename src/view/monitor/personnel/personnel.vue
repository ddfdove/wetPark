<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";

// 定义组件的 props
const props = defineProps({
    dataList: {
        type: Object,
        default: () => ({}), // 确保默认是一个对象
    },
});

// 初始化 chartOptions
const chartOptions = ref({
    chart: {
        type: "cylinder",
        backgroundColor: "#030025",
        spacing: [10, 20, 0, 0], // 去掉图表的内边距
        width: 530,
        options3d: {
            enabled: true,
            depth: 50,
        },
    },
    title: {
        text: null,
    },
    xAxis: {
        categories: [], // 初始为空，在 watch 中更新
        title: {
            text: null,
        },
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
        gridLineWidth: 2,
        gridLineDashStyle: "solid",
        gridLineColor: "#221f3f",
        // min: 0,
        // tickInterval: 80,
        // max: 400,
    },
    plotOptions: {
        series: {
            depth: 60,
            pointWidth: 18,
            dataLabels: {
                enabled: false,
            },
            groupPadding: 0.2,
            pointPadding: 0.2,
        },
        cylinder: {
            depth: 25,
            edgeWidth: 2,
        },
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
        pointFormat:
            " <b> {series.name}</b>&nbsp&nbsp&nbsp&nbsp {point.y} <br><br>",
    },
    credits: {
        enabled: false,
    },
    exporting: { enabled: false },
    series: [], // 初始为空，在 watch 中更新
});

// 监听 props.dataList 的变化
watch(
    () => props.dataList,
    (newDataList) => {
        if (newDataList && newDataList.categories && newDataList.series) {
            chartOptions.value.xAxis.categories = newDataList.categories.slice(0,6);
            chartOptions.value.series = newDataList.series.map((series, index) => ({
                name: series.name,
                data: series.data.slice(0,6),
                color: {
                    linearGradient: index === 0 
                        ? { x1: 0, x2: 0, y1: 0, y2: 1 } 
                        : { x1: 0, y1: 0, x2: 1, y2: 0 },
                    stops: index === 0 
                        ? [
                            [0, "rgba(0, 133, 255, 0.5)"],
                            [1, "rgba(0, 71, 255, 0)"],
                        ]
                        : [
                            [0, "rgba(0, 102, 255, 0.6)"],
                            [0.12, "rgba(0, 102, 255, 0.6)"],
                            [0.49, "rgba(135, 212, 255, 0.6)"],
                            [0.91, "rgba(0, 117, 255, 0.6)"],
                            [1, "rgba(0, 117, 255, 0.6)"],
                        ],
                },
            }));
        }
    },
    { immediate: true, deep: true } // 立即执行一次，并且深度监听
);
</script>
