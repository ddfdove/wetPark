<template>

  <div :id='props.id' ></div>

</template>

<script setup>
import { ref, onMounted ,watch,onUnmounted} from 'vue';
const props = defineProps({
  playUrl: {
    type: String,
    default: ''
  },
  id: {
    type: [Number, String],
    default: 'player'
  },
   width: {
        type: Number,
        default: 176
    },
    height: {
        type: Number,
        default: 93
    }
})

const player = ref(null)

const init = () => {
  // 设置播放容器的宽高并监听窗口大小变化
  window.addEventListener('resize', () => {
    if (player.value) {
      player.value.JS_Resize();
    }
  });
}


const createPlayer = () => {
  player.value = new JSPlugin({
    szId: props.id,
    szBasePath: '/demo/',
    iMaxSplit: 1,
    iWidth: props.width,
    iHeight: props.height,
    openDebug: true,
    oStyle: {
      borderSelect: 'transparent',
    }
  });
  // 事件回调绑定
  player.value.JS_SetWindowControlCallback({
    windowEventSelect: (iWndIndex) => {
      console.log('windowSelect callback: ', iWndIndex);
    },
    pluginErrorHandler: (iWndIndex, iErrorCode, oError) => {
      realplay()
    },
    windowEventOver: (iWndIndex) => {
      //console.log(iWndIndex);
    },
    windowEventOut: (iWndIndex) => {
      //console.log(iWndIndex);
    },
    windowEventUp: (iWndIndex) => {
      //console.log(iWndIndex);
    },
    windowFullCcreenChange: (bFull) => {
      console.log('fullScreen callback: ', bFull);
    },
    firstFrameDisplay: (iWndIndex, iWidth, iHeight) => {
      console.log('firstFrame loaded callback: ', iWndIndex, iWidth, iHeight);
    },
    performanceLack: () => {
      console.log('performanceLack callback: ');
    }
  });
}
function realplay() {
  const mode = 1;  //解码方式：0普通模式 1高级模式
  const index = 0;
  const playURL = props.playUrl
  if (player.value) {
    player.value.JS_Play(playURL, { playURL, mode }, index).then(
      () => { console.log('realplay success'); },
      e => { console.error(e); }
    );
  }
}
// 监听 playUrl 和 id 的变化，确保它们有值后再初始化播放器
watch(
  () => [props.playUrl, props.id],
  ([newPlayUrl, newId]) => {
    if (newPlayUrl && newId) {
      createPlayer();
      init();
      realplay();
    }
  }
);
// 在组件挂载时初始化播放器
onMounted(() => {
  createPlayer();
  init();
  realplay()
});
// 销毁播放器实例
const destroyPlayer = () => {
  if (player.value) {
    player.value.JS_Destroy(); // 假设 JSPlugin 有 JS_Destroy 方法用于销毁实例
    player.value = null;
  }
};
// 在组件卸载时销毁播放器
onUnmounted(() => {
  destroyPlayer();
});
</script>
