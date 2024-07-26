<template>
  <div class="right">

    <div class="container flex">
      <panelboard :chTitle="'地点监测'" :enTitle="'Location Detection'">
        <div class="flex-2 ltop">
          <div class="flex area">
            <div style="margin: 0 10px 0 10px;">
              <span>区域:</span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <span style="margin-right: 10px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu style="background-color:#030636;color:#000000">
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
              <li v-for="(item, index) in birds.slice(0, 7)" :key="index">
                <div>
                  <span class="font-25">{{ item.quantity }}</span>
                  <span class="font-18">只</span>
                </div>
                <h5 class="font-18">{{ item.name }}</h5>
              </li>

            </ul>
          </div>
        </div>
      </panelboard>
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
// import Carousel from '../bird/carousel.vue';
import panelboard from "../../components/panelboard/index.vue";

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
  {
    name: '鸟',
    quantity: '9'
  },
  {
    name: '鸟',
    quantity: '9'
  },

]);
const handleCommand = (command) => {
  ElMessage(`click on item ${command}`)
}
</script>

<style scoped lang="less">
//table下面有根白线，去掉
:deep(.el-table__inner-wrapper::before) {
  height: 0px;
}


.el-table,
.el-table__expanded-cell {
  margin-left: 10px;
  // height: 400px;
  // background-color: rgb(10, 210, 236);
  background-color: transparent; //这是设置透明背景色
}

//   .el-dropdown-link {
//     width: 160px;
//     height: 30px;
//     line-height: 30px;
//     padding-left: 20px;
//     // text-align: center;
//     color: #ffffff;
//     font-size: 16px;
//     border: 1px solid;
//     border-radius: 2px;
//   }

.right {
  width: 575px;
  height: 600px;
  padding: 20px 10px;
  // margin:0 0 20px 5px;
  position: fixed;
  top: 180px;
  right: 10px;

  background: rgba(0, 102, 255, 0.3);

  // background-color: rgba(0, 163, 255, 0.05);
  // border-image: linear-gradient(90deg, rgba(0, 163, 255, 0.04) 0%, rgba(0, 163, 255, 0) 100%) 1;
  opacity: 0.8;


  .container {
    height: 100%;
    width: 100%;
    // background-color:rgba(0, 102, 255, 0.3);
    color: #FFFFFF;

    flex: 6;
    display: flex;
    flex-direction: column;

    :deep(.el-popover.popperClass) {
      background-color: red;
      // position: fixed;
      margin-top: 200px;
      top: 200px;
      left: 400px;
    }

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

    :deep(.el-dropdown-item:hover) {
      background-color: #030845;
      color: red
    }

    span {
      margin: 0 5px;
      height: 40px;
      line-height: 40px;
    }


    .bird {
      // background-image: url('../../assets/images/cut/bird/bird2.png');
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      width: 100%;
      height: 465px;
      margin: 20px 10px 0 0;
      // padding: 20px 10px 0 10px;
      background: rgba(0, 102, 255, 0.2);

      border: 1px solid #0066FF;

      // background-color:rgba(0, 102, 255, 0.3);
      // border: 1px solid #021757;
      // background-color: #030636;

      ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 10px;

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

}
</style>