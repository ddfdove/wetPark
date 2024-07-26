<template>
  <div class="container flex">

    <div class="left">
      <div class="flex-2 ltop">
        <panelboard :chTitle="'地点监测'" :enTitle="'Location Detection'">
          <div class="flex area">
            <div style="margin: 0 10px 0 10px;">
              <span>区域:</span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <span style="margin-right: 10px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu style="background-color:#030636;color:#ffffff">
                    <el-dropdown-item command="a" style="color:#ffffff">
                      西岸1号
                    </el-dropdown-item>
                    <el-dropdown-item command="b" style="color:#ffffff">西岸2号</el-dropdown-item>
                    <el-dropdown-item command="c" style="color:#ffffff">西岸3号</el-dropdown-item>
                    <el-dropdown-item command="c" style="color:#ffffff">西岸4号</el-dropdown-item>
                    <el-dropdown-item command="c" style="color:#ffffff">西岸5号</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div>
              <span class="text-sm" style="margin-right: 10px;">时间:</span>
              <el-dropdown @command="handleCommand" class="leading-10 h-10">
                <span class="el-dropdown-link">
                  <span style="margin-right: 10px;">上午</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu style="background-color:#030636;color:#ffffff">
                    <el-dropdown-item command="a" style="color:#ffffff">上午</el-dropdown-item>
                    <el-dropdown-item command="b" style="color:#ffffff">中午</el-dropdown-item>
                    <el-dropdown-item command="c" style="color:#ffffff">下午</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <span>—</span>
              <el-dropdown @command="handleCommand" class="leading-10 h-10">
                <span class="el-dropdown-link" style="margin-left: 10px;">
                  <span style="margin-right: 10px;">中午</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu style="background-color:#030636;">
                    <el-dropdown-item command="a" style="color:#ffffff">上午</el-dropdown-item>
                    <el-dropdown-item command="b" style="color:#ffffff">中午</el-dropdown-item>
                    <el-dropdown-item command="c" style="color:#ffffff">下午</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="bird">
            <ul>
              <li v-for="(item, index) in birds.slice(0, 5)" :key="index">
                <div>
                  <span class="font-25">{{ item.quantity }}</span>
                  <span class="font-18">只</span>
                </div>
                <h5 class="font-18">{{ item.name }}</h5>
              </li>

            </ul>
          </div>
        </panelboard>
      </div>
      <div class="flex-3 lbottom">
        <panelboard :chTitle="'实时监测'" :enTitle="'Real-time monitoring'">
          <ul>
            <li v-for="(item, index) in places.slice(0, 5)" :key="index">
              <div>
                <span style="color: #4DA6FF;">{{ item.area }}</span>
                <span style="margin-left: 280px;">{{ item.time }}</span>
              </div>
              <div>{{ item.describe }}</div>
            </li>
          </ul>
        </panelboard>
      </div>
    </div>
    <div class="middle">
      <ul class="switchButton">
        <li :class="{ 'active-link': $route.path === '/monitor/environment' }">
          <router-link to="/monitor/environment"><span>环境监测</span></router-link>
        </li>
        <li :class="{ 'active-link': $route.path === '/monitor/bird' }">
          <router-link to="/monitor/bird"><span>鸟类监测</span></router-link>
        </li>
        <li :class="{ 'active-link': $route.path === '/monitor/personnel' }">
          <router-link to="/monitor/personnel"><span>人员监测</span></router-link>
        </li>
        
      </ul>
      <div class="mTop">
        <panelboard :chTitle="'视频监控'" :enTitle="'Video Surveillance'">

          <!-- <el-tabs v-model="activeName" class="demo-tabs" type="card" tab-position="top">
            <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.label" :name="item.name">
              
            </el-tab-pane>
          </el-tabs> -->
          <div class="video-container">
            <!-- controls="controls" -->
            <div class="date-time">2024年06月15日 星期六 15:44:01</div>
            <video width="100%" height="100%" autoplay poster="../../../assets/images/cut/bird/bird5.png">
              <source src="">
              你的浏览器不支持HTML5视频。
            </video>
          </div>
        </panelboard>

      </div>
      <div class="mBottom">
        <panelboard :chTitle="'鸟类增长数据'" :enTitle="'Bird show'">
          <!-- <div class="birdShow">
            <Carousel :birdsList="birdsList"></Carousel>
          </div> -->
          <ul class="statisticBottom" style="margin-top: 10px;">
            <li>

              <div class="monitarChart">
                <PeopleChart class="border"></PeopleChart>
              </div>

            </li>
            <li>

              <div class="monitarChart">
                <WaterChart class="border"></WaterChart>
              </div>
            </li>
            <li>

              <div class="monitarChart">
                <AirChart class="border"></AirChart>
              </div>

            </li>
          </ul>
        </panelboard>
      </div>
    </div>
    <div class="right">
      <panelboard :chTitle="'种类搜索'" :enTitle="'Category Search'">
        <div class="flex area" style="margin-top: 20px;">
          <div style="margin: 0 10px 0 10px;">
            <span>种类:</span>
            <el-dropdown @command="handleFirstDropdown">
              <span class="el-dropdown-link">
                <span style="margin-right: 10px;">{{ firstSelected }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu style="background-color:#030636;color:#ffffff">
                  <el-dropdown-item v-for="item in firstOptions" :key="item.id" :command="item.id"
                    style="color:#ffffff">
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div>
            <span class="text-sm" style="margin-right: 10px;">时间:</span>
            <el-dropdown @command="handleSecondDropdown" class="leading-10 h-10">
              <span class="el-dropdown-link">
                <span style="margin-right: 10px;">{{ secondSelected }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu style="background-color:#030636;color:#ffffff">
                  <el-dropdown-item v-for="item in secondOptions" :key="item.id" :command="item.id"
                    style="color:#ffffff">
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>—</span>
            <el-dropdown @command="handleThirdDropdown" class="leading-10 h-10">
              <span class="el-dropdown-link" style="margin-left: 10px;">
                <span style="margin-right: 10px;">{{ thirdSelected }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu style="background-color:#030636;">
                  <el-dropdown-item v-for="item in thirdOptions" :key="item.id" :command="item.id"
                    style="color:#ffffff">
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="bird">
          <ul>
            <li v-for="(item, index) in birds.slice(0, 5)" :key="index" @click="handleDesc(item.id)">
              <div>
                <span class="font-25">{{ item.quantity }}</span>
                <span class="font-18">只</span>
              </div>
              <h5 class="font-18">{{ item.name }}</h5>
            </li>
          </ul>
        </div>
      </panelboard>
      <panelboard :chTitle="'鸟类展示'" :enTitle="'Bird Show'">
        <div class=" animal">
          <div class="name">{{ discription.name }}</div>
          <div class="flex" style="background-color: #030632;">
            <div class="animal flex-1">
              <ul class="flex flex-col">
                <li class="flex-1 family">{{ discription.family }}</li>
                <li class="flex-1">身高：{{ discription.height }}</li>
                <li class="flex-1">翼展：{{ discription.Wingspan }}</li>
                <li class="flex-1">体重：{{ discription.weight }}</li>
                <li class="flex-1">拉丁学名：{{ discription.scientificName }}</li>
                <li class="flex-1">地理分布：{{ discription.distributed }}</li>
              </ul>
            </div>
            <div class="flex-1" style="margin:auto;"> <img :src="discription.src">
            </div>
          </div>

        </div>
      </panelboard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import Carousel from './carousel.vue'
import panelboard from "../../../components/panelboard/index.vue"
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import PeopleChart from './people.vue'
import WaterChart from './water.vue'
import AirChart from './air.vue'
import axios from 'axios';

const $route = useRoute();

const firstOptions = ref([]);
const secondOptions = ref([]);
const thirdOptions = ref([]);
const birds = ref([]);

const firstSelected = ref('');
const secondSelected = ref('');
const thirdSelected = ref('');
const discription = ref({})
const fetchFirstOptions = async () => {
  try {
    const response = await axios.get('/bird/dropDown/first-options');
    console.log('response', response);
    firstOptions.value = response.data.data;
    console.log('firstOptions.value', firstOptions.value);
    if (firstOptions.value.length > 0) {
      firstSelected.value = firstOptions.value[0].name;
      fetchSecondOptions(firstOptions.value[0].id);
    }
  } catch (error) {
    console.error('Error fetching first options:', error);
  }
};

const fetchSecondOptions = async (firstOptionId) => {
  try {
    const response = await axios.get('/bird/dropDown/second-options', {
      params: { id: firstOptionId } // 使用 `params` 属性传递查询参数
    });
    secondOptions.value = response.data.data;
    if (secondOptions.value.length > 0) {
      secondSelected.value = secondOptions.value[0].name;
      fetchThirdOptions(secondOptions.value[0].id);
    }
  } catch (error) {
    console.error('Error fetching second options:', error);
  }
};

const fetchThirdOptions = async (secondOptionId) => {
  try {
    const response = await axios.get('/bird/dropDown/third-options', {
      params: { id: secondOptionId } // 使用 `params` 属性传递查询参数
    });
    thirdOptions.value = response.data.data;
    if (thirdOptions.value.length > 0) {
      thirdSelected.value = thirdOptions.value[0].name;
      fetchBirds(thirdOptions.value[0].id);
    }
  } catch (error) {
    console.error('Error fetching third options:', error);
  }
};

const fetchBirds = async (thirdOptionId) => {
  try {
    const response = await axios.get('/bird/dropDown/getbirds', {
      params: { id: thirdOptionId } // 使用 `params` 属性传递查询参数
    });
    birds.value = response.data.data;
    discription.value = birds.value[0].discription
  } catch (error) {
    console.error('Error fetching birds:', error);
  }
};
const handleDesc = (id) => {
  console.log('birds', birds.value);
  const data = birds.value.find(item => {
    return item.id === id
  })
  discription.value = data.discription
}

const handleFirstDropdown = (command) => {
  const selectedOption = firstOptions.value.find((option) => option.id === command);
  firstSelected.value = selectedOption.name;
  fetchSecondOptions(command);
};

const handleSecondDropdown = (command) => {
  const selectedOption = secondOptions.value.find((option) => option.id === command);
  secondSelected.value = selectedOption.name;
  fetchThirdOptions(command);
};

const handleThirdDropdown = (command) => {
  const selectedOption = thirdOptions.value.find((option) => option.id === command);
  thirdSelected.value = selectedOption.name;
  fetchBirds(command);
};

onMounted(() => {
  fetchFirstOptions();
});

const places = ref([
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前监测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
])
const birdsList = ref([
  { name: '白鹭', src: './cut/bird/bailu.png' },
  { name: '斑嘴鸭', src: '/cut/bird/banzuiya.png' },
  { name: '骨顶鸡', src: '/cut/bird/gudingji.png' },
  { name: '鸟', src: '/cut/bird/niao.png' },
  { name: '鸟', src: '/cut/bird/niao.png' },
  { name: '鸟', src: '/cut/bird/niao.png' }
])
const birdDetails = ref([
  // {
  //   name: '斑嘴鸭',
  //   family: '雁形目>鸭科>鸭属',
  //   height: '58-63cm',
  //   Wingspan: '83-94cm',
  //   weight: '750-1000g',
  //   scientificName: 'Anaszonorhyncha',
  //   distributed: '欧亚，非洲，东洋界， 澳新界， 广泛分布',
  //   src: '/cut/bird/banzuiya.png'
  // },
  // {
  //   name: '白鹭',
  //   family: '鹈形目>鹭科>白鹭属',
  //   height: '55-65cm',
  //   Wingspan: '83-94cm',
  //   weight: '280-710g',
  //   scientificName: 'Egretta garzetta',
  //   distributed: '欧亚，非洲，东洋界， 澳新界， 广泛分布',
  //   src: '/cut/bird/bailu.png'
  // },
  {
    name: '骨顶鸡',
    family: '鹤形目>秧鸡科>骨顶属',
    height: '55-65cm',
    Wingspan: '86-104cm',
    weight: '280-710g',
    scientificName: 'Egretta garzetta',
    distributed: '欧亚，非洲，东洋界， 澳新界， 广泛分布',
    src: '/cut/bird/gudingji.png'
  },
])
const handleCommand = (command) => {
  ElMessage(`click on item ${command}`)
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: #030025;
  color: #FFFFFF;

  :deep(.el-dropdown-link) {
    width: 120px;
    line-height: 40px;
    margin-right: 10px;
    border: none;
    color: #FFFFFF;
    text-align: center;
    background-image: url('/cut/bird/bird1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  // :deep(.el-dropdown-menu) {
  //   background-color: #030025!important;
  // }

  :deep(.el-dropdown-item:hover) {
    background-color: #030845;
    color: red
  }

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

  .left {
    flex: 6.2;
    display: flex;
    flex-direction: column;

    span {
      margin: 0 5px;
      height: 40px;
      line-height: 40px;
    }


    .bird {
      // background-image: url('../../assets/images/cut/bird/bird2.png');
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      width: 520px;
      height: 300px;
      margin: 20px 0 0 20px;
      border: 1px solid #021757;
      background-color: #030636;

      ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 40px;

        li {
          background-image: url('/cut/bird/bird4.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 110px;
          height: 125px;
          margin: 10px;
          padding-bottom: 5px;
          /* 添加一些外边距，使元素分开显示 */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          /* 设置文字颜色为白色 */
          font-size: 14px;

        }
      }
    }

    .lbottom {
      ul {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        // width: 550px;

        li {
          background-color: #030836;
          margin: 22px 20px 0 20px;
          padding: 2px 20px;
          color: rgba(255, 255, 255, 0.87);
          height: 70px;
        }

        li:hover {
          background-color: #030845;
          border: 1px solid #0066FF;
        }
      }
    }


  }

  .middle {
    flex: 6.8;
    display: flex;
    flex-direction: column;
    // margin: 0 0px 0 10px;

    .mTop {
      flex: 5;

      .video-container {
        position: relative;
        // width: 100%;
        margin-left: 30px;
        width: 780px;
        // height: 400px;
        // padding-top: 10px;

        // border:1px dashed grey;
        .date-time {
          position: absolute;
          left: 40px;
          top: 37px;
          color: #fff;
          font-size: 25px;
        }
      }
    }

    .mBottom {
      flex: 3.8;
      padding: 0px 10px;

      .statisticBottom {
        flex: 1;
        display: flex;

        padding-top: 15px;
        // height: 200px;

        // margin-top: 0px;
        li {
          flex: 1;
          display: inline-block;

          .border {
            border: 1px solid #021f66;
            margin: 0 5px;
          }
        }
      }

      .birdShow {
        // background-image: url('../../assets/images/cut/bird/bird6.png');
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        width: 890px;
        height: 296px;
        border: 1px solid #021757;
        background-color: #030632;
        // padding: 35px -5px;
      }
    }
  }

  .right {
    flex: 5;
    height: 100%;
    font-family: MiSans;
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0px;
    margin: 0 10px 0 20px;

    span {
      margin: 0 5px;
      height: 40px;
      line-height: 40px;
    }


    .bird {
      // background-image: url('../../assets/images/cut/bird/bird2.png');
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      width: 530px;
      height: 300px;
      margin: 20px 0 0 10px;
      border: 1px solid #021757;
      background-color: #030636;

      ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 50px;
        // padding-top:30px;

        li {
          background-image: url('/cut/bird/bird4.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 110px;
          height: 125px;
          margin: 10px;
          padding-bottom: 5px;
          /* 添加一些外边距，使元素分开显示 */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          /* 设置文字颜色为白色 */
          font-size: 14px;

        }
      }
    }

    .animal {
      height: 100%;
      display: flex;
      flex-direction: column;
      font-size: 18px;

      .name {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        // margin-top: 20px;

        background-color: #030632;
        margin: 10px 0 25px 0;
      }

      ul {
        padding: 14px 10px;
        height: 382px;

        // padding-bottom: 20px;
        li {
          margin: 10px 0;
        }

        .family {
          color: #4DA6FF;
        }
      }
    }

  }
}
</style>
