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

const player = ref(null);



function init() {
    // 设置播放容器的宽高并监听窗口大小变化
    window.addEventListener('resize', () => {
        player.value.JS_Resize();
    });
}

function createPlayer(id, width, height, playUrl) {
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
           
           if(iErrorCode == "0x12f910012" || iErrorCode == "0x12f910011" || iErrorCode == "0x01b01307") {
               
                realplay(playUrl);  // 重新播放
              }
           if( iErrorCode == "0x01b01307") {
               
                realplay(playUrl);  // 重新播放
              }
           if( iErrorCode == "0x12f900009" || iErrorCode == "0x12f910016" ) {
               
                realplay(playUrl);  // 重新播放
              }
           
                
            
        
        },
      
        windowFullCcreenChange(bFull) {  //全屏切换回调
            console.log('fullScreen callback: ', bFull);
        },
       
    });
}


function realplay(playURL) {
    const mode = 1;  //解码方式：0普通模式 1高级模式
  //  const index = player.value.currentWindowIndex;
    const index = 0;

    
    
    player.value.JS_Play(playURL, { playURL, mode }, index).then(
        () => { console.log('realplay success'); },
        e => { console.error(e); }
    );
}


// 监听 playUrl 的变化并处理
watch(
  () => props.playUrl,
  (newPlayUrl) => {
      realplay(newPlayUrl);
  }
);
 
// 在组件挂载时初始化播放器
onMounted(() => {
 
    createPlayer(props.id, props.width, props.height, props.playUrl);
    init();
    realplay(props.playUrl)
});
// 在组件卸载时销毁播放器实例
onUnmounted(() => {
  if (player.value) {
    player.value.JS_Destroy(); // 假设 JSPlugin 提供了销毁实例的函数
    player.value = null;
  }
});
</script>
