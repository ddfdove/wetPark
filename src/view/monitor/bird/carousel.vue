<template>
  <div class="bird-carousel">
    <swiper :modules="[Navigation, Pagination]" navigation :slides-per-view="3" :space-between="30" class="mySwiper">
      <swiper-slide v-for="(bird, index) in birdsList" :key="index">
        <div class="bird">
          <div class="bird-img">
            <img :src="bird.src">
          </div>
          <div class="bird-name">{{ bird.name }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

const props = defineProps({
  birdsList: {
    type: Array,
    default: () => []
  }
});

</script>

<style scoped lang="less">
.bird-carousel {
  width: 100%;
  height: 300px;
  padding: 10px;
}

.mySwiper {
  width: 880px;
  height: 100%;
  padding: 0 40px;
}

.swiper-slide {
  display: flex;
  // justify-content: center;
}

.bird {
  flex: 1;
  //  width: 100px;
  // height: 140px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  // padding-right: 30px;

}

.bird img {
  // width: 160px;
  // // height: 140px;
  // width: 100%;
  // height: 100%;
  // height: ;
  padding-right: 30px;
  border-right: 1px solid #02195b;
}

.bird-name {
  width: 120px;
  height: 30px;
  line-height: 30px;
  background-image: url('@/assets/images/cut/bird/bird3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
