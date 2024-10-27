import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import '../styles/index.scss'
import Cookies from 'js-cookie'
// 引入ElementPlus和视频播放组件
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';
// import VueVideoPlayer from '@videojs-player/vue';
// import 'video.js/dist/video-js.css';
import weatherLiquidfill from 'vue-weather-liquidfill'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
// import VueSkycons from 'vue-skycons'

// 引入Highcharts及相关模块
import HighchartsVue from 'highcharts-vue';
import Highcharts from "highcharts";
import Highcharts3D from "highcharts/highcharts-3d";
import exporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility.js";
import funnel from "highcharts/modules/funnel";
import variablepie from 'highcharts/modules/variable-pie'
import heatmap from 'highcharts/modules/heatmap'
import funnel3d from "highcharts/modules/funnel3d";
import cylinder from "highcharts/modules/cylinder";
import pyramid3d from "highcharts/modules/pyramid3d";
import exportingInit from 'highcharts/modules/exporting'
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';

// 初始化Highcharts模块
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
funnel3d(Highcharts);
exporting(Highcharts);
accessibility(Highcharts);
funnel(Highcharts);
exportingInit(Highcharts);
cylinder(Highcharts);
pyramid3d(Highcharts);
variablepie(Highcharts);
heatmap(Highcharts);



const app = createApp(App);

app.use(router);
app.use(store)
app.use(HighchartsVue);
app.use(ElementPlus,{locale:zhCn});
// app.use(VueVideoPlayer);
app.use(weatherLiquidfill)
// app.use(VueSkycons)
app.mount('#app');
