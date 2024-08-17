<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// 定义组件的 props
const { dataList } = defineProps({
    dataList: {
        type: Array,
        default: () => [
            {
                name: "2021",
                data: [100, 156, 222, 65, 89, 95, 12, 189, 223, 99, 156, 245],
            },
            {
                name: "2022",
                data: [149, 123, 221, 89, 86, 59, 145, 198, 226, 146, 110, 145],
            },
            {
                name: "2023",
                data: [148, 156, 222, 56, 29, 98, 45, 125, 146, 249, 211, 102],
            },
            {
                name: "2024",
                data: [223, 156, 222, 87, 111, 23, 56, 79, 145, 11, 233, 210],
            },
        ],
    },
});
const chartOptions = ref({
    chart: {
        type: "spline",
        backgroundColor: "#030025",
        width: 1320,
        height: 320,
    },
    title: {
        text: null,
    },
    // style: {
    // color: 'red',
    // fontSize: "12px",

    //  },
    xAxis: {
        categories: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
        ],
        title: {
            text: null,
        },
        crosshair: true,
        labels: {
            style: {
                color: "#919191",
                fontSize: "12px",
            },
        },
    },

    yAxis: {
        categories: ["0", "200", "400", "600", "800", "1000"],
        title: {
            text: null,
        },
        labels: {
            style: {
                color: "#919191",
                fontSize: "12px",
            },
        },
        gridLineDashStyle: "solid", //网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: "#221f3f",
        min: 0, //最小值
        tickInterval: 50, //间隔
        max: 250, //最大值
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true,
            },
            enableMouseTracking: false,
        },
        series: {
            marker: {
                enabled: false,
            },
        },
    },
    legend: {
        itemStyle: { color: "#FFFFFF" },
    },
    tooltip: {
        // enable:false,
        shared: true,
        padding: 16,

        backgroundColor: "rgba(0, 170, 255, 0.15)", // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: " rgba(0, 170, 255, 0.5)", // 提示框边框颜色
        // style: {
        //     color: 'rgb(124,124,124)',
        // },
        headerFormat: "{point.key}<br>",
        pointFormat: " <b> {series.name}</b>&nbsp&nbsp&nbsp {point.y} <br>",
        style: {
            color: "#ccc",
            letterSpacing: "2px",
            fontSize: "14px",
        },
    },
    credits: {
        enabled: false,
    },
    exporting: { enabled: false },
    series: [
        {
            name: dataList[0].name,
            data: dataList[0].data,
            marker: {
                symbol: "circle",
                lineColor: "#43cf7c",
            },
        },
        {
            name: dataList[1].name,
            data: dataList[1].data,
            // color: 'rgb( 250,215,130)'
            marker: {
                symbol: "circle",
                lineColor: "#ff8d1a",
            },
        },
        {
            name: dataList[2].name,
            data: dataList[2].data,
            // lineColor: 'rgb(225,173,129)',
            marker: {
                symbol: "circle",
                lineColor: "#ac33c1",
            },
        },
        {
            name: dataList[3].name,
            data: dataList[3].data,
            marker: {
                symbol: "circle",
                lineColor: "#2263ed",
            },
        },
    ],
});
</script>
