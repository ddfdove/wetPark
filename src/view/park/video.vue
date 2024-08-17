<template>
    <div class="main" ref="playWndBox">
      <div
        id="playWnd"
        class="playWnd"
        :style="{ width: `${props.width}px`, height: `${props.height}px` }"
      >
        <!-- 播放器窗口 -->
        468465
        adsg
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
  
  const props = defineProps({
    cameraIndexCode: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: ''
    },
    height: {
      type: Number,
      default: ''
    }
  })
  
  const playWndBox = ref(null)
  let oWebControl = ref(null)
  const pubKey = ref('')
  
  const initPlugin = () => {
    oWebControl.value = new WebControl({
      szPluginContainer: "playWnd",
      iServicePortStart: 15900,
      iServicePortEnd: 15900,
      szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",
      cbConnectSuccess: () => {
        oWebControl.value.JS_StartService("window", { dllPath: "./VideoPluginConnect.dll" })
          .then(() => {
            oWebControl.value.JS_SetWindowControlCallback({})
            oWebControl.value.JS_CreateWnd("playWnd", props.width, props.height, { bEmbed: true })
              .then(() => init())
          })
      },
      cbConnectError: () => {
        console.error("WebControl connection failed")
      },
      cbConnectClose: () => {
        oWebControl.value = null
      }
    })
  }
  
  const init = () => {
    getPubKey(() => {
      const params = {
        appkey: objData.value.appkey,
        secret: setEncrypt(objData.value.secret),
        ip: objData.value.ip,
        playMode: objData.value.playMode,
        port: objData.value.port,
        snapDir: "D:\\SnapDir",
        videoDir: "D:\\VideoDir",
        layout: objData.value.layout,
        enableHTTPS: 1,
        encryptedFields: "secret",
        showToolbar: 1,
        showSmart: 0,
        buttonIDs: "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769"
      }
  
      oWebControl.value.JS_RequestInterface({
        funcName: "init",
        argument: JSON.stringify(params)
      }).then(() => {
        oWebControl.value.JS_Resize(props.width, props.height)
        if (props.cameraIndexCode) {
          previewVideo(props.cameraIndexCode)  // 页面加载时调用预览
        }
      })
    })
  }
  
  const setEncrypt = value => {
    const encrypt = new window.JSEncrypt()
    encrypt.setPublicKey(pubKey.value)
    return encrypt.encrypt(value)
  }
  
  const getPubKey = callback => {
    oWebControl.value.JS_RequestInterface({
      funcName: "getRSAPubKey",
      argument: JSON.stringify({ keyLength: 1024 })
    }).then(oData => {
      if (oData.responseMsg.data) {
        pubKey.value = oData.responseMsg.data
        callback()
      }
    })
  }
  
  const previewVideo = cameraIndexCode => {
    const params = {
      cameraIndexCode,
      streamMode: 0,
      transMode: 1,
      gpuMode: 0,
      wndId: -1
    }
  
    oWebControl.value.JS_RequestInterface({
      funcName: "startPreview",
      argument: JSON.stringify(params)
    })
  }
  
  // 监听 cameraIndexCode 变化，重新触发预览功能
  watch(() => props.cameraIndexCode, (newCode) => {
    if (newCode) {
      previewVideo(newCode)
    }
  })
  
  onMounted(() => {
    nextTick(() => initPlugin())
  })
  
  onBeforeUnmount(() => {
    if (oWebControl.value) {
      oWebControl.value.JS_HideWnd()
      oWebControl.value.JS_RequestInterface({ funcName: "destroyWnd" })
      oWebControl.value.JS_Disconnect()
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .main {
    background-color: #ccc;
  }
  </style>