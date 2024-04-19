<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const chartOptions = ref({
    chart: {
        type: 'spline',
        backgroundColor: '#0b1c2e',
        // width:400,
        height: 260
    },
    title: {
        text: null
    },
    // style: {
    // color: 'red',
    // fontSize: "12px",

    //  },
    xAxis: {
        categories: ['今日', '本月', '本季度', '上季度', '全年'],
        title: {
            text: null
        },
        crosshair:{
            snap:true,
            label: {
                enabled: true,
                align: 'right',
                // 格式化文本内容
                // formatter: '{chart.options.countries.(value).ucCode}<br>' +
                // '<span class="f32">' +
                // '<span style="display:inline-block;height:32px;vertical-align:text-top;" ' +
                // 'class="flag {value}"></span></span>'
              }
        },
        labels: {
            style: {
                color: '#919191',
                fontSize: "12px"
            }
        }
    },

    yAxis: {
        categories: ['0', '200', '400', '600', '800', '1000'],
        title: {
            text: null
        },
        labels: {
            style: {
                color: '#919191',
                fontSize: "12px"
            }
        },
        gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor:'rgb(64,64,64)',
        min:0 ,//最小值
		tickInterval:200, //间隔
		max:1000 //最大值
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    credits: {
        enabled: false
    },
    exporting: {enabled: false},
    series: [{
        name: '识别次数',
        lineColor: 'rgb(215,117,91)',

        data: [88, 156, 222, 567, 994]
    }, {
        name: '鸟类种数',
        data: [55, 88, 156, 253, 312],
        color: 'rgb( 250,215,130)'

    }]
})

</script>