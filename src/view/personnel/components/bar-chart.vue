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
        backgroundColor: 'rgba(0,0,0,0)',
        width:469,
        height: 472,
        options3d: {
						enabled: true,
						alpha: 25,
						beta: 0,
						depth: 100,
						viewDistance: 25
				}
    },
    title: {
				text: ''
		},
		subtitle: {
				text: ''
		},
        plotOptions: {
        column: {
            borderRadius: '50',
            dataLabels: {
                enabled: true,
                color:'rgb(255,204,0)'
            },
            borderColor:'',//去边框
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
		xAxis: {
				// categories: chartOptions.getOptions().lang.shortMonths
		},
		yAxis: {
				title: {
						text: null
				}
		},
		series: [{
				name: '销售',
				data: [2, 3, null, 4, 0, 5, 1, 4, 6, 3]
		}]
})

</script>