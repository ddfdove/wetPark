<!-- src/components/Home.vue -->
<template>

  <div class="iframe-container">
    <!-- <div class="youjiantou1">
      <img src="/cut/youjiantou.png" @click="navigateToPark(1)" alt="">
    </div> -->
    <!-- <div class="youjiantou2">
      <img src="/cut/youjiantou.png" @click="navigateToPark(2)" alt="">
    </div> -->
    <!-- <div class="youjiantou3">
      <img src="/cut/youjiantou.png" @click="navigateToPark(3)" alt="">
    </div> -->
    <div class="navigation">
      <div class="item" @click="navigateToPark(1)">海湖湿地</div>
      <div class="item" @click="navigateToPark(3)">宁湖湿地</div>
      <!-- <div class="item" @click="navigateToPark(3)">宁湖湿地</div> -->
    </div>
    <iframe src="https://datav.aliyuncs.com/share/page/6326826bc1c0cd5a681206596d055e08" frameborder="0" allowfullscreen
      class="iframe"></iframe>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToPark = (id) => {
  router.push({ path: '/park', query: { id } });
};
</script>

<style scoped>
.youjiantou1 {
  position: fixed;
  top: 165px;
  right: 65px;

}

.navigation {
  position: fixed;
  top: 865px;
  right: 0px;
  display: flex;
  justify-content: space-evenly;
  width: 500px;

  .item {
    font-size: 20px;
    color: #fff;
    line-height: 2;
    letter-spacing: 2px;
    padding: 5px 10px;
    /* border: 1px solid red; */
    background: linear-gradient(45deg,#409EFF, #a0cfff 50%, #409EFF );
    border-radius: 10px;
    cursor:pointer;
  }
}

/* .youjiantou2 {
  position: fixed;
  top: 590px;
  right: 65px;

} */

.youjiantou3 {
  position: fixed;
  top: 590px;
  right: 65px;

}

.iframe-container {
  width: 100vw;
  height: 1080px;
  /* 使 iframe 占满整个视口高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.iframe {
  width: 100%;
  height: 100%;
  border: none;
  /* 去掉边框 */
}
</style>