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
// export const getMonitorEquipment1=()=>{
//   return http({
//     url: "/api/wp/location/getWpLocationVo1",
//     method: "get",
//   });
// }

//获取水质设备列表
export const getWaterEquipmentList=(params)=>{
  return http({
    url: "/api/wp/EquipmentInformation/getByIdsAndNames",
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
//获取公园介绍
export const getParkIntroduce=(params)=>{
  return http({
    url: "api/wp/park/getWpParkInfoVo",
    method: "get",
    params
  });
}

//获取园区展示监控视频摄像头设备列表单个
export const getCameraEquipment=(params)=>{
  return http({
    url:'api/wp/artemispost/getCamera',
    method:'get'
  })
}
//获取园区展示监控视频摄像头设备列表多个
export const getCameraEquipments=(params)=>{
  return http({
    url:'/api/wp/artemispost/getCameras',
    method:'get'
  })
}


//*****************************园区展示 *********************//
//获取园区展示中间野生动物种类
export const getBirds=()=>{
  return http({
    url:'/api/wp/wpBird/getBirds',
    method:'get'
  })
}
//获取园区展示种群趋势分析
export const getBirdsBybType=()=>{
  return http({
    url:'/api/wp/wpBird/getBirdsBybType',
    method:'get'
  })
}
//获取园区展示中间野生鸟类种类
export const getWildBirds=(params)=>{
  return http({
    url:'/api/wp/artemispost/getShibieVoListAll',
    method:'get',
    params
  })
}




//*****************************监测  人流监测 *********************//
//季度人流
export const getVisitorByji=()=>{
  return http({
    url:'/api/wp/wpRenliu/getRenliusByJi',
    method:'get',
   
  })
}
//获取人流监测人流量
export const getVisitor=()=>{
  return http({
    url:'/api/wp/wpRenliu/getRenlius',
    method:'get',
   
  })
}
//获取人流监测区域人员分布对比
export const getRegionalPersonnel=()=>{
  return http({
    url:'/api/wp/wpRenliu/getRenliusByHour',
    method:'get',
   
  })
}
//获取人流监测人员分布
export const getPersonnelDistribution=()=>{
  return http({
    url:'/api/wp/wpRenliu/getRenliusByRen',
    method:'get',
   
  })
}
//获取人流监测时段排行数据
export const getTimeRank=()=>{
  return http({
    url:'/api/wp/wpRenliu/getRenliusByTime',
    method:'get',
   
  })
}
//获取人流监测园区Top5
export const getGardenTop=()=>{
  return http({
    url:'/api/wp/wpRenliu/getRenliusByTop',
    method:'get',
   
  })
}