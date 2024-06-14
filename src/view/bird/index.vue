<template>
  <div class="container flex">

    <div class="left">
      <div class="flex-2 ltop">
        <div id="title">
          <span>地点检测</span>
        </div>
        <div class="flex area">
          <div style="margin: 0 30px 0 10px;">
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
        <div id="title">
          <span>地点检测</span>
        </div>
        <ul>
          <li v-for="(item, index) in places.slice(0, 5)" :key="index">
            <div>
              <span style="color: #4DA6FF;">{{ item.area }}</span>
              <span style="margin-left: 300px;">{{ item.time }}</span>
            </div>
            <div>{{ item.describe }}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="middle">

      <div class="mTop">
        <div id="title">
          <span>视频监控</span>
        </div>
        <div style="margin-top: 10px;">
          <img src="../../assets/images/cut/bird/bird5.png" alt="">
        </div>
      </div>
      <div class="mBottom">
        <div id="title">
          <span>鸟类展示</span>
        </div>
        <div class="birdShow">
          <Carousel :birdsList="birdsList"></Carousel>
        </div>
       
      </div>
    </div>
    <ul class="right">
      <li>
        <img src="../../assets/pictures/banzuiya2.png">
      </li>
      <li>
        <img src="../../assets/pictures/bailu2.png">
      </li>
    </ul>
    <!-- <div class="right">
     <div class="rTop">拌嘴呀</div>
     <div class="rBottom">白鹿</div>
    </div> -->
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
const birdsList = [
  { name: '白鹭', src: '.@/assets/images/cut/bird/bailu.png' },
  { name: '斑嘴鸭', src: '@/assets/images/cut/bird/banzuiya.png' },
  { name: '骨顶鸡', src: '@/assets/images/cut/bird/gudingji.png' },
  { name: '鸟', src: '@/assets/images/cut/bird/niao.png' },
  { name: '鸟', src: '@/assets/images/cut/bird/niao.png' },
  { name: '鸟', src: '@/assets/images/cut/bird/niao.png' }
];
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

  #title {
    background-image: url("../../assets/images/cut/标题.png");
    background-size: cover;
    height: 36px;
    padding-left: 40px;
    margin: 16px 0;

    span {
      font-family: YouSheBiaoTiHei;
      font-size: 25px;
      font-weight: 600;
      line-height: 33px;
      letter-spacing: 2px;
      color: #FFFFFF;
    }
  }

  :deep(.el-dropdown-link) {
    width: 120px;
    line-height: 40px;
    margin-right: 10px;
    color: #FFFFFF;
    text-align: center;
    background-image: url('@/assets/images/cut/bird/bird1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .left {
    flex: 6;
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
      margin: 20px 0 0 30px;
      border: 1px solid #021757;
      background-color: #030636;

      ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 40px;

        li {
          background-image: url('../../assets/images/cut/bird/bird4.png');
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
    flex: 8;
    display: flex;
    flex-direction: column;

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
    display: flex;
    flex-direction: column;
    // background-color: rgb(11, 28, 46);
    // padding: 30px 0px;
    // margin-right: 10px;
    // margin-top: 40px;
    // // margin-left: 40px;
    // border-radius: 5px;

    // justify-content: space-between;
    li {
      display: 1;
      padding: 40px 0px;

      img {
        width: 100%;
        height: 100%;
      }
    }

  }
}
</style>
