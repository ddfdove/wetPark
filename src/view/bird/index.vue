<template>
  <div class="container">

    <ul class="left">
      <li style="background-color: rgb(18,39,57); opacity: 1;">
        <p style="font-size: 22px; font-weight: 500; color: rgb(60,191,223);margin:0 0 10px 30px;">地点检测</p>
        <div class="top" style="display: flex;margin-bottom: 30px; ">
          <div class="tLeft" style="flex:1 ">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <span style="margin-right: 50px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">Action 1</el-dropdown-item>
                  <el-dropdown-item command="b">Action 2</el-dropdown-item>
                  <el-dropdown-item command="c">Action 3</el-dropdown-item>
                  <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                  <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="tRight" style="flex:1;  border: 1px solid;;border-radius: 2px; ">
            <span style="margin-left: 40px;line-height: 30px; ">4/30</span>
            <span style="margin-left: 40px; line-height: 30px;">.</span>
            <span style="margin-left: 40px; line-height: 30px;">5/30</span>
          </div>
        </div>
        <div id="animal">
          <ul style="display: flex;">
            <li>
              <h3 style="margin-bottom: 10px;">斑嘴鸭</h3>
              <span style="margin-left: 20px;">2只</span>
            </li>
            <li>
              <h3 style="margin-bottom: 10px;">白鹭</h3>
              <span style="margin-left: 20px;">6只</span>
            </li>
            <li>
              <h3 style="margin-bottom: 10px;">骨顶鸡</h3>
              <span style="margin-left: 20px;">4只</span>
            </li>
          </ul>
          <div style="padding: 0 10px 0 20px; ">
            <span>
              <h3 style="margin-bottom: 10px;">动物</h3>
              <span style="margin-left: 20px;">1只</span>
            </span>
            <span>
              <h3 style="margin-bottom: 10px;">鸟</h3>
              <span style="margin-left: 20px;">9只</span>
            </span>
          </div>
        </div>
      </li>
      <li style="background-color: rgb(18,39,57); opacity: 1;">
        <p style="font-size: 22px; font-weight: 500; color: rgb(60,191,223);margin:0 0 10px 30px;">地点检测</p>
        <div class="top" style="display: flex;margin-bottom: 30px; ">
          <div class="tLeft" style="flex:1 ">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <span style="margin-right: 50px;">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">Action 1</el-dropdown-item>
                  <el-dropdown-item command="b">Action 2</el-dropdown-item>
                  <el-dropdown-item command="c">Action 3</el-dropdown-item>
                  <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                  <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="tRight" style="flex:1;  border: 1px solid;;border-radius: 2px; ">
            <span style="margin-left: 40px;line-height: 30px; ">4/30</span>
            <span style="margin-left: 40px; line-height: 30px;">.</span>
            <span style="margin-left: 40px; line-height: 30px;">5/30</span>
          </div>
        </div>
        <div id="animal">
          <ul style="display: flex;">
            <li>
              <h3 style="margin-bottom: 10px;">斑嘴鸭</h3>
              <span style="margin-left: 20px;">2只</span>
            </li>
            <li>
              <h3 style="margin-bottom: 10px;">白鹭</h3>
              <span style="margin-left: 20px;">6只</span>
            </li>
            <li>
              <h3 style="margin-bottom: 10px;">骨顶鸡</h3>
              <span style="margin-left: 20px;">4只</span>
            </li>
          </ul>
          <div style="padding: 0 10px 0 20px; ">
            <span>
              <h3 style="margin-bottom: 10px;">动物</h3>
              <span style="margin-left: 20px;">1只</span>
            </span>
            <span>
              <h3 style="margin-bottom: 10px;">鸟</h3>
              <span style="margin-left: 20px;">9只</span>
            </span>
          </div>
        </div>
      </li>
      <li style="background-color: rgb(18,39,57); opacity: 1;" >
        <p style="font-size: 22px; font-weight: 500; color: rgb(60,191,223);margin:0 0 10px 30px;">地点检测</p>
        <ul  id="area">
          <li >
            <p>
              <span style="color: rgb(48,92,65);">无人区7号</span>
            <span style="margin-left: 380px;color: rgb(48,92,65);">14:09</span>
            </p>
            <p style="color: rgb(94,124,120);">当前检测发现鸟类共1种,鸟一只</p>
          </li>
          <li >
            <p>
              <span style="color: rgb(48,92,65); padding-top: 5px;">西岸半岛6号</span>
            <span style="margin-left: 380px;color: rgb(48,92,65);">14:09</span>
            </p>
            <p style="color: rgb(94,124,120);">当前检测发现鸟类共1种,鸟一只</p>
          </li>
          <li >
            <p>
              <span style="color: rgb(48,92,65); padding-top: 5px;">无人区7号</span>
            <span style="margin-left: 380px;color: rgb(48,92,65);">14:09</span>
            </p>
            <p style="color: rgb(94,124,120);">当前检测发现鸟类共1种,鸟一只</p>
          </li>
        
         
         
        
        </ul>
      </li>
    </ul>

    <div class="middle">
      <div class="mTop">
        <img src="../../assets/pictures/niaolei.png" alt="">
      </div>
      <div class="mBottom">
        <img src="../../assets/pictures/jiankong.png" alt="">
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
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
const handleCommand = (command) => {
  ElMessage(`click on item ${command}`)
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}

.container {
  display: flex;
  height: 1000px;

  /deep/.el-dropdown-link {
    width: 160px;
    height: 30px;
    line-height: 30px;
    // padding-left: 20px;
    padding-left: 20px;
    // text-align: center;
    // color: #FFFFFF;
    font-size: 16px;
    border: 1px solid;
    border-radius: 2px;
  }

  .left {
    flex: 1.1;
    display: flex;
    flex-direction: column;
    background-color: rgb(11, 28, 46);
    // padding: 40px 0px;
    margin-left: 5px;
    margin-top: 40px;
    border-radius: 5px;

    // justify-content: space-between;
    li {
      flex: 1;
      // margin-bottom: 20px;
      // color: #FFFFFF;
      margin: 0 5px 10px 10px;
      padding-left: 15px;

      // padding: 0 0 0 20px;
      #animal {
        background-color: rgb(18, 39, 57);

        // color: rgb(44,95,102);
        ul {
          display: flex;
          padding: 0 10px 0 10px;
          margin-bottom: 10px;

          // flex-wrap: wrap;
          li {
            width: 130px;
            height: 80px;
            margin-right: 10px;
            padding: 10px 0px 0 30px;
            // border: 2px solid #13ecf3;
            border: 2px solid rgb(44, 95, 102);
            background-color: rgb(17, 39, 57);
            border-radius: 5px;
          }
        }

        div>span {
          display: inline-block;
          width: 130px;
          height: 80px;
          margin-right: 20px;
          padding: 10px 0px 0 30px;
          border: 2px solid rgb(44, 95, 102);
          border-radius: 5px;
        }
      }
     #area{
      display: flex;
      flex-direction: column;
      height: 260px;
      // justify-content: space-between;
      li{
        flex:1;
        margin: 5px 0;
        background-color: rgb(7,18,27);
        // p{
        //   margin: 10px 0;
        // }
      }
     }
    }
  }

  .middle {
    flex: 3;
    display: flex;
    flex-direction: column;
    padding: 0 60px;
    margin-top: 60px;

    .mTop {
      flex: 1;
      padding: 50px 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .mBottom {
      flex: 2.5;
      padding: 40px 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    background-color: rgb(11, 28, 46);
    padding: 30px 0px;
    margin-right: 10px;
    margin-top: 40px;
    // margin-left: 40px;
    border-radius: 5px;

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
