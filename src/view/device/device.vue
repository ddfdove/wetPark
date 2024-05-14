<template>
  <div id="device">
    <div class="dTop">
      <!-- <i class="iconfont icon-yuanqufuwu" style="font-size: 36px; padding-left: 20px;color: white;font-weight: 600;"></i> -->
      <i class="iconfont icon-shouye_" style="
          font-size: 36px;
          padding-left: 20px;
          color: white;
          font-weight: 600;
        "></i>
      <!-- <i class="iconfont icon-shidigongyuan" style="font-size: 36px; padding-left: 20px;color: white;font-weight: 600;"></i> -->
      <span style="
          font-size: 30px;
          color: white;
          font-weight: 400;
          opacity: 0.8;
          padding-left: 20px;
        ">园区名</span>
    </div>
    <div class="dMiddle">
      <video-player :src="videoSrc" :options="playerOptions" :volume="0.6" />
    </div>
    <div class="dBottom">
      <h2 style="padding-left: 20px; color: white; font-weight: 600; opacity: 0.5">
        描述
      </h2>
      <p style="padding: 10px 50px; color: #ffffff; margin: 10px 0">
        海湖湿地公园位于西宁市海晏路绿地云香郡北侧,是一个集湿地保育、科普宣教、合理利用、管理服务等
        多功能于一体的湿地生态展示示范基地
      </p>
      <button style="height: 70px; width: 240px; margin-left: 60px; font-size: 18px">
        进入设备
      </button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  // 视频链接地址
const videoSrc = ref("http://vjs.zencdn.net/v/oceans.mp4");
// 视频播放器配置
let playerOptions = ref({
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
  right: 220px;
  width: 320px;
  height: 500px;
  background-color: rgb(43, 70, 87);
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