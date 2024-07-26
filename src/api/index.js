import http from "@/utils/http";

//获取水质图表信息
export const getWaterData = (params) => {
  return http({
    url: "/api/wp/watermonitoring/getWpWaterMonitoringVo",
    method: "get",
    params
  });
};
//获取土壤图表信息
export const getSoilData = (params) => {
  return http({
    url: "/api/wp/soilmonitoring/getWpSoilMonitoringVo",
    method: "get",
    params
  });
};
//获取环境图表信息
export const getEnvironmentData = (params) => {
  return http({
    url: "/api/wp/EnvironmentalMonitoring/getWpEnvironmentalMonitoringVo",
    method: "get",
    params
  });
};
//获取双设备对比信息
export const getWaterEquipmentComparison=(params)=>{
  return http({
    url: "/api/wp/watermonitoring/getWpWaterMonitoringVoByWd",
    method: "get",
    params
  });
}
//获取点位监测设备信息
export const getMonitorEquipment=()=>{
  return http({
    url: "/api/wp/location/getWpLocationVo",
    method: "get",
  });
}
//获取水质设备列表
export const getWaterEquipmentList=(params)=>{
  return http({
    url: "api/wp/EquipmentInformation/getByIdsAndNames",
    method: "get",
    params
  });
}
//获取水质设备监测信息
export const getWaterEquMonitorInfo=(data)=>{
  return http({
    url: "/api/wp/EquipmentInformation/waterMonitoringList",
    method: "post",
    data
  });
}
//获取土壤设备监测信息
export const getSoilEquMonitorInfo=(data)=>{
  return http({
    url: "/api/wp/EquipmentInformation/soilMonitoringList",
    method: "post",
    data
  });
}
//获取环境设备监测信息
export const getEnvEquMonitorInfo=(data)=>{
  return http({
    url: "/api/wp/EquipmentInformation/environmentalMonitoringList",
    method: "post",
    data
  });
}