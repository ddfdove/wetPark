<template>
  <div id="device">
    
    <div class="dMiddle" >
      <div style="width:400px;height:300px" ref="videoContainer">
      <!-- <Video :id="id"  :cameraIndexCode="props.id" :width="videoWidth" :height="videoHeight"></Video> -->
      <H5Video :playUrl="playUrl" :id="video" :width="videoWidth" :height="videoHeight"></H5Video>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { onMounted, ref ,watch} from "vue";
import Video from './video1.vue'
import H5Video from '@/components/h5video.vue'
import {getCameraEquipment} from '@/api/index.js'
const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
})
const videoWidth = ref(250)
const videoHeight = ref(190)
const videoContainer = ref(null)
const updateVideoDimensions = () => {
  if (videoContainer.value) {
    const rect = videoContainer.value.getBoundingClientRect()
    videoWidth.value = Math.max(Math.floor(rect.width)) // 保证最小宽度为 100
    videoHeight.value = Math.max(Math.floor(rect.height)) // 保证最小高度为 100
  }
}
const playUrl=ref('')
const getCamera = async (params) => {
  const res = await getCameraEquipment(params)
  if(res.code==0){
    playUrl.value=res.data.url 
  }
}
// 监听 props.id 的变化，并在变化时发送请求
watch(() => props.id, (newId) => {
  if (newId) {
    const cameraParams = {
      cameraIndexCode: newId,
      protocol: 'ws'
    };
    getCamera(cameraParams);
  }
}, { immediate: true });

onMounted(()=>{
  updateVideoDimensions()
  window.addEventListener('resize', updateVideoDimensions)
})
// 视频链接地址
const videoSrc = ref("http://vjs.zencdn.net/v/oceans.mp4");
// 视频播放器配置
const playerOptions = ref({
  // height: 200,
  // width: document.documentElement.clientWidth, //播放器宽度
  playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
  // autoplay: 'any', // 如果true,浏览器准备好时开始回放。
  autoplay: "false", // 如果true,浏览器准备好时开始回放。
  muted: true, // 默认情况下将会消除任何音频。
  loop: true, // 导致视频一结束就重新开始。
  preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: "zh-CN",
  // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controls: true,
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true, // 全屏按钮
  },
});
</script>

<style scoped lang="less">
#device {
  position: fixed;
  bottom: 110px;
  right: 620px;
  width: 320px;
  height: 500px;
  
  opacity: 0.7;
  display: flex;
  flex-direction: column;

  .dTop {
    flex: 1;
    padding-top: 10px;
  }

  .dMiddle {
    flex: 3;
    // padding-top: 20px;
    padding: 5px 5px 15px 5px;
  }

  .dBottom {
    flex: 5;
    display: flex;
    flex-direction: column;
    // padding-top: 30px;
  }
}
</style>