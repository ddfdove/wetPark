<template>
  <div class="container">


    <ul class="top">
      <li id="left">
        <div class="lTop">
          <panelboard :chTitle="'季度人流排行'" :enTitle="'Quarterly traffic ranking'" style="margin-top: 40px;">
            <ul class="statisticTop flex">
              <li class="flex-1" v-for="(item, index) in visitorByjiData" :key="index"
                :style="{ backgroundImage: `url(${item.image})` }">
                <div style="color: #00A3FF;">{{ item.description }}</div>
                <span :style="{ color: `${item.color}` }">{{ item.quantity }}</span>
              </li>
            </ul>
          </panelboard>
        </div>
        <div class="lBottom">
          <panelboard :chTitle="'时段排行'" :enTitle="'Time period ranking'">
            <Timeout v-if="timeRankData.length > 0" :dataList="timeRankData"></Timeout>
          </panelboard>
        </div>
      </li>
      <li id="middle">
        <ul class="switchButton">
          <li :class="{ 'active-link': $route.path === '/monitor/environment' }">
            <router-link to="/monitor/environment"><span>环境监测</span></router-link>
          </li>
          <li :class="{ 'active-link': $route.path === '/monitor/bird' }">
            <router-link to="/monitor/bird"><span>鸟类监测</span></router-link>
          </li>
          <li :class="{ 'active-link': $route.path === '/monitor/personnel' }">
            <router-link to="/monitor/personnel"><span>人流监测</span></router-link>
          </li>

        </ul>
        <div class="mtop" style="margin-top: 10px;">
          <panelboard :chTitle="'人员分布情况'" :enTitle="'Personnel distribution'">
            <div class="mBottom">
              <!-- <Personnel></Personnel> -->
              <HotMap></HotMap>
            </div>
          </panelboard>
        </div>

      </li>
      <li id="right">
        <panelboard :chTitle="'区域人员分布对比'" :enTitle="'Staff Distribution'" style="margin-top: 20px;">
          <!-- <mvcProgress :list="personList" style="width: 530px;margin-top: 50px;"></mvcProgress> -->
          <Personnel style="width: 530px;margin-top: 30px;" :dataList="regionalPersonnelData"></Personnel>
        </panelboard>
      </li>
    </ul>
    <div class="bottom">
      <div id="bLeft">
        <panelboard :chTitle="'人流量'" :enTitle="'Human traffic'">
          <Visitors class="visitors" :dataList="vistorData"></Visitors>
        </panelboard>
      </div>
      <div id="bRight">
        <panelboard :chTitle="'景区人流排行Top5'" :enTitle="'ScenicSpot flow ranking'">
          <Garden class="garden" :dataList="gardenTopData"></Garden>
        </panelboard>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, onBeforeUnmount, } from 'vue';
import Timeout from './timeout.vue';
import Visitors from './visitors.vue';
import Personnel from './personnel.vue'
import Regional from './regional.vue'
import Garden from './garden.vue'
import HotMap from './hotMap.vue'
import { useRoute } from 'vue-router';
import {getVisitorByji, getVisitor, getRegionalPersonnel, getPersonnelDistribution, getTimeRank, getGardenTop } from '@/api/index.js'
import panelboard from "../../../components/panelboard/index.vue"
import mvcProgress from "./components/mvc-progress.vue"


const $route = useRoute();
const isBirdLinkActive = (path: string) => {
  return $route.path === path ||
    ($route.path === '/personnel' && path === '/bird') ||
    ($route.path === '/environment' && path === '/bird');
};
let statistic = ref([
  {
    description: '一季度',
    quantity: '120',
    image: '/cut/square.png',
    color: '#ffffff'
  },
  {
    description: '二季度',
    quantity: '5675',
    image: '/cut/square.png',
    color: '#FFC300'
  },
  {
    description: '三季度',
    quantity: '800',
    image: '/cut/square.png',
    color: '#FF8D1A'
  },
  {
    description: '四季度',
    quantity: '3000',
    image: '/cut/square.png',
    color: '#00FF85'
  },
])
const personList = reactive([
  {
    name: "A区",
    value: 10,
  },
  {
    name: "B区",
    value: 14,
  },
  {
    name: "C区",
    value: 23,
  }
])
const visitorByjiData=ref([])
const vistorData = ref([])
const regionalPersonnelData = ref([])
const personnelDistributionData = ref([])
const timeRankData = ref([])
const gardenTopData = ref([])
let intervalId = null;
let isFetching = false;
//季度人流数据
const getVisitorByjiData = async () => {
  try {
    const res = await getVisitorByji(); // 替换为实际的 API 请求

    if (res.code === 0) {
      // 获取后端返回的数据
      const data = res.data;

      // 映射数据
      visitorByjiData.value = data.map(item => {
        let description = '';
        switch (item.QUARTER) {
          case '第1季度':
            description = '一季度';
            break;
          case '第2季度':
            description = '二季度';
            break;
          case '第3季度':
            description = '三季度';
            break;
          case '第4季度':
            description = '四季度';
            break;
          default:
            description = '';
        }

        return {
          description: description,
          quantity: item.total_number.toString(),
          image: '/cut/square.png', // 你可以根据需求替换图片路径
          color: getColorForQuarter(item.QUARTER) // 你可以根据需求设置颜色
        };
      });

      
    } else {
      console.error('Failed to fetch data, response code:', res.code);
    }
  } catch (error) {
    console.error('Failed to fetch visitor data:', error);
  }
};

// 根据季度返回不同的颜色
const getColorForQuarter = (quarter) => {
  switch (quarter) {
    case '第1季度':
      return '#ffffff'; // 白色
    case '第2季度':
      return '#FFC300'; // 黄色
    case '第3季度':
      return '#FF8D1A'; // 橙色
    case '第4季度':
      return '#00FF85'; // 绿色
    default:
      return '#ffffff'; // 默认颜色
  }
};
// 格式化日期的函数
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}-${day} ${hours}:${minutes}`;
};
//人流量数据
const getVisitorData = async () => {
  try {
    const res = await getVisitor(); // 替换为实际的 API 请求
    if (res.code === 0) {
      // 获取后端返回的数据
      const data = res.data;

      // 创建 categories 和 series
      const series = [];
      let categories = [];

      // 处理每个数据项
      data.forEach(item => {
        const { data: seriesData, name, categories: itemCategories } = item;

        // 如果 categories 未初始化，初始化它
        if (categories.length === 0 && itemCategories) {
          categories = itemCategories;
        }

        // 添加 series 数据
        series.push({
          name: name,
          data: seriesData
        });
      });
      // 处理 categories
      const formattedCategories = categories.map(formatDate);
      // 更新 vistorData
      vistorData.value = {
        series: series,
        categories: formattedCategories
      };

      console.log('vistorData.value', vistorData.value);

    } else {
      console.error('Failed to fetch data, response code:', res.code);
    }
  } catch (error) {
    console.error('Failed to fetch visitor data:', error);
  }
};
//人员分布数据
// 数据转换函数
const transformData = (data) => {
  const xAxisCategories = [];
  const yAxisCategories = [];

  console.log('datadata.forEachtransformData', data);

  // 收集所有 x 和 y 轴的类别
  data.forEach(item => {
    xAxisCategories.push(item.date_hour);  // 直接使用 date_hour 作为 x 轴类别
    yAxisCategories.push(item.camera_name); // 摄像头名称作为 y 轴类别
  });

  console.log('xAxisCategories', xAxisCategories);
  console.log('yAxisCategories', yAxisCategories);

  // 转换为数组，并进行排序（如果不想排序，可以去掉这一步）
  const xcategories = [...xAxisCategories];
  const ycategories = [...yAxisCategories];

  console.log('xcategories', xcategories);
  console.log('ycategories', ycategories);

  // 创建二维数组并填充值
  const dataMatrix = Array.from({ length: ycategories.length }, () => Array(xcategories.length).fill(0));

  data.forEach(item => {
    const xIndex = xcategories.indexOf(item.date_hour);
    const yIndex = ycategories.indexOf(item.camera_name);

    if (xIndex !== -1 && yIndex !== -1) {
      dataMatrix[yIndex][xIndex] = item.snumber;
    }
  });
  console.log('xcategories',xcategories);
  console.log('ycategories',ycategories);
  console.log('dataMatrix',dataMatrix);
  
  return {
    xcategories,
    ycategories,
    data: dataMatrix
  };
};


// 获取数据函数
const getPersonnelDistributionData = async () => {
  try {
    const res = await getPersonnelDistribution();
    console.log('API response:', res); // 添加日志以调试数据结构
    if (res.code == 0) {
      console.log('Array.isArray(res.data)',Array.isArray(res.data));
      
      if (Array.isArray(res.data)) {
        regionalPersonnelData.value = transformData(res.data);
        console.log('personnelDistributionData',personnelDistributionData.value);
        
      } else {
        console.error('Unexpected data format:', res.data);
      }
    } else {
      console.error('Failed to fetch data:', res.message);
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};


//区域人员数据
const getRegionalPersonnelData = async () => {
  try {
    const res = await getRegionalPersonnel(); // 替换为实际的 API 请求
    if (res.code == 0) {
    
    
      // 处理数据
     
     
      const  categories=res.data.categories
      const seriesData=res.data.mlist.map(item=>{
        return {
          name:item.name,
          data:item.data
        }
      })
      regionalPersonnelData.value={
        categories:categories,
        series:seriesData
      }
     
      
    } else {
      console.error('Failed to fetch data, response code:', res.code);
    }
  } catch (error) {
    console.error('Failed to fetch personnel distribution data:', error);
  }
};


//时段排行数据
const getTimeRankData = async () => {
  try {
    const res = await getTimeRank(); 

    if (res.code === 0) {
      // 获取后端返回的数据
      const data = res.data;

      // 映射数据
      timeRankData.value = data.map(item => {
        return {
          name: item.time_period,  // 直接使用 time_period 作为 name
          y: item.snumber,         // 使用 snumber 作为 y
          h: item.snumber,         // 使用 snumber 作为 h
          sliced: item.time_period === '中午' // 根据具体的业务逻辑设置 sliced
        };
      });

      
    } else {
      console.error('Failed to fetch data, response code:', res.code);
    }
  } catch (error) {
    console.error('Failed to fetch time rank data:', error);
  }
};

//园区top5数据
const getGardenTopData = async () => {

  try {
    const res = await getGardenTop()
    if (res.code == 0) {
      gardenTopData.value = {
        categories: res.data.map(item => item.camera_name),
        series: [{
          name: '园区Top 5数据',
          data: res.data.map(item => item.snumber)
        }]
      };
    }
  } catch (error) {

  }

}
//组件挂载完毕更新当前的事件
const fetchData = async () => {
  if (isFetching) return; // 如果正在获取数据，直接返回
  isFetching = true; // 标记正在获取数据

  try {
    await Promise.all([
    getVisitorByjiData(),
      getVisitorData(),
      getRegionalPersonnelData(),
      getPersonnelDistributionData(),
      getTimeRankData(),
      getGardenTopData()
    ]);

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching = false; // 请求完成，重置标志
  }

};
const startPolling = async () => {
  fetchData(); // 初始加载数据

  // intervalId = setInterval(fetchData, 3 * 60000); // 每隔3分钟秒获取一次数据
  intervalId = setInterval(fetchData, 10000); // 每10秒获取一次数据
};
const stopPolling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};
onMounted(() => {
  startPolling();

});

onUnmounted(() => {
  stopPolling();
});
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #030025;
  color: #FFFFFF;

  // height: 1000px;
  .top {
    flex: 5.8;
    display: flex;
    width: 100%;


    .switchButton {
      margin-left: 120px;
      margin-top: 10px;
      display: flex;
      align-items: center;

      li {
        margin: 0 20px;
        margin-bottom: 10px;
        color: #021f66;
        width: 160px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: url('/cut/未选中@1x.png');
        background-size: cover;

        &.active-link {

          background: url('/cut/选中@1x.png');

        }

        span {
          font-family: YouSheBiaoTiHei;
          font-size: 20px;
          font-weight: normal;
          // line-height: 12px;
          text-align: center;
          color: #FFFFFF;
        }
      }

      // li:hover {
      //   background-color: #0f3890;
      // }

    }

    #left {
      flex: 1;
      display: flex;
      flex-direction: column;

      .lTop {
        flex: 1.5;

        .statisticTop {
          display: flex;
          height: 100px;
          margin-top: 40px;
          // padding: 50px 20px 10px 20px;

          li {
            background-size: 98% 100%;
            background-repeat: no-repeat;
            margin: 0 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            padding-top: 5px;

            div {
              color: #00A3FF;
              font-size: 25px;

            }

            span {
              font-size: 25px;
              // margin: 5px 20px 0 0
              margin-top: 10px;
              text-align: center;
            }

          }

          #area {

            text-align: center;

            #lTop {
              width: 100px;
              margin-left: 60px;
              border: 1px solid rgb(46, 191, 191);
              border-radius: 2px;
            }

            #lBottom {
              margin-top: 30px;
              border-right: 1px solid rgb(28, 44, 64);

              #bl {
                font-size: 40px;
                margin-right: 5px;
              }

              #br {
                color: rgb(35, 104, 191);
              }
            }
          }

        }
      }

      .lBottom {
        flex: 2;
        padding: 0 10px;
      }
    }

    #middle {
      flex: 1.4;

      // width: 770px;
      // margin-top: 10px;
      margin-right: 10px;
      // border-radius: 5px;
      display: flex;
      flex-direction: column;


      .mBottom {
        flex: 5;
        // margin-top: 40px;
        padding: 10px 20px;
        // border: 1px solid #021f66;
      }
    }

    #right {
      flex: 0.6;
      margin-top: 20px;
      padding: 0 20px 0 10px;
      // margin-left: 30px;

    }
  }

  .bottom {
    flex: 4;
    // height: 460px;
    display: flex;

    #bLeft {
      flex: 1.8;


      .visitors {
        margin-top: 20px;
        margin-right: 10px;
        margin-left: 10px;
        border: 1px solid #021f66;
      }

    }

    #bRight {
      flex: 1.2;

      .garden {
        border: 1px solid #021f66;

        margin: 20px 5px 0 20px;
      }



    }
  }
}
</style>
