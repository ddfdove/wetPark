<template>
    <div :id="props.id" class="playWnd"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

const props = defineProps({
    cameraIndexCode: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        required: true // 强制要求传入id
    },
    width: {
        type: Number,
        default: 760
    },
    height: {
        type: Number,
        default: 443
    }
})

const playWndBox = ref(null)
let oWebControl = ref(null)
const pubKey = ref('')
// 定义 objData，包含初始化播放器所需的参数
const objData = ref({
    appkey: '26970647',
    secret: 'qx4KcMCRzhoDi5N4uvYN',
    ip: '135.131.1.10:443',
    playMode: 0, // 播放模式
    port: 443, // 端口号
    layout: '1x1' // 布局
})
const initPlugin = () => {
    oWebControl.value = new WebControl({
        szPluginContainer: props.id,
        iServicePortStart: 15900,
        iServicePortEnd: 15900,
        szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",
        cbConnectSuccess: () => {
            oWebControl.value.JS_StartService("window", { dllPath: "./VideoPluginConnect.dll" })
                .then(() => {
                    oWebControl.value.JS_SetWindowControlCallback({})
                    oWebControl.value.JS_CreateWnd(props.id, props.width, props.height, { bEmbed: true })
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
            buttonIDs: "0"
        }

        oWebControl.value.JS_RequestInterface({
            funcName: "init",
            argument: JSON.stringify(params)
        }).then(() => {
            oWebControl.value.JS_Resize(props.width, props.height)
            if (props.cameraIndexCode) {
                console.log('props.cameraIndexCodetest', props.cameraIndexCode)
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

const previewVideo = (code) => {
    const params = {
        cameraIndexCode: code,
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
// 监听 width 和 height 的变化，动态更新播放器尺寸
watch([() => props.width, () => props.height], ([newWidth, newHeight]) => {
    console.log('New width:', newWidth);
    console.log('New height:', newHeight);
    if (oWebControl.value) {
        oWebControl.value.JS_Resize(newWidth, newHeight)

    }
})
onMounted(() => {

    nextTick(() => initPlugin())
    // 监听窗口大小变化，并调整播放器大小
    window.addEventListener('resize', () => {
        if (oWebControl.value) {
            oWebControl.value.JS_Resize(props.width, props.height);
        }
    });
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

.playWnd {
    width: 100%;
    height: 100%;
    background-color: #000;
    pointer-events: none;
    /* 确保点击事件能穿透到父级元素 */
}
</style>