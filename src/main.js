import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import '../styles/index.scss'
import Cookies from 'js-cookie'
// 引入ElementPlus和视频播放组件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import VueVideoPlayer from '@videojs-player/vue';
import 'video.js/dist/video-js.css';

// 引入Highcharts及相关模块
import HighchartsVue from 'highcharts-vue';
import Highcharts from "highcharts";
import Highcharts3D from "highcharts/highcharts-3d";
import exporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility.js";
import funnel from "highcharts/modules/funnel";
import variablepie from 'highcharts/modules/variable-pie'
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



const app = createApp(App);

app.use(router);
app.use(store)
app.use(HighchartsVue);
app.use(ElementPlus);
app.use(VueVideoPlayer);
app.mount('#app');
