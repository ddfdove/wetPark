<template>
    <div id="cesiumContainer"></div>
    <ul id="left">
        <li>1</li>
        <li>23</li>
        <li>3</li>
    </ul>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';

onMounted(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
        scene3DOnly: true,
        animation: false,//动画小部件
        baseLayerPicker: false,//地图图层组件
        fullscreenButton: false,//全屏组件
        // geocoder:false,//地理编码搜索组件
        // homeButton:false,//首页组件
        infoBox: false,//信息框
        sceneModePicker: false,//场景模式
        selectionIndicator: false,//选取指示器组件
        timeline: false,//时间轴
        navigationHelpButton: false,//帮助按钮
        navigationInstructionsInitiallyVisible: false

    }
    )

    // 去除logo
    viewer.cesiumWidget.creditContainer.style.display = "none"


    const imageLayers = viewer.imageryLayers
    console.log(imageLayers);
    imageLayers.remove(imageLayers.get(0)) //清楚Cesium默认加载的影像地图数据(默认是加载的bing地图)

    function addTMap(viewer, layer) {
        // 添加天地图影像注记底图
        const tMapImagery = new Cesium.WebMapTileServiceImageryProvider({
            url: `http://t0.tianditu.gov.cn/${layer}_w/wmts?tk=177e052448ee994e83ca43fa0f3e3b22`,
            layer,
            style: "default",
            tileMatrixSetID: "w",
            format: "tiles",
            subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            maximumLevel: 18,
            minimumLevel: 1,
            credit: 'Tianditu'
        })
        viewer.imageryLayers.addImageryProvider(tMapImagery)
    }
    // 添加矢量底图与矢量标注图层
    //   addTMap(viewer, 'vec')
    //   addTMap(viewer, 'cva')
    addTMap(viewer, 'img')
    addTMap(viewer, 'cia')
    // addTMap(viewer, 'ter')
    // addTMap(viewer, 'cta')
    // addTMap(viewer, 'ibo')

    // function addAMapImagery(viewer, type, option) {
    //     let url = ''
    //     if (type === 'img') {
    //         url = 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
    //     } else if (type === 'vec') {
    //         url = "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
    //     } else if (type === 'marker') {
    //         url = 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
    //     }
    //     const atLayer = new Cesium.UrlTemplateImageryProvider({
    //         url,
    //         minimumLevel: 3,
    //         maximumLevel: 18,
    //         ...option
    //     })
    //     viewer.imageryLayers.addImageryProvider(atLayer);
    // }
    // // addAMapImagery(viewer, 'vec')		// 加载高德矢量底图
    // addAMapImagery(viewer, 'img')		// 加载高德影像底图
    // addAMapImagery(viewer, 'marker')	// 加载高德标注图层

    const position = Cesium.Cartesian3.fromDegrees(101.689187, 36.653172, 2000.0)
    // 设置相机位置
    viewer.camera.setView({
        destination: position,
        orientation: {
            //角度转弧度   let radians = Cesium.Math.toRadians(degrees);
            //弧度转角度  let degrees = Cesium.Math.toDegrees(radians);
            heading: Cesium.Math.toRadians(0.0),  //左右摇头视角
            pitch: Cesium.Math.toRadians(-90.0),  //上下点头视角
            roll: Cesium.Math.toRadians(0)  //歪头视角
        }
    });

    const billboard = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(101.689187, 36.653172, 2000.0),
        billboard: {
            image: '../../../src/assets/pictures/摄像头1.png',
            scale: 0.2,
            // height:70,
            // width:60
            //   distanceDisplayCondition:1000,
        },
        label: {
            text: '路口摄像头',
            font: '700 30px Helvetica',// 15pt monospace
            // fillColor: Cesium.Color.ANTIQUEWHITE,
            // fillColor:new Cesium.Color(206,206,206),
            pixelOffset: new Cesium.Cartesian2(0, 40), //偏移量
        },
    })
    viewer.zoomTo(billboard)

})
</script>

<style scoped lang="less">
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

#left {
    width: 460px;
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

    li {
        flex: 1;
        margin-left: 15px;
        margin-bottom: 10px;
        background-color: rgb(47,81,157);
    }


}
</style>