<template>
  <div class="container">
    <div class="button">
      <el-tooltip content="点击显示/隐藏" placement="right">
        <el-button @click="isToolShow = !isToolShow" type="primary" class="tools"
          v-tooltip="点击显示 / 隐藏">地图小工具</el-button>
      </el-tooltip>

      <ul v-show="isToolShow">
        <li>
          <el-input v-model="coordinates" placeholder="输入坐标 (经度, 纬度, 高度)" @keyup.enter="goToCoordinates"
            style="width: 200px;"></el-input>
        </li>
        <li>
          <el-button type="primary" @click="onLineMeasure" style="margin-right: 10px;">空间距离</el-button>
          <el-button type="primary" @click="onAreaMeasure">空间面积</el-button>
        </li>
        <li>
          <el-button type="primary" @click="onGeolocation" style="margin-right: 10px;">地理定位</el-button>
          <el-button type="primary" @click="onClear" style="width:90px;">清除</el-button>
        </li>
        <li>
          <el-button type="primary" @click="switchMap">在线/离线地图切换</el-button>
        </li>
      </ul>
      <!-- 显示定位信息 -->
      <div class="location-info" v-if="location && isShowLocation">
        <button @click="isShowLocation = false" class="clear">x</button>
        <p>您的位置处于</p>
        <p><strong>经度:</strong> {{ location.longitude }}</p>
        <p><strong>纬度:</strong> {{ location.latitude }}</p>
        <!-- <span><strong>高度:</strong> {{ location.height }}</span> -->
      </div>
    </div>
    <!-- 自定义全屏按钮 -->
    <!-- <div class="fullscreen-button">
      <el-tooltip content="全屏" placement="right">
        <i @click="toggleFullscreen"
          :class="isFullscreen ? 'iconfont icon-quxiaoquanping' : 'iconfont icon-quanping_o'"></i>
      </el-tooltip>
    </div> -->
    <div id="cesiumContainer"></div>
    <Left :dataList="monitorEqu"></Left>
    <Device v-if="showIntroduce"></Device>
    <!-- <Right></Right> -->


  </div>


</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, onUnmounted, ref } from "vue";
import { getMonitorEquipment } from '@/api/index.js'
import { ElMessage, ElTooltip } from "element-plus"; // 引入 ElMessage 组件
import MeasureTool from "@/utils/cesiumCtrl/measure.js";
import DrawTool from "@/utils/cesiumCtrl/drawGraphic";
import { restorePosition } from '@/utils/cesiumCtrl/position.js'
import Left from './left.vue'
import Device from './device.vue'
import Right from './right.vue'


const props = defineProps({ scale: Number })
const viewer = ref(null)
const showIntroduce = ref(false)
const isToolShow = ref(false)
const cameraPosition = Cesium.Cartesian3.fromDegrees(101.691631, 36.6529, 2000);
const swichInlineOffline = ref(false)
const coordinates = ref(""); // 声明一个响应式变量用于绑定输入框的值
const location = ref(null); // 存储定位信息的状态
const isShowLocation = ref(true)
const isMapInitialized = ref(false); // 用于跟踪地图是否已经初始化
const isFullscreen = ref(false);
const measure = ref(null)
const drawTool = ref(null)
let intervalId = null;
let isFetching = false;
const monitorEqu = ref({
})
const getMonitorEqu = async () => {
  try {
    const res = await getMonitorEquipment();
    if (res.code === 0) {
      monitorEqu.value = res.data;
    } else {
      console.log(res.msg);
    }
  } catch (err) {
    console.error("请求失败", err);
    // 处理请求失败的情况
  }
}

const fetchData = async () => {
  if (isFetching) return; // 如果正在获取数据，直接返回
  isFetching = true; // 标记正在获取数据
  try {
    await  getMonitorEqu()
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching = false; // 请求完成，重置标志
  }
};

const startPolling = () => {
  fetchData(); // 初始加载数据
  intervalId = setInterval(fetchData, 3 * 60000); // 每隔3分钟秒获取一次数据
  // intervalId = setInterval(fetchData, 30000); // 每隔3分钟秒获取一次数据
 
};

const stopPolling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};
onMounted(() => {
  startPolling();
  switchMap()
  isMapInitialized.value = true
})
onUnmounted(() => {
  onClear();
  stopPolling();
});
//设置相机位置函数
const setCameraPosition = (viewer, position) => {
  viewer.camera.setView({
    destination: position,
    orientation: {
      //角度转弧度   let radians = Cesium.Math.toRadians(degrees);
      //弧度转角度  let degrees = Cesium.Math.toDegrees(radians);
      heading: Cesium.Math.toRadians(0.0), //左右摇头视角
      pitch: Cesium.Math.toRadians(-90.0), //上下点头视角
      roll: Cesium.Math.toRadians(0), //歪头视角
    },
  });
}
//设置外层蒙版颜色
const setMaskColor = (viewer) => {
  viewer.entities.add({
    name: 'yanse',
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
      material: Cesium.Color.fromCssColorString('rgba(3, 0, 37, 0.6)'), // 设置背景颜色和透明度
    },
  });
}

function addPolygon() {
  const url = "/geiJsonData/wetPark.geojson";
  Cesium.Resource.fetchJson(url).then((res) => {
    const polygon = res.features;
    polygon.forEach((item) => {
      const { geometry, properties } = item;
      const positions = [];
      geometry.coordinates[0].forEach((pos) => {
        positions.push(Cesium.Cartesian3.fromDegrees(pos[0], pos[1], pos[2]));
      });
      //    console.log(positions);
      const polygonEntity = viewer.entities.add({
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(positions),
          // material: Cesium.Color.fromCssColorString(
          //   properties.color
          // ).withAlpha(0.3),
          material: Cesium.Color.TRANSPARENT,
          perPositionHeight: true,
        },
      });
      const aPos = polygonEntity.polygon.hierarchy._value.positions;
      var iX = 0,
        iY = 0,
        iZ = 0;
      for (var j = 0; j < aPos.length; j++) {
        iX = aPos[j].x + iX;
        iY = aPos[j].y + iY;
        iZ = aPos[j].z + iZ;
      }
      iX = iX / aPos.length;
      iY = iY / aPos.length;
      iZ = iZ / aPos.length;
      console.log(properties.name);
      const center = new Cesium.Cartesian3(iX, iY, iZ);
      const label = viewer.entities.add({
        position: center,
        label: {
          text: properties.name,
          font: "700 16px Helvetica", // 15pt monospace
        },
        billboard: {
          image: "/cut/camera.png",
          width: 36,
          height: 96,
        },
      });
      // new CesiumPlugin.DIVLabel(viewer, center, properties.name);
    });
  });
}
//添加广告牌
const addBillboards = (viewer) => {
  const url = "/geiJsonData/billboard.geojson";
  Cesium.Resource.fetchJson(url).then((res) => {
    const billboards = res.features;
    billboards.forEach((item) => {
      const { geometry, properties } = item;
      // 根据 properties.name 设置不同的图片路径
      let imageUrl;
      switch (properties.name) {
        case '路口摄像头':
          imageUrl = "/cut/camera.png";
          break;
        case '鸟类监控摄像头':
          imageUrl = "/cut/camera2.png";
          break;
        case '土壤监测设备':
          imageUrl = "/cut/soil.png";
          break;
        case '水质监测设备':
          imageUrl = "/cut/water.png";
          break;
        case '环境监测设备':
          imageUrl = "/cut/environment.png";
          break;
        // 添加更多的 case 以匹配其他名称
        default:
          imageUrl = "/cut/camera.png"; // 默认图片
      }
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(geometry.coordinates[0], geometry.coordinates[1], geometry.coordinates[2]),
        name: 'camera', // 设置实体的名称为 'camera'
        label: {
          text: properties.name,
          font: "700 14px Helvetica",
          pixelOffset: new Cesium.Cartesian2(0, -66),
        },
        billboard: {
          image: imageUrl,
          width: 36,
          height: 96,
        },
        pickable: true

      });
      // 添加一个透明的点击区域
      viewer.entities.add({
        name: 'camera-area',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            101.692532 - 0.0005, 36.653907 - 0.0005,
            101.692532 + 0.0005, 36.653907 - 0.0005,
            101.692532 + 0.0005, 36.653907 + 0.0005,
            101.692532 - 0.0005, 36.653907 + 0.0005
          ]),
          material: Cesium.Color.TRANSPARENT, // 透明材质
          outline: false, // 不显示边框
          height: 10, // 与 billboards 的高度对应
          pickable: true
        }
      });
    });
  });
}



//空间距离
const onLineMeasure = () => {
  console.log('measure', measure.value);

  measure.value.drawLineMeasureGraphics({
    clampToGround: true,
    callback: (e) => {
      console.log("----", e);
    },
  });

};
//空间面积
const onAreaMeasure = () => {
  measure.value.drawAreaMeasureGraphics({
    clampToGround: true,
    callback: () => { },
  });
};
//清除
const onClear = () => {
  console.log('清除');
  measure.value._drawLayer.entities.removeAll();
};
//飞到指定位置
const goToCoordinates = () => {
  const [longitude, latitude, height] = coordinates.value.split(",").map(Number);
  viewer.value.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
    duration: 3, // 飞行时间


  });
};
//地理定位
const onGeolocation = () => {
  isShowLocation.value = true
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const height = 1000; // 设置一个默认高度，可以根据需要调整
      viewer.value.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        duration: 3, // 飞行时间
        complete: () => {
          // 更新定位信息的状态
          location.value = {
            longitude: longitude.toFixed(6),
            latitude: latitude.toFixed(6),
            height: height.toFixed(2),
          };
        },
      });
    });
  } else {
    alert("浏览器不支持地理定位功能，请使用其他方式获取位置信息");
  }
};
//飞行
const onFly = (position) => {
  const { x: longitude, y: latitude, z: height } = position;
  viewer.value.camera.flyTo({
    // 从以度为单位的经度和纬度值返回笛卡尔3位置。
    destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
    orientation: {
      // heading：默认方向为正北，正角度为向东旋转，即水平旋转，也叫偏航角。
      // pitch：默认角度为-90，即朝向地面，正角度在平面之上，负角度为平面下，即上下旋转，也叫俯仰角。
      // roll：默认旋转角度为0，左右旋转，正角度向右，负角度向左，也叫翻滚角
      heading: Cesium.Math.toRadians(0.0), // 正东，默认北
      pitch: Cesium.Math.toRadians(-90), // 向正下方看
      roll: 0.0, // 左右
    },
    duration: 3, // 飞行时间（s）
  })
};
// 切换到2D模式
const switchTo2D = () => {
  viewer.value.scene.mode = Cesium.SceneMode.SCENE2D;
};

// 切换到3D模式
const switchTo3D = () => {
  viewer.value.scene.mode = Cesium.SceneMode.SCENE3D;
};
//在线地图加载
const addMapOnline = (viewer, type, option) => {
  let url = "";
  switch (type) {
    case "gdVec":
      url =
        "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
      break;
    case "gdImg":
      url =
        "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
      break;
    case "gdmarker":
      url =
        "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8";
      break;
    case "tdtimg":
      url =
        'http://{s}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=177e052448ee994e83ca43fa0f3e3b22'
      break;
    case "tdtcia":
      url =
        "http://{s}.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=177e052448ee994e83ca43fa0f3e3b22";
      break;
    case "tdtvec":
      url =
        "http://{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=177e052448ee994e83ca43fa0f3e3b22";
      break;
    case "tdtcva":
      url =
        "http://{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=177e052448ee994e83ca43fa0f3e3b22";
      break;
    case "tximg":
      url =
        "https://p2.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=400";
      break;
    case "OfflineImg":
      url =
        "src/assets/map/img/tiles/{z}/{x}/{reverseY}.png";
      break;
    case "OfflineVec":
      url =
        "src/assets/map/vec/tiles/{z}/{x}/{reverseY}.png";
  }
  const atLayer = new Cesium.UrlTemplateImageryProvider({
    url,
    minimumLevel: 1,
    maximumLevel: 18,
    ...option,
    // layer: 'img',
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    customTags: {
      sx: function (imageryProvider, x, y, level) { return x >> 4; },
      sy: function (imageryProvider, x, y, level) { return ((1 << level) - y) >> 4 }
    }
  });
  viewer.imageryLayers.addImageryProvider(atLayer);
}
//离线地图加载
const addMapOffline = (viewer, type) => {
  let url = "";
  switch (type) {
    case "vec":
      url =
        "src/assets/map/vec/tiles/{z}/{x}/{reverseY}.png";
      break;
    case "img":
      url =
        "src/assets/map/img/tiles/{z}/{x}/{reverseY}.png";

  }
  const imgLayer = new Cesium.UrlTemplateImageryProvider({
    // url: "http://36.133.97.79:8231///www/wwwlogs/mx/upload/map/tiles/{z}/{x}/{reverseY}.png",
    // url: "src/assets/map/img/tiles/{z}/{x}/{reverseY}.png",
    url,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    tileMatrixSetID: "GoogleMapsCompatible", //使用谷歌的瓦片切片方式
    fileExtension: 'png',
    // minimumLevel: 1,
    // maximumLevel: 18
  });
  viewer.imageryLayers.addImageryProvider(imgLayer);
}
//在线/离线地图切换
const switchMap = () => {
  // 清除现有地图
  if (viewer.value) {
    viewer.value.destroy();
  }
  // 重新初始化地图
  viewer.value = new Cesium.Viewer("cesiumContainer", {
    scene3DOnly: false,
    animation: false, //动画小部件
    baseLayerPicker: false, //地图图层组件
    fullscreenButton: true, //全屏组件
    geocoder: false, //地理编码搜索组件
    homeButton: false, //首页组件
    infoBox: false, //信息框
    sceneModePicker: false, //场景模式
    selectionIndicator: false, //选取指示器组件
    timeline: false, //时间轴
    // skyBox: false,
    navigationHelpButton: false, //帮助按钮
    navigationInstructionsInitiallyVisible: false,
  })
  // 去除logo
  viewer.value.cesiumWidget.creditContainer.style.display = "none";
  //清楚Cesium默认加载的影像地图数据(默认是加载的bing地图)
  viewer.value.imageryLayers.remove(viewer.value.imageryLayers.get(0))
  // 添加地图图层
  swichInlineOffline.value = !swichInlineOffline.value
  console.log('swichInlineOffline.value', swichInlineOffline.value);
  if (swichInlineOffline.value) {
    addMapOnline(viewer.value, 'gdVec')
    // console.log('gdVec');
  } else {
    addMapOffline(viewer.value, 'vec')
    // console.log('offlineVec');
  }
  // 如果不是第一次初始化，显示切换成功的提示信息
  if (isMapInitialized.value) {
    ElMessage({
      message: '地图切换成功！',
      type: 'success',
      duration: 2000
    });
  }
  measure.value = new MeasureTool(viewer.value)
  drawTool.value = new DrawTool(viewer);
  //初始相机位置
  setCameraPosition(viewer.value, cameraPosition)
  //添加广告牌
  addBillboards(viewer.value);
  //外层添加实体设置颜色
  setMaskColor(viewer.value)

  // 添加点击事件处理
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.value.scene.canvas);
  handler.setInputAction(function (movement) {
    const restoreposition = restorePosition(movement.position)
    const pickedObject = viewer.value.scene.pick(restoreposition);
    if (pickedObject && pickedObject.id && pickedObject.id.name === 'camera') {
      // 如果拾取到了带有 'camera' 名称的实体
      showIntroduce.value = !showIntroduce.value;
      // console.log('Picked camera entity:', pickedObject.id);
    } else {
      showIntroduce.value = false;
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// 切换地图全屏状态
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  const mapContainer = document.getElementById('cesiumContainer');
  // 设置 mapContainer 的宽度和高度为全屏
  function setFullscreenSize() {
    const scale = getScale(); // 获取当前缩放比例
    if (scale > 1) {
      mapContainer.style.width = `${window.innerWidth * scale}px`;
      mapContainer.style.height = `${window.innerHeight * scale}px`;
    } else {
      mapContainer.style.width = `${window.innerWidth / scale}px`;
      mapContainer.style.height = `${window.innerHeight / scale}px`;
    }
  }
  if (isFullscreen.value) {
    mapContainer.classList.add('fullscreen');
    // 设置容器的宽高为视口的宽高
    setFullscreenSize()
    // 隐藏导航栏等其他元素
    // document.querySelector('.navbar').style.display = 'none';
  } else {
    mapContainer.classList.remove('fullscreen');
    // 恢复容器的原始宽高
    mapContainer.style.width = '';
    mapContainer.style.height = '';
    // 恢复显示导航栏等其他元素
    // document.querySelector('.navbar').style.display = 'block';
  }
};

</script>

<style scoped lang="less">
.container {
  position: relative;
  // width: 100%;
  // height: 100vh;
}

.button {
  position: fixed;
  top: 140px;
  left: 1600px;
  z-index: 999;

  .tools {
    margin-left: 8px;
    margin-bottom: 10px;
  }

  ul {
    display: flex;
    flex-direction: column;

    li {
      margin: 5px 10px;
    }
  }

  .location-info {
    width: 200px;
    // border-radius: 10px;
    background-color: #409eff;
    margin-left: 10px;
    position: relative;

    p {
      margin: 10px 15px;
    }

    .clear {
      width: 40px;
      // height: 40px;
      background-color: transparent;
      position: absolute;
      right: 2px;
      border: none;
      //  top:5px;
      //  right:10px;
      font-size: 22px;
    }

    // .clear:hover{
    //   color: #FFFFFF;
    // }
  }
}

#cesiumContainer {
  // width: 1920px;
  // height: 960px;
  width: 100%;
  height: 100%;
}

.fullscreen-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  cursor: pointer;

  i {
    font-size: 26px;
    /* 调整图标大小 */
    color: #79bbff;
    /* 调整图标颜色 */
  }
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  /* 确保在最顶层 */
}
</style>
