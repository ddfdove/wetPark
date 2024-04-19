<template>
  <div class="container">

    <ul class="left">
      <li>
        <img src="../../assets/pictures/didianjiance.png">
      </li>
      <li>
        <img src="../../assets/pictures/didianjiance.png">
      </li>
      <li>
        <img src="../../assets/pictures/didianjiance.png">
      </li>
    </ul>
    <!-- <ul class="middle">
      <li>
        <img src="../../assets/pictures/banzuiya2.png" >
      </li>
      <li>
        <img src="../../assets/pictures/bailu2.png">
      </li>
    </ul> -->
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

  .left {
    flex: 1.1;
    display: flex;
    flex-direction: column;
    background-color: rgb(11, 28, 46);
    padding: 40px 0px;
    margin-left: 5px;
    margin-top: 40px;
    border-radius: 5px;

    // justify-content: space-between;
    li {
      display: 1;
      padding: 0px 0 0 20px;

      img {
        width: 100%;
        height: 100%;
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
      img{
        width: 100%;
        height: 100%;
      }
    }

    .mBottom {
      flex: 2.5;
      padding: 40px 10px;
      img{
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
