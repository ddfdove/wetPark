import { createApp } from 'vue'
//引入路由进行注册
import router from './router/index'
import App from './App.vue'
import '../styles/index.css'
//引入highcharts
import HighchartsVue from 'highcharts-vue';
import Highcharts from "highcharts"; 
import ElementPlus from 'element-plus'
// 引用所需外部资源
import Highcharts3d from "highcharts/highcharts-3d";
import exporting from "highcharts/modules/exporting";
import funnel from "highcharts/modules/funnel";
import variablepie from 'highcharts/modules/variable-pie'
import funnel3d from "highcharts/modules/funnel3d";
import cylinder from "highcharts/modules/cylinder";
import pyramid3d from "highcharts/modules/pyramid3d";
import exportingInit from 'highcharts/modules/exporting' 
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
// 导入视频播放组件
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'





// 注册所需外部资源
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3d(Highcharts);
funnel3d(Highcharts);
exporting(Highcharts);
funnel(Highcharts);
exportingInit(Highcharts);
cylinder(Highcharts);
pyramid3d(Highcharts);
variablepie(Highcharts)
 
import 'element-plus/dist/index.css'


const app = createApp(App)
//注册模板路由
app.use(router)
app.use(HighchartsVue)
app.use(ElementPlus)
// 视频播放组件
app.use(VueVideoPlayer)
app.mount('#app')
