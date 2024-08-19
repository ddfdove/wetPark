<template>
  <div class="main" ref="playWndBox">
    <div
      id="playWnd"
      class="playWnd"
      :style="{
        height: playWndHeight + 'px',
        width: playWndWidth + 'px',
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, nextTick,watch } from 'vue'

// 接收外部传递的 cameraIndexCode
const props = defineProps({
  cameraIndexCode: {
    type: String,
    required: true
  }
})

const playWndBox = ref(null)
let playWndHeight = ref('')
let playWndWidth = ref('')
let pubKey = ref('')
let oWebControl = ref(null)

const objData = ref({
    appkey: '28730366',
    secret: 'HSZkCJpSJ7gSUYrO6wVi',
    ip: '10.19.132.75',
    playMode: 0, // 播放模式
    port: 443, // 端口号
    layout: '1x1' // 布局
})

onMounted(() => {
  const pageInstance = getCurrentInstance();
  const tagDomObj = pageInstance.refs.playWndBox;
  playWndHeight.value = tagDomObj.clientHeight;
  playWndWidth.value = tagDomObj.clientWidth;

  window.addEventListener("scroll", () => {
    if (oWebControl.value != null) {
      oWebControl.JS_Resize(
        tagDomObj.clientWidth,
        tagDomObj.clientHeight
      );
      this.setWndCover();
    }
  });

  window.addEventListener("resize", (e) => {
    if (oWebControl.value != null) {
      oWebControl.JS_Resize(
        tagDomObj.clientWidth,
        tagDomObj.clientHeight
      );
      this.setWndCover();
    }
  });

  nextTick(() => {
    initPlugin();
  })
  
})

onBeforeUnmount(() => {
  if (oWebControl.value != null) {
    oWebControl.JS_HideWnd();
    oWebControl.JS_RequestInterface({ funcName: "destroyWnd" });
    oWebControl.JS_Disconnect();
  }
})

const initPlugin = () => {
  oWebControl = new WebControl({
    szPluginContainer: "playWnd",
    iServicePortStart: 15900,
    iServicePortEnd: 15900,
    szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",
    cbConnectSuccess: () => {
      oWebControl.JS_StartService("window", {
        dllPath: "./VideoPluginConnect.dll",
      }).then(
        function () {
          oWebControl.JS_SetWindowControlCallback({});
          oWebControl.JS_CreateWnd("playWnd", 1152, 581, { bEmbed: true }).then(function () {
            init();
            previewVideo(props.cameraIndexCode); // 这里调用 previewVideo 函数
          });
        },
        function () {
          // 启动插件服务失败
        }
      );
    },
    cbConnectError: function () {
      oWebControl.value = null;
    },
    cbConnectClose: () => {
      oWebControl.value = null;
    },
  });
}

const init = (callback) => {
  getPubKey(() => {
    let appkey = objData.value.appkey;
    let secret = setEncrypt(objData.value.secret);
    let ip = objData.value.ip;
    let playMode = objData.value.playMode;
    let port = objData.value.port;
    let snapDir = "D:\\SnapDir";
    let videoDir = "D:\\VideoDir";
    let layout = objData.value.layout;
    let enableHTTPS = 1;
    let encryptedFields = "secret";
    let showToolbar = 1;
    let showSmart = 0;
    let buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";

    oWebControl.JS_RequestInterface({
      funcName: "init",
      argument: JSON.stringify({
        appkey: appkey,
        secret: secret,
        ip: ip,
        playMode: playMode,
        port: port,
        snapDir: snapDir,
        videoDir: videoDir,
        layout: layout,
        enableHTTPS: enableHTTPS,
        encryptedFields: encryptedFields,
        showToolbar: showToolbar,
        showSmart: showSmart,
        buttonIDs: buttonIDs,
      }),
    }).then(function (oData) {
      oWebControl.JS_Resize(playWndWidth.value, playWndHeight.value);
      if (callback) {
        callback();
      }
    });
  });
}

let setEncrypt = (value) => {
  let encrypt = new window.JSEncrypt();
  encrypt.setPublicKey(pubKey);
  return encrypt.encrypt(value);
}

const getPubKey = (callback) => {
  oWebControl.JS_RequestInterface({
    funcName: "getRSAPubKey",
    argument: JSON.stringify({
      keyLength: 1024,
    }),
  }).then(function (oData) {
    if (oData.responseMsg.data) {
      pubKey = oData.responseMsg.data;
      callback();
    }
  });
}

const previewVideo = (cameraIndexCode) => {
  let streamMode = 0;
  let transMode = 1;
  let gpuMode = 0;
  let wndId = -1;

  oWebControl.JS_RequestInterface({
    funcName: "startPreview",
    argument: JSON.stringify({
      cameraIndexCode: cameraIndexCode,
      streamMode: streamMode,
      transMode: transMode,
      gpuMode: gpuMode,
      wndId: wndId,
    }),
  }).then(function () {
    oWebControl.JS_SetWindowControlCallback({});
  });
}
// 监听 prop 的变化，如果 cameraIndexCode 改变了，重新调用 previewVideo
watch(() => props.cameraIndexCode, (newVal) => {
  if (newVal) {
    previewVideo(newVal);
  }
});
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
  width: 60vw;
  height: 60vh;
  margin: auto;
  background-color: #ccc;
}
</style>
