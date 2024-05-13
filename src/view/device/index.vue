<template>
  <div id="cesiumContainer"></div>
  <ul id="left">
    <li>
      <el-popover placement="left-start" :width="400" trigger="click" :show-arrow="false" :offset="400"
        popper-class="popperClass">
        <template #reference>
          <div>
            <h3 style="
                padding: 15px 0 15px 60px;
                font-size: 16px;
                margin-bottom: 10px;
              ">
              数据采集
            </h3>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.label" :name="item.name">
                <el-table :data="tableData" :max-height="240" :header-row-style="headerRowStyle"
                  :header-cell-style="headerCellStyle" :row-style="rowStyle" :cell-style="cellStyle">
                  <el-table-column v-for="(tableItem, index) in item.tableList" :key="index" :prop="tableItem.prop"
                    :label="tableItem.label1" width="140" />
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </template>
        <template #default>
          <el-table :data="gridData">
            <el-table-column width="150" property="date" label="date" />
            <el-table-column width="100" property="name" label="name" />
            <el-table-column width="300" property="address" label="address" />
          </el-table>
        </template>
      </el-popover>
    </li>
    <li>
      <h3 style="padding: 15px 0 15px 60px; font-size: 16px; margin-bottom: 10px">
        数据采集
      </h3>
      <el-table :data="tableData2" :max-height="260" :header-row-style="headerRowStyle"
        :header-cell-style="headerCellStyle" :row-style="rowStyle" :cell-style="cellStyle">
        <el-table-column v-for="(tableItem, index) in tableList2" :key="index" :prop="tableItem.prop"
          :label="tableItem.label" width="250" />
        <!-- <el-table-column prop="area" label="地区" width="140" />
                            <el-table-column prop="device" label="设备(在线/总数)" /> -->
      </el-table>
    </li>
    <li style="background-color: rgb(18, 39, 57); opacity: 1">
      <p style="
          font-size: 22px;
          font-weight: 500;
          color: rgb(60, 191, 223);
          margin: 0 0 10px 30px;
        ">
        地点检测
      </p>
      <div class="top" style="display: flex; margin-bottom: 30px">
        <div class="tLeft" style="flex: 1">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <span style="margin-right: 50px">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">Action 1</el-dropdown-item>
                <el-dropdown-item command="b">Action 2</el-dropdown-item>
                <el-dropdown-item command="c">Action 3</el-dropdown-item>
                <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="tRight" style="flex: 1; border: 1px solid; border-radius: 2px">
          <span style="margin-left: 40px; line-height: 30px">4/30</span>
          <span style="margin-left: 40px; line-height: 30px">.</span>
          <span style="margin-left: 40px; line-height: 30px">5/30</span>
        </div>
      </div>
      <div id="animal">
        <ul style="display: flex">
          <li>
            <h3 style="margin-bottom: 10px">斑嘴鸭</h3>
            <span style="margin-left: 20px">2只</span>
          </li>
          <li>
            <h3 style="margin-bottom: 10px">白鹭</h3>
            <span style="margin-left: 20px">6只</span>
          </li>
          <li>
            <h3 style="margin-bottom: 10px">骨顶鸡</h3>
            <span style="margin-left: 20px">4只</span>
          </li>
        </ul>
        <div style="padding: 0 10px 0 20px">
          <span>
            <h3 style="margin-bottom: 10px">动物</h3>
            <span style="margin-left: 20px">1只</span>
          </span>
          <span>
            <h3 style="margin-bottom: 10px">鸟</h3>
            <span style="margin-left: 20px">9只</span>
          </span>
        </div>
      </div>
    </li>
  </ul>
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
import * as Cesium from "cesium";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";

const handleCommand = (command) => {
  ElMessage(`click on item ${command}`);
};
const activeName = ref("first");
const tabsList = ref([
  {
    label: "气象站",
    name: "first",
    tableList: [
      {
        prop: "garden",
        label1: "园区",
      },
      {
        prop: "area",
        label1: "地区",
      },
      {
        prop: "device",
        label1: "设备(在线/总数)",
      },
    ],
  },
  {
    label: "环境监测",
    name: "second",
  },
  {
    label: "土壤详情",
    name: "third",
  },
  {
    label: "摄像头",
    name: "fourth",
  },
  {
    label: "孢子虫情",
    name: "fifth",
  },
]);
const tableList2 = ref([
  {
    prop: "garden",
    label: "园区名",
  },
  {
    prop: "collection",
    label: "采集总数",
  },
]);
const tableData = ref([
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
]);
const tableData2 = ref([
  {
    garden: "梁兴家庭农场",
    collection: "1314521",
  },
  {
    garden: "梁兴家庭农场",
    collection: "7788654",
  },
  {
    garden: "梁兴家庭农场",
    collection: "98421365",
  },

  {
    garden: "梁兴家庭农场",
    collection: "99484684654",
  },
  {
    garden: "梁兴家庭农场",
    collection: "沧州市南皮县",
  },
]);
const gridData = ref([
  {
    date: "2016-05-02",
    name: "Jack",
    address: "New York City",
  },
  {
    date: "2016-05-04",
    name: "Jack",
    address: "New York City",
  },
  {
    date: "2016-05-01",
    name: "Jack",
    address: "New York City",
  },
  {
    date: "2016-05-03",
    name: "Jack",
    address: "New York City",
  },
]);
const headerRowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
  };
};
const headerCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: "0px",
    // borderBottom: '1px solid rgb(8, 171, 238)'
    border: "none",
  };
};
const rowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
  };
};
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    // padding: '0px',
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
  };
};
// const url=ref('http://vjs.zencdn.net/v/oceans.mp4')
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

onMounted(() => {
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
    navigationHelpButton: false, //帮助按钮
    navigationInstructionsInitiallyVisible: false,
  });

  // 去除logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  console.log(viewer.imageryLayers);
  viewer.imageryLayers.remove(viewer.imageryLayers.get(0)) //清楚Cesium默认加载的影像地图数据(默认是加载的bing地图)

  //高德离线瓦片图
  const imgLayer = new Cesium.UrlTemplateImageryProvider({
    // url: "http://36.133.97.79:8231///www/wwwlogs/mx/upload/map/tiles/{z}/{x}/{y}.png",
    url: "map/tiles/{z}/{x}/{y}.png",
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    fileExtension: 'png',
    minimumLevel: 1,
    maximumLevel: 18
  });
  console.log(imgLayer);
  viewer.imageryLayers.addImageryProvider(imgLayer);
  console.log(viewer.imageryLayers);

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
  // addAMapImagery(viewer, 'gdvec')		// 加载高德矢量底图
  // addAMapImagery(viewer, 'gdimg')		// 加载高德影像底图
  // addAMapImagery(viewer, 'gdmarker')	// 加载高德标注图层
  // addAMapImagery(viewer, 'tmsing')	// 加载离线瓦片图高德标注图层
  // addAMapImagery(viewer, 'tdtimg')	// 加载天地图影像图层
  // addAMapImagery(viewer, 'tdtcia')	// 加载天地图影像标注图层
  // addAMapImagery(viewer, 'tdtvec')	// 加载天地图矢量图层
  // addAMapImagery(viewer, 'tdtcva')	// 加载天地图矢量标注图层
  // addAMapImagery(viewer, 'tximg')	// 加载腾讯影像图层

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
  // addPolygon(); // 添加面
  // addCamera(); //添加摄像头
  function addPolygon() {
    const url = "/src/assets/wetPark.geojson";
    Cesium.Resource.fetchJson(url).then((res) => {
      console.log(res);
      console.log(res.features);
      console.log(res.type);
      //   const { polygon } = CesiumPlugin.Geo.GeoJsonToGraphics(res);
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
            material: Cesium.Color.fromCssColorString(
              properties.color
            ).withAlpha(0.3),
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
        });
        // new CesiumPlugin.DIVLabel(viewer, center, properties.name);
      });
    });
  }
  function addCamera() {
    const url = "/src/assets/billboard.geojson";
    Cesium.Resource.fetchJson(url).then((res) => {
      console.log(res);
      console.log(res.features);
      console.log(res.type);
      //   const { polygon } = CesiumPlugin.Geo.GeoJsonToGraphics(res);
      const point = res.features;
      point.forEach((item) => {
        const { geometry, properties } = item;
        const camera = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            geometry.coordinates[0],
            geometry.coordinates[1],
            geometry.coordinates[2]
          ),
          label: {
            text: properties.name,
            font: "700 20px Helvetica", // 15pt monospace
            pixelOffset: new Cesium.Cartesian2(0, 40), //偏移量
          },
          billboard: {
            image: "../../../src/assets/pictures/摄像头1.png",
            scale: 0.2,
          },
        });
      });
    });
  }
});
</script>

<style scoped lang="less">
//table下面有根白线，去掉
/deep/.el-table__inner-wrapper::before {
  height: 0px;
}

.el-table,
.el-table__expanded-cell {
  // height: 400px;
  // background-color: rgb(10, 210, 236);
  background-color: transparent; //这是设置透明背景色
}

* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}

/deep/#cesiumContainer {
  width: 1920px;
  height: 1000px;
  margin: 0;
  padding: 0;
  // height: 100%;
}

.el-dropdown-link {
  width: 160px;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  // text-align: center;
  color: #ffffff;
  font-size: 16px;
  border: 1px solid;
  border-radius: 2px;
}

#left {
  width: 500px;
  height: 930px;
  // margin:0 0 20px 5px;
  position: fixed;
  top: 80px;
  left: 10px;
  background-color: rgb(43, 58, 68);
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  #animal {
    background-color: rgb(18, 39, 57);

    // color: rgb(44,95,102);
    ul {
      display: flex;
      padding: 0 10px 0 10px;
      margin-bottom: 10px;

      // flex-wrap: wrap;
      li {
        width: 130px;
        height: 80px;
        margin-right: 10px;
        padding: 10px 0px 0 30px;
        // border: 2px solid #13ecf3;
        border: 2px solid rgb(44, 95, 102);
        background-color: rgb(17, 39, 57);
        border-radius: 5px;
      }
    }

    div>span {
      display: inline-block;
      width: 130px;
      height: 80px;
      margin-right: 20px;
      padding: 10px 0px 0 30px;
      border: 2px solid rgb(44, 95, 102);
      border-radius: 5px;
    }
  }

  // font-size: 28px;
  li {
    flex: 1;
    // color: rgb(229, 239, 250);
    color: #ffffff;
    margin: 0 5px 10px 10px;
    padding-left: 15px;
    // margin-left: 15px;
    // margin-bottom: 10px;
    background-color: rgb(47, 81, 157);
    // background-color: rgb(24, 86, 218);

    ::v-deep .demo-tabs {
      margin: 0 20px 0 0px;
      // background-color: rgb(24, 86, 218);
      background-color: rgb(47, 81, 157);

      ::v-deep .el-table__inner-wrapper::before {
        height: 0px;
        background-color: transparent; //这是设置透明背景色
      }
    }

    ::v-deep .el-tabs__item {
      color: #ffffff;
      padding: 0;
      margin-left: 15px;
      //   margin-right: 10px;
      height: 26px;
      width: 70px;
      text-align: center;
      vertical-align: middle;
      //   color: rgb(203,176,89);
      border: 2px solid rgb(245, 190, 9);
      border-radius: 5px;
    }

    /**选中 */
    ::v-deep .el-tabs__item.is-active {
      color: rgb(243, 197, 45);
    }

    /*去下划线 */
    ::v-deep .el-tabs__nav-wrap::after {
      position: static !important;
    }

    /*去掉切换时el-tab-pane底部的蓝色下划线*/
    ::v-deep .el-tabs__active-bar {
      background-color: transparent !important;
    }
  }
}

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

/deep/.el-popover.popperClass {
  background-color: red;
  // position: fixed;
  margin-top: 200px;
  top: 200px;
  left: 400px;
}
</style>
