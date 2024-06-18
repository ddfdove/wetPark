<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"

const {dataList} = defineProps({
    dataList: {
        type: Array,
        default: () => [
            {
                name: '上午',
                y: 224,
                h: 50,
            },
            {
                name: '中午',
                y: 100,
                h: 30,
                sliced: true,
            },
            {
                name: '下午',
                y: 119,
                h: 50,
            },
            {
                name: '晚上',
                y: 150,
                h: 50,
            },
        ]
    }
})


const chartOptions = ref({
    chart: {
        type: 'pie',
        backgroundColor: 'rgba(0,0,0,0)',
        spacing: [0, 0, 10, 0], // 去掉图表的内边距
        // width:400,
        height: 260,
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        },
        // events: {
        //     load: function () {
        //         const each = highcharts.each
        //         const points = this.series[0].points
        //         each(points, function (p) {
        //             const ran = p.options.h // 获取自定义的高度值
        //             p.graphic.attr({
        //                 translateY: -ran
        //             })
        //             if (p.graphic.side1) {
        //                 p.graphic.side1.attr({
        //                     translateY: -ran
        //                 })
        //             }
        //             if (p.graphic.side2) {
        //                 p.graphic.side2.attr({
        //                     translateY: -ran
        //                 })
        //             }
        //         })
        //     }
        // },
    },
    title: {
        text: null,

    },
    // tooltip: {
    //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    // },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: true,
            depth: 80,
            dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b><br>{point.y} ',
                // format: '<b>{point.name}</b><br>{point.percentage:1f} ',
                // distance: -40,
                // filter: {
                //     property: 'percentage',
                //     operator: '>',
                //     value: 4
                // }
            }
        }
    },
    legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        symbolHeight: 8,
        symbolWidth: 8,
        // symbolRadius: 0,
        itemStyle: { 'color': '#FFFFFF', },
        labelFormatter: function () {
            return `
        
            <span style="font-size: 14px;">${this.name}</span> </br> </br>
            <span style="color:${this.color}; font-size: 20px; padding:10px">${this.y}</span>
       
      `;
        }
    },
    tooltip: {
        enable: true,
        headerFormat: '',
        backgroundColor: 'rgba(0, 170, 255, 0.15)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: ' rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        style: {
            color: '#ffffff',

        },
        pointFormat: ' <b> {point.name}</b>: {point.y} '
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: '超时订单',
        data: dataList,
        colors: [
            'rgb(255,207,72)',
            '#e02b41',
            'rgb(22,132,252)',
            'rgb(96,181,101)',
        ]
    }]
})

</script>