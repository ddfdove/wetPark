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
				options3d: {
						enabled: true,
						alpha: 45
				},
                backgroundColor: 'rgba(0,0,0,0)',
                height: 230
		},
		title: {
				text: ''
		},
		subtitle: {
				text: ''
		},
		plotOptions: {
				pie: {
						innerSize: 100,
						depth: 45
				}
		},
		series: [{
				name: '货物金额',
				data: [
						['一级鸟类', 22],
						['二级鸟类', 32],
						['其他鸟类', 133],
				]
		}]
})

</script>