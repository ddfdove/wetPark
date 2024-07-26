<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const chartOptions = ref({
	chart: {
		type: 'pie',
        backgroundColor: 'rgba(0,0,0,0)',
		options3d: {
			enabled: true,
			alpha: 45,
			beta: 0
		},
        height: 320
	},
	title: {
		text: ''
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
    legend: {
        enabled:true,
        // layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom',
        symbolHeight:14,
        symbolWidth:20,
        symbolRadius:0,
        itemStyle:{'color':'#FFFFFF'}
    },
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			depth: 80,
			dataLabels: {
				enabled: true,
				format: '{point.name}'
			}
		}
	},
	series: [{
		type: 'pie',
		name: '',
		data: [
			['验收超时',   45.0],
			['派单超时',       26.8],
			{
				name: 'Chrome',
				y: 12.8,
				sliced: true,
				selected: true,
				depth: 45,
			},
			['上门超时',    8.5],
			['接单超时',     6.2],
		]
	}]
})

</script>