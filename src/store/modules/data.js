import { ref } from "vue";
import { defineStore } from "pinia";
import {
  getWaterData,
  getSoilData,
  getEnvironmentData,
  getWaterEquipmentComparison,
} from "@/api/index";
export const useDataStore = defineStore("data", {
  state: () => ({
    waterData: ref({
      collectTimeList: [],
      mapList: [],
      pHList: [], //PH值
      doList: [], //溶解氧值
      tList: [], //浊度
      wcList: [], //水温
      wtList: [], //叶绿素
      cList: [], //导电率
    }),
    soilData: ref({
      collectTimeList: [],
      mapList: [],
      pHList: [], //土壤PH值
      stList: [], //土壤温度
      smList: [], //土壤水分
      scList: [], //土壤电导率
      sncList: [], //土壤氮含量
      sphcList: [], //土壤磷含量
      spocList: [], //土壤钾含量
    }),
    envData: ref({
      collectTimeList: [],
      mapList: [],
      airTemperatureList: [], //空气温度
      airHumidityList: [], //空气湿度
      pm2_5List: [], //PM2.5
      atmosphericPressureList: [], //气压
      carbonDeviceList: [], //二氧化碳
      sulfurDioxideList: [], //二氧化硫
      totalRadiationList: [], //总辐射
      windDirection360List: [], //风向
      windSpeedList: [], //风速
      rainList: [], //降雨量
    }),
    waterComData: ref({}),
  }),
  actions: {
    async getWaterData(params) {
      try {
        const res = await getWaterData(params);
        if (res.code === 0) {
          this.waterData.value = res.data;
        } else {
          console.log(res.msg);
        }
      } catch (err) {
        console.error("请求失败", err);
        // 处理请求失败的情况
      }
    },
    async getSoilData(params) {
      try {
        const res = await getSoilData(params);
        if (res.code === 0) {
          this.soilData.value = res.data;
        } else {
          console.log(res.msg);
        }
      } catch (err) {
        console.error("请求失败", err);
        // 处理请求失败的情况
      }
    },
    async getEnvironmentData(params) {
      try {
        const res = await getEnvironmentData(params);
        if (res.code === 0) {
          this.envData.value = res.data;
        } else {
          console.log(res.msg);
        }
      } catch (err) {
        console.error("请求失败", err);
        // 处理请求失败的情况
      }
    },
    async getWaterComData(params) {
      try {
        const res = await getWaterEquipmentComparison(params);
        if (res.code === 0) {
          this.waterComData.value = res.data;
        } else {
          console.log(res.msg);
          this.waterComData.value = null;
        }
      } catch (err) {
        console.error("请求失败", err);
        // 处理请求失败的情况
      }
    },
  },
});
