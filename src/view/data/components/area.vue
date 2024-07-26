<template>
  <div>
    <highcharts :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import { keyMap, colorMap, keyToChineseMap, getIndicators, formatDate ,unitMap} from '@/utils/mapping.js'

// 定义组件的 props
const props = defineProps({
  dataList: {
    type: Object,
    default: () => ({
      "pHList": [4.847, 4.756, 4.756, 4.756, 4.756],
      "doList": [0.016, 0.016, 0.016, 0.016, 0.016],
    }),
    required: true
  },
  categories: {
    type: Array,
    default: () => [
      "2024-07-15",
      "2024-07-16",
      "2024-07-17",
      "2024-07-18",
      "2024-07-19"
    ],
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
});

const chartOptions = ref({
  chart: {
    type: 'areaspline',
    backgroundColor: '#030632',
    backgroundColor: 'transparent',
    height: props.height,
    events: {
      load() {
        const chart = this;
        chart.series.forEach(series => {
          series.update({
            events: {
              hide: updateChartAxes,
              show: updateChartAxes
            }
          });
        });
      }
    }
  },
  title: {
    text: '',
    style: {
      color: '#ffffff',
      fontSize: "18px"
    }
  },
  xAxis: {
    categories: props.categories.map(date => formatDate(date)),
    title: {
      text: null
    },
    labels: {
      rotation: 0,
      style: {
        color: '#ffffff',
        fontSize: "14px"
      }
    }
  },
  yAxis: {
    title: {
      text: null
    },
    // type: 'logarithmic', // 使用对数轴
    labels: {
      style: {
        color: '#ffffff',
        fontSize: "14px"
      }
    },
    gridLineDashStyle: 'solid',
    gridLineColor: '#221f3f',
  },
  plotOptions: {
    areaspline: {
      dataLabels: {
        enabled: true
      },
      // enableMouseTracking: false,
      fillOpacity: 0.5
    },
    series: {
      marker: {
        enabled: true
      },

    }
  },
  legend: {
    enabled: false,
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    itemStyle: { 'color': '#FFFFFF' }
  },
  tooltip: {
    shared: true,
    enabled: true,
    padding: 16,
    headerFormat: '{point.key}<br>',
    backgroundColor: 'rgba(0, 170, 255, 0.15)', // 提示框背景色
    borderWidth: 1, // 提示框边框宽度
    borderColor: 'rgba(0, 170, 255, 0.5)', // 提示框边框颜色
    style: {
      color: '#ccc',
      fontSize: '14px',
    },
  },
  credits: {
    enabled: false
  },
  exporting: { enabled: false },
  series: [{
    name: keyToChineseMap["pHList"],
    data: props.dataList["pHList"],
    color: '#00eaff',
    fillColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, 'rgba(0, 238, 255, 0.5)'],
        [1, 'rgba(0, 234, 255, 0)']
      ]
    },
  }]
});

let min = ref(null)
let max = ref(null)
let status = ref('良')
const findBaseKey = (key) => keyMap[key];

const findExcellentRange = (baseKey, isExcellent) => {
  if (!baseKey) return undefined;
  return isExcellent.find(item => item[`${baseKey}_min`] !== undefined && item[`${baseKey}_max`] !== undefined);
};
// 更新 chartOptions 的方法
const updateChartOptions = (dataList, categories, isExcellent) => {
  if (!dataList || !categories) {
    return;
  }
  let globalMin = Infinity;
  let globalMax = -Infinity;
  //更新series数据
  chartOptions.value.series = Object.keys(dataList).map(key => {
    const seriesData = dataList[key];
    const baseKey = findBaseKey(key);

    if (baseKey) {
      const excellentRange = findExcellentRange(baseKey, isExcellent);
      if (excellentRange) {
        const seriesMin = Math.min(...seriesData);
        const seriesMax = Math.max(...seriesData);

        globalMin = Math.min(globalMin, seriesMin);
        globalMax = Math.max(globalMax, seriesMax);
      }
    }

    return {
      name: keyToChineseMap[key],
      data: seriesData,
      color: '#00eaff',
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(0, 238, 255, 0.5)'],
          [1, 'rgba(0, 234, 255, 0)']
        ]
      },
    };
  });
  //更新y轴的最小值，最小值和间隔y
  updateYAxis(globalMin, globalMax);


  // 更新 categories 的显示格式
  const cleanedCategories = categories.map(date => formatDate(date));
  chartOptions.value.xAxis.categories = cleanedCategories;
  // 更新 tooltip 中 pointFormatter 的数据
  chartOptions.value.tooltip.pointFormatter = function () {
    const getEnglishName = (chineseName) => {
      for (const key in keyToChineseMap) {
        if (keyToChineseMap[key] === chineseName) {
          return key;
        }
      }
      return null; // 如果没有找到对应的英文名，可以根据需要返回 null 或其他默认值
    }
    const chineseName = this.series.name
    const englishName = getEnglishName(this.series.name);
    const baseKey = findBaseKey(englishName);
    const excellentRange = findExcellentRange(baseKey, isExcellent);


    if (excellentRange) {
      min.value = excellentRange[`${baseKey}_min`];
      max.value = excellentRange[`${baseKey}_max`];
      getIndicators(englishName, this.y, min.value, max.value, status)

    }
    // 获取对应的单位，如果没有找到则使用空字符串
    const unit = unitMap[chineseName] || '';
    return `<b>${chineseName}</b>&nbsp&nbsp&nbsp&nbsp${this.y}&nbsp${unit}&nbsp&nbsp&nbsp&nbsp ${status.value}<br> `;
  };
  //标题
  chartOptions.value.title.text = chartOptions.value.series.length > 0 ? chartOptions.value.series[0].name : '';
}
const updateYAxis = (globalMin, globalMax) => {
  // 调整最大值和最小值，并计算间隔
  const adjustedMax = Math.ceil(globalMax * 1.2);
  const adjustedMin = globalMin < 0 ? Math.floor(globalMin * 1.1) : 0;
  const range = adjustedMax - adjustedMin;
  const tickInterval = Math.ceil(range / 4);
  chartOptions.value.yAxis = {
    title: {
      text: null
    },
    labels: {
      style: {
        color: '#ffffff',
        fontSize: "14px"
      }
    },
    gridLineDashStyle: 'solid',
    gridLineColor: '#221f3f',
    min: adjustedMin,  // 设置最小值
    max: adjustedMax,  // 设置最大值
    tickInterval: tickInterval  // 设置刻度间隔
  };
};

const updateChartAxes = function () {
  let globalMin = Infinity;
  let globalMax = -Infinity;

  this.chart.series.forEach(series => {
    if (series.visible) {
      const seriesMin = Math.min(...series.yData);
      const seriesMax = Math.max(...series.yData);

      globalMin = Math.min(globalMin, seriesMin);
      globalMax = Math.max(globalMax, seriesMax);
    }
  });

  updateYAxis(globalMin, globalMax);
  this.chart.yAxis[0].update(chartOptions.value.yAxis);
};
// 监听 props.dataList 和 props.categories 的变化，并更新 chartOptions
watch(
  [() => props.dataList, () => props.categories, () => props.isExcellent],
  ([newDataList, newCategories, newIsExcellent]) => {
    updateChartOptions(newDataList, newCategories, newIsExcellent);
  },
  { immediate: true }
);

// 初次加载时更新 chartOptions
onMounted(() => {
  updateChartOptions(props.dataList, props.categories, props.isExcellent);
});
</script>