<!-- src/components/Home.vue -->
<template>

  <div class="iframe-container">
    <div class="youjiantou1">
      <img src="/cut/youjiantou.png" @click="navigateToPark(1)" alt="">
    </div>
    <!-- <div class="youjiantou2">
      <img src="/cut/youjiantou.png" @click="navigateToPark(2)" alt="">
    </div> -->
    <div class="youjiantou3">
      <img src="/cut/youjiantou.png" @click="navigateToPark(3)" alt="">
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