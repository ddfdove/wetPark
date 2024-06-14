<template>
  <div class="bird-carousel">
    <swiper
      :modules="[Navigation, Pagination]"
      navigation
      :pagination="{ clickable: true }"
      :slides-per-view="3"
      :space-between="30"
      class="mySwiper"
    >
      <swiper-slide v-for="(bird, index) in props.birdsList" :key="index">
        <div class="bird">
          <div class="bird-img">
            <img :src="bird.src" >
          </div>
          <div class="bird-name">{{ bird.name }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

const props=defineProps({
  birdsList: {
    type: Array,
    default: () => []
  }
})


</script>

<style scoped lang="less">
.bird-carousel {
  width: 100%;
  height: 300px;
  padding: 10px;
  /* margin: auto;
  position: relative; */
}

.mySwiper {
   width: 880px; 
  height: 100%;
}

.swiper-slide {
  display: flex;
  // padding: 0 5px;
  //  align-items: center; 
  justify-content: center;
  
  
}

.bird {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.bird {
 
  img {
  width: 120px;
  height: 140px;
  // margin: 0 10px;
}

.bird-name {
  /* margin-top: 10px;
  font-size: 18px;
  border: 2px solid #fff;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.5); */
  width: 120px;
  height: 30px;
  line-height: 30px;
  // margin-top: 10px;
  background-image: url('../../assets/images/cut/bird/bird3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
}

</style>
