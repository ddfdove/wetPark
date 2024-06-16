<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const chartOptions = ref({
    chart: {
        type: 'column',
        backgroundColor: '#030025',
        width: 500,
        height: 320
    },
    title: {
        text: null
    },
    xAxis: {

        categories: ['北京', '上海', '深圳', '广州', '杭州', '厦门', '珠海'],
        title: {
            text: null
        },
        // gridLineWidth: 1,
        lineWidth: 0,
        labels: {
            enabled: true,
            style: {
                color: '#919191',
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
                color: '#919191',
                fontSize: "12px"
            }
        },
        gridLineDashStyle: 'solid',//网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: '#221f3f',
        min: 0,//最小值
        tickInterval: 1000, //间隔
        max: 6000 //最大值
    },
    plotOptions: {
        column: {
            borderRadius: '50',
            dataLabels: {
                enabled: true,
                color: 'rgb(255,204,0)'
            },
            borderColor: '',//去边框
            shadow: false,		//去阴影
            groupPadding: 0.1,
            // color:'red'
        },
        // area:{
        //     shadow:{
        //         color:'rgba(0,0,0,0.5)',
        //         offsetX:0,
        //         offsetY:2,
        //         opacity:0.5,
        //         width:5
        //     }
        // }
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        type: 'column',
        name: '数据一',
        data: [4950, 5768, 3421, 5887, 4655, 5490, 2907],
        color: 'rgb(74,77,240)',
        pointPadding: 0.3,
        groupPadding: 0.2,
        // borderRadiusTopLeft: 100,
        // borderRadiusTopRight: 100,

    }, {
        type: 'line',
        name: '数据二',
        data: [4950, 5768, 3421, 5887, 4655, 5490, 2907],
        color: 'rgb(173,68,114)',
        pointPadding: 0,
        groupPadding: 0.2
    }
    ]
})

</script>