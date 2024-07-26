<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { keyMap, colorMap, keyToChineseMap, getIndicators, formatDate, unitMap } from '@/utils/mapping.js'
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
    height: {
        type: Number,
        default: 290
    },
    title:{
        type: String,
        default: '土壤参数对比'
    }

});
const chartOptions = ref({
    chart: {
        polar: true,
        type: 'line',
        height: 290,
        backgroundColor: '#030632',
    },
    title: {
        text: props.title,
        style: {
            color: '#ffffff',
            fontSize: "18px"
        }
    },
    pane: {
        size: '80%'
    },
    xAxis: {
        categories: ['空气温度', '空气湿度', '大气压力', 'PM2.5', '二氧化碳', '二氧化硫', '总辐射', '风速', '降雨量'],
        tickmarkPlacement: 'on',
        lineWidth: 0,
        labels: {
            rotation: 0,
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        }
    },
    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        labels: {
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        },
    },
    legend: {
        enabled: false,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        // symbolHeight:14,
        // symbolWidth:20,
        // symbolRadius:5,
        itemStyle: { 'color': '#FFFFFF' }
    },
    tooltip: {
        shared: true,
        padding: 16,
        headerFormat: '{point.key}<br>',
        backgroundColor: 'rgba(0, 170, 255, 0.15)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: 'rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        style: {
            color: '#ccc',
            fontSize: '14px',
        },
        pointFormatter: function () {
            const key = this.series.name;
            const baseKey = findBaseKey(key);
            const excellentRange = findExcellentRange(baseKey);

            let status = '良好';
            if (excellentRange) {
                const min = excellentRange[`${baseKey}_min`];
                const max = excellentRange[`${baseKey}_max`];
                if (this.y >= min && this.y <= max) {
                    status = '优';
                }
            }
            // 获取对应的单位，如果没有找到则使用空字符串
            const unit = unitMap[key] || '';
            return `<b>${key}</b>&nbsp&nbsp&nbsp&nbsp${this.y}${unit} &nbsp&nbsp&nbsp ${status}<br>${excellentRange} `;
        }
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: '环境参数',
        data: [12.6, 22, 6.3, 1.8, 2.1, 2, 6.58, 11, 1],
        pointPlacement: 'on'
    }]
})

</script>

<style scoped lang="less"></style>