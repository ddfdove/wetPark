<template>
    <!-- <div>{{ props.playUrl }}</div> -->
    <!-- <p>{{ props.id }}</p> -->
    <div :id='props.id' ></div>

</template>

<script setup>
import { ref, onMounted,watch,onUnmounted,nextTick } from 'vue';
const props = defineProps({
    playUrl: {
        type: String,
        default: 'ws://135.131.1.10:559/openUrl/8IJrvzi'
    },
    id: {
        type: [Number, String],
        default: 'player'
    },
    width: {
        type: Number,
        default: 178
    },
    height: {
        type: Number,
        default: 103
    }
})
// const IS_MOVE_DEVICE = document.body.clientWidth < 992 // 是否移动设备
// const MSE_IS_SUPPORT = !!window.MediaSource // 是否支持mse
const player = ref(null);
const splitNum = ref(1);
// const mseSupport = ref(MSE_IS_SUPPORT);
// const tabActive = ref(MSE_IS_SUPPORT ? 'mse' : 'decoder');
// const playurl = ref('ws://135.131.1.10:559/openUrl/8IJrvzi');
//回放相关的时间信息和播放速率
// const playback = ref({
//   startTime: '2021-07-26T00:00:00',
//   endTime: '2021-07-26T23:59:59',
//   valueFormat: '',
//   seekStart: '2021-07-26T12:00:00',
//   rate: ''
// });
const muted = ref(true);
const volume = ref(50);
const volumeOnSvg = ref({
    template: '<svg t="1624453273744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1421" width="200" height="200"><path d="M597.994667 138.005333q130.005333 28.010667 213.994667 132.992t84.010667 241.002667-84.010667 241.002667-213.994667 132.992l0-88q93.994667-28.010667 153.002667-106.005333t59.008-180.010667-59.008-180.010667-153.002667-106.005333l0-88zM704 512q0 120-106.005333 172.010667l0-344q106.005333 52.010667 106.005333 172.010667zM128 384l170.005333 0 213.994667-213.994667 0 684.010667-213.994667-213.994667-170.005333 0 0-256z" p-id="1422"></path></svg>'
});
const volumeOffSvg = ref({
    template: '<svg t="1624453193279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9147" width="200" height="200"><path d="M512 170.005333l0 180.010667-90.005333-90.005333zM181.994667 128l714.005333 714.005333-53.994667 53.994667-88-88q-74.005333 58.005333-156.010667 77.994667l0-88q50.005333-13.994667 96-50.005333l-181.994667-181.994667 0 288-213.994667-213.994667-170.005333 0 0-256 202.005333 0-202.005333-202.005333zM810.005333 512q0-101.994667-59.008-180.010667t-153.002667-106.005333l0-88q130.005333 28.010667 213.994667 132.992t84.010667 241.002667q0 96-44.010667 178.005333l-64-66.005333q21.994667-53.994667 21.994667-112zM704 512q0 18.005333-2.005333 26.005333l-104-104 0-93.994667q106.005333 52.010667 106.005333 172.010667z" p-id="9148"></path></svg>'
});
// const recordStartState = ref(0);
// const recordStartText = ref('录像');
function init() {
    // 设置播放容器的宽高并监听窗口大小变化
    window.addEventListener('resize', () => {
        player.value.JS_Resize();
    });
}

function createPlayer(id, width, height, playUrl) {
    if (!id) {
        console.error('Player ID is null or undefined');
        return;
    }
    player.value = new window.JSPlugin({
        szId:id ,
        szBasePath: "/demo/",  //引入静态资源地址，我这里静态资源在public/js文件存放，所以设置为js
        iMaxSplit: 1,
        iCurrentSplit: 1,
        openDebug: true,
        iWidth: width,
        iHeight: height,
        oStyle: {
             borderSelect: 'transparent',
           // borderSelect: '#FFCC00',
        }
    });

    // 事件回调绑定
    player.value.JS_SetWindowControlCallback({
        windowEventSelect(iWndIndex) {  //插件选中窗口回调
            console.log('windowSelect callback: ', iWndIndex);
        },
        pluginErrorHandler(iWndIndex, iErrorCode, oError) {  //插件错误回调
            console.log('pluginError callback: ', iWndIndex, iErrorCode, oError);
           
            //if (iErrorCode == 0x12f910011) {  // 替换为实际的错误代码
               // console.log('Stream interrupted, retrying...');
                realplay(playUrl);  // 重新播放
          //  }
        
        },
      
        windowFullCcreenChange(bFull) {  //全屏切换回调
            console.log('fullScreen callback: ', bFull);
        },
       
    });
}

function arrangeWindow() {
    player.value.JS_ArrangeWindow(splitNum.value).then(
        () => { console.log(`arrangeWindow to ${splitNum.value}x${splitNum.value} success`); },
        e => { console.error(e); }
    );
}
function wholeFullScreen() {
    player.value.JS_FullScreenDisplay(true).then(
        () => { console.log(`wholeFullScreen success`) },
        e => { console.error(e) }
    )
}
function realplay(playURL) {
    const mode = 0;  //解码方式：0普通模式 1高级模式
    const index = player.value.currentWindowIndex;
    
    
    player.value.JS_Play(playURL, { playURL, mode }, index).then(
        () => { console.log('realplay success'); },
        e => { console.error(e); }
    );
}

// function stopAllPlay() {
//   player.value.JS_StopRealPlayAll().then(
//     () => {
//       playback.value.rate = 0;
//       console.log('stopAllPlay success');
//       closeVideoTree();
//     },
//     e => { console.error(e); }
//   );
// }

// function stopPlay() {
//   player.value.JS_Stop().then(
//     () => {
//       playback.value.rate = 0;
//       console.log('stop realplay success');
//       const index = player.value.currentWindowIndex;
//       selectAisle(videoList[index], index);
//     },
//     e => { console.error(e); }
//   );
// }

// 监听 id 和 playUrl 的变化并处理
watch(
  () => [props.id, props.playUrl], // 监听 id 和 playUrl
  ([newId, newPlayUrl], [oldId, oldPlayUrl]) => {
    console.log('id 和 playUrl 发生变化:', newId, newPlayUrl);

    // 先销毁旧的播放器实例（如果存在）
    if (player.value) {
      player.value.JS_Destroy(); // 假设 JSPlugin 提供了销毁实例的函数
      player.value = null;
    }
    nextTick(()=>{
      // 重新创建播放器实例
    createPlayer(newId);
     init();
    // 播放新的视频流
    realplay(newPlayUrl);
    })
    
  }
);
// 在组件挂载时初始化播放器
onMounted(() => {
    console.log('id是字符串还是数字',typeof props.id);
    console.log('height是字符串还是数字',typeof props.height);
    console.log('props.id', props.id);
    console.log('playUrl',props.playUrl);

   

    createPlayer(props.id, props.width, props.height, props.playUrl);
    init();
  //  arrangeWindow()
    realplay(props.playUrl)
});
// 在组件卸载时销毁播放器实例
onUnmounted(() => {
  console.log('组件卸载，销毁播放器实例');
  if (player.value) {
    player.value.JS_Destroy(); // 假设 JSPlugin 提供了销毁实例的函数
    player.value = null;
  }
});
</script>
