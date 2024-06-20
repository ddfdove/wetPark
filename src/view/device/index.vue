<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <Left></Left>
    <Device v-if="showIntroduce"></Device>
  </div>


</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import Left from './left.vue'
import Device from './device.vue'

//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}
function restorePosition(position, scale) {
  // 判断是放大还是缩小
  if (scale < 1) {
    // 放大：对 position 进行除法运算还原原始坐标
    return {
      x: position.x / scale,
      y: position.y / scale,
    };
  } else {
    // 缩小：对 position 进行乘法运算还原原始坐标
    return {
      x: position.x * scale,
      y: position.y * scale,
    };
  }
}
const props=defineProps({scale:Number})
const showIntroduce = ref(false)
onMounted(() => {
  console.log('scaledevice',getScale());
  const viewer = new Cesium.Viewer("cesiumContainer", {
    scene3DOnly: true,
    animation: false, //动画小部件
    baseLayerPicker: false, //地图图层组件
    fullscreenButton: false, //全屏组件
    geocoder: false, //地理编码搜索组件
    homeButton: false, //首页组件
    infoBox: false, //信息框
    sceneModePicker: false, //场景模式
    selectionIndicator: false, //选取指示器组件
    timeline: false, //时间轴
    // skyBox: false,
    navigationHelpButton: false, //帮助按钮
    navigationInstructionsInitiallyVisible: false,
  });

  // 去除logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  viewer.imageryLayers.remove(viewer.imageryLayers.get(0)) //清楚Cesium默认加载的影像地图数据(默认是加载的bing地图)

  //高德离线瓦片图
  const imgLayer = new Cesium.UrlTemplateImageryProvider({
    // url: "http://36.133.97.79:8231///www/wwwlogs/mx/upload/map/tiles/{z}/{x}/{reverseY}.png",
    // url: "src/assets/map/img/tiles/{z}/{x}/{reverseY}.png",
    url: "src/assets/map/vec/tiles/{z}/{x}/{reverseY}.png",
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    tileMatrixSetID: "GoogleMapsCompatible", //使用谷歌的瓦片切片方式
    fileExtension: 'png',
    // minimumLevel: 1,
    // maximumLevel: 18
  });
  // viewer.imageryLayers.addImageryProvider(imgLayer);

  function addAMapImagery(viewer, type, option) {
    let url = "";
    switch (type) {
      case "gdvec":
        url =
          "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
        break;
      case "gdimg":
        url =
          "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
        break;
      case "gdmarker":
        url =
          "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8";
        break;
      case "tmsimg":
        url =
          "http://36.133.97.79:8231///www/wwwlogs/mx/upload/map/tiles/{z}/{x}/{y}.png"
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
    }
    // if(type === 'gdimg') {
    //   url = 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
    // } else if(type === 'gdvec') {
    //   url = "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
    // } else if(type === 'gdmarker') {
    //   url = 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
    // }
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
  addAMapImagery(viewer, 'gdvec')		// 加载高德矢量底图
  // addAMapImagery(viewer, 'gdimg')		// 加载高德影像底图
  // addAMapImagery(viewer, 'gdmarker')	// 加载高德标注图层
  // addAMapImagery(viewer, 'tmsing')	// 加载离线瓦片图高德标注图层
  // addAMapImagery(viewer, 'tdtimg')	// 加载天地图影像图层
  // addAMapImagery(viewer, 'tdtcia')	// 加载天地图影像标注图层
  // addAMapImagery(viewer, 'tdtvec')	// 加载天地图矢量图层
  // addAMapImagery(viewer, 'tdtcva')	// 加载天地图矢量标注图层
  // addAMapImagery(viewer, 'tximg')	// 加载腾讯影像图层
  // const terrainProvider = Cesium.createWorldTerrain();
  // viewer.scene.terrainProvider = terrainProvider;
  
  const position = Cesium.Cartesian3.fromDegrees(101.691631, 36.6529, 2000);
  // 设置相机位置
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

  //外层添加实体设置颜色
   viewer.entities.add({
      name:'yanse',
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
        material: Cesium.Color.fromCssColorString('rgba(3, 0, 37, 0.6)'), // 设置背景颜色和透明度
      },
    });
  addBillboards();
  // addPolygon(); // 添加面
  // addCamera(); //添加摄像头
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
  function addBillboards() {
    const url = "/geiJsonData/billboard.geojson";
    Cesium.Resource.fetchJson(url).then((res) => {
      const billboards = res.features;
      billboards.forEach((item) => {
        const { geometry, properties } = item;
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(geometry.coordinates[0], geometry.coordinates[1], geometry.coordinates[2]),
          name: 'camera', // 设置实体的名称为 'camera'
          label: {
            text: properties.name,
            font: "700 14px Helvetica",
            pixelOffset: new Cesium.Cartesian2(0, -66),
          },
          billboard: {
            image: "/cut/camera.png",
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

  // 添加点击事件处理

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
    
    const position=movement.position

    console.log('position1',position);
   const restoreposition= restorePosition(position,getScale())
    console.log('position2',restoreposition);
    const pickedObject = viewer.scene.pick(restoreposition);
    console.log('pickedObject',pickedObject);
    if (pickedObject && pickedObject.id && pickedObject.id.name === 'camera') {
      // 如果拾取到了带有 'camera' 名称的实体
      showIntroduce.value = !showIntroduce.value;
      // console.log('Picked camera entity:', pickedObject.id);
    } else {
      showIntroduce.value = false;
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});
</script>

<style scoped lang="less">
#cesiumContainer {
  width: 1920px;
  height: 1000px;
  // background-color: #001529; /* 设置背景颜色 */

}
</style>
