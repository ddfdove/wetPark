<template>
  <div class="container flex">

    <div class="left">
      <div class="flex-2 ltop">
        <div class="title">
          <span>地点检测</span>
        </div>
        <div class="flex area">
          <div style="margin: 0 10px 0 10px;">
            <span>区域:</span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <span style="margin-right: 10px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">Action 1</el-dropdown-item>
                  <el-dropdown-item command="b">Action 2</el-dropdown-item>
                  <el-dropdown-item command="c">Action 3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div>
            <span class="text-sm" style="margin-right: 10px;">时间:</span>
            <el-dropdown @command="handleCommand" class="leading-10 h-10">
              <span class="el-dropdown-link">
                <span style="margin-right: 10px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">Action 1</el-dropdown-item>
                  <el-dropdown-item command="b">Action 2</el-dropdown-item>
                  <el-dropdown-item command="c">Action 3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>—</span>
            <el-dropdown @command="handleCommand" class="leading-10 h-10">
              <span class="el-dropdown-link" style="margin-left: 10px;">
                <span style="margin-right: 10px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">Action 1</el-dropdown-item>
                  <el-dropdown-item command="b">Action 2</el-dropdown-item>
                  <el-dropdown-item command="c">Action 3</el-dropdown-item>
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
      </div>
      <div class="flex-3 lbottom">
        <div class="title">
          <span>地点检测</span>
        </div>
        <ul>
          <li v-for="(item, index) in places.slice(0, 5)" :key="index">
            <div>
              <span style="color: #4DA6FF;">{{ item.area }}</span>
              <span style="margin-left: 280px;">{{ item.time }}</span>
            </div>
            <div>{{ item.describe }}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="middle">
      <div class="mTop">
        <div class="title">
          <span style="margin-left: 40px;">视频监控</span>
        </div>
        <div style="margin-top: 10px;">
          <img src="/cut/bird/bird5.png" alt="">
        </div>
      </div>
      <div class="mBottom">
        <div class="title">
          <span style="margin-left: 40px;">鸟类展示</span>
        </div>
        <div class="birdShow">
          <Carousel :birdsList="birdsList"></Carousel>
        </div>

      </div>
    </div>
    <div class="right">
      <div class="title">
        <span style="margin-left: 0px;">鸟类详情</span>
      </div>
      <ul class=" animal">
        <li class="flex-1" v-for="(item, index) in birdDetails" :key="index">
          <div class="name">{{ item.name }}</div>
          <div class="flex" style="background-color: #030632;">
            <div class="animal flex-1">
              <ul class="flex flex-col">
                <li class="flex-1 family">{{ item.family }}</li>
                <li class="flex-1">身高：{{ item.height }}</li>
                <li class="flex-1">翼展：{{ item.Wingspan }}</li>
                <li class="flex-1">体重：{{ item.weight }}</li>
                <li class="flex-1">拉丁学名：{{ item.scientificName }}</li>
                <li class="flex-1">地理分布：{{ item.distributed }}</li>
              </ul>
            </div>
            <div class="flex-1" style="margin:auto;"> <img :src="item.src">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import Carousel from './carousel.vue'


const birds = ref([
  {
    name: '斑嘴鸭',
    quantity: '5'
  },
  {
    name: '白鹭',
    quantity: '1'
  },
  {
    name: '骨顶鸡',
    quantity: '3'
  },
  {
    name: '动物',
    quantity: '5'
  },
  {
    name: '鸟',
    quantity: '9'
  },

])
const places = ref([
  {
    area: '无人区7号',
    describe: '当前检测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前检测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前检测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前检测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前检测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前检测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前检测发现鸟类共一种，鸟一只',
    time: '2024-06-12'
  },
  {
    area: '无人区7号',
    describe: '当前检测发现鸟类共一种，鸟一只',
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
  {
    name: '斑嘴鸭',
    family: '雁形目>鸭科>鸭属',
    height: '58-63cm',
    Wingspan: '83-94cm',
    weight: '750-1000g',
    scientificName: 'Anaszonorhyncha',
    distributed: '欧亚，非洲，东洋界， 澳新界， 广泛分布',
    src: '/cut/bird/banzuiya.png'
  },
  {
    name: '白鹭',
    family: '鹈形目>鹭科>白鹭属',
    height: '55-65cm',
    Wingspan: '83-94cm',
    weight: '280-710g',
    scientificName: 'Egretta garzetta',
    distributed: '欧亚，非洲，东洋界， 澳新界， 广泛分布',
    src: '/cut/bird/bailu.png'
  },
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
    color: #FFFFFF;
    text-align: center;
    background-image: url('/cut/bird/bird1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
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

      img {
        margin-top: 10px;
        width: 100%;
        height: 100%;
      }
    }

    .mBottom {
      flex: 3.8;

      // padding: 40px 10px;
      img {
        width: 100%;
        height: 100%;
      }

      .birdShow {
        // background-image: url('../../assets/images/cut/bird/bird6.png');
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        width: 890px;
        height: 300px;
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

    .animal {
      height: 93.5%;
      display: flex;
      flex-direction: column;

      .name {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        background-color: #030632;
        margin: 10px 0 20px 0;
      }

      ul {
        padding: 10px;
        // padding-bottom: 20px;

        li {
          margin: 5px 0;

        }

        .family {
          color: #4DA6FF;
        }
      }
    }

  }
}
</style>
