// 找到 isExcellent 对应的项目
export const keyMap = {
  waterPHList: "water_ph",
  waterDissolvedOxygenList: "dissolved_oxygen",
  waterTurbidityList: "turbidity",
  waterTemperatureList: "water_temperature",
  waterChlorophyllList: "chlorophyll",
  waterConductivityList: "water_conductivity",
  soilPHList: "ph_level",
  soilTemperatureList: "soil_temperature",
  soilMoistureList: "soil_moisture",
  soilConductivityList: "conductivity",
  soilNitrogenList: "nitrogen_content",
  soilPhosphorusList: "phosphorus_content",
  soilPotassiumList: "potassium_content",
  airTemperatureList: "air_temperature",
  airHumidityList: "air_humidity",
  atmosphericPressureList: "atmospheric_pressure",
  carbonDioxideList: "carbon_dioxide",
  sulfurDioxideList: "sulfur_dioxide",
  totalRadiationList: "total_radiation",
  windDirectionList: "wind_direction",
  windSpeedList: "wind_speed",
  rainfallList: "rainfall",
  pm25List: "pm2_5",
};

// 定义颜色映射
export const colorMap = {
  waterPHList: "#1dc36a",
  waterDissolvedOxygenList: "#00eaff",
  waterTurbidityList: "#0091ff",
  waterTemperatureList: "#1dc36a",
  waterChlorophyllList: "#00eaff",
  waterConductivityList: "#0091ff",
  soilPHList: "#0091ff",
  soilTemperatureList: "#00eaff",
  soilMoistureList: "#0091ff",
  soilConductivityList: "#1dc36a",
  soilNitrogenList: "#0091ff",
  soilPhosphorusList: "#0091ff",
  soilPotassiumList: "#0091ff",
  airTemperatureList: "#00eaff",
  airHumidityList: "#0091ff",
  atmosphericPressureList: "#1dc36a",
  carbonDioxideList: "#00eaff",
  sulfurDioxideList: "#0091ff",
  totalRadiationList: "#1dc36a",
  windDirectionList: "#00eaff",
  windSpeedList: "#0091ff",
  rainfallList: "#1dc36a",
  pm25List: "#00eaff",
};

//定义series中name中文名映射
export const keyToChineseMap = {
  waterPHList: "水PH值",
  waterDissolvedOxygenList: "溶解氧值",
  waterTurbidityList: "浊度",
  waterTemperatureList: "水温",
  waterChlorophyllList: "叶绿素",
  waterConductivityList: "水电导率",
  soilPHList: "土壤PH值",
  soilTemperatureList: "温度",
  soilMoistureList: "湿度",
  soilConductivityList: "土壤电导率",
  soilNitrogenList: "氮含量",
  soilPhosphorusList: "土壤磷含量",
  soilPotassiumList: "土壤钾含量",
  airTemperatureList: "空气温度",
  airHumidityList: "空气湿度",
  atmosphericPressureList: "气压",
  carbonDioxideList: "二氧化碳",
  sulfurDioxideList: "二氧化硫",
  totalRadiationList: "总辐射",
  windDirectionList: "风向",
  windSpeedList: "风速",
  rainfallList: "降雨量",
  pm25List: "PM2.5",
};
//定义各项指标的单位
export const unitMap = {
  '水PH值': 'pH',
  'PH值': 'pH',
  '溶解氧值': 'mg/L',
  '溶解氧': 'mg/L',
  '浊度': 'NTU',
  '水温': '℃',
  '叶绿素': 'μg/L',
  '水电导率': 'μS/cm',
  '电导率': 'μS/cm',
  '土壤PH值': 'pH',
  '温度': '℃',
  '湿度': '%',
  '土壤电导率': 'μS/cm',
  '氮含量': 'mg/kg',
  '壤磷含量': 'mg/kg',
  '壤钾含量': 'mg/kg',
  '空气温度': '℃',
  '空气湿度': '%',
  '气压': 'hPa',
  '二氧化碳': 'ppm',
  '二氧化硫': 'ppm',
  '总辐射': 'W/m²',
  '风向': '°',
  '风速': 'm/s',
  '降雨量': 'mm',
  'PM2.5': 'μg/m³'
};
//定义数据的指标
export const getIndicators = (baseKey, value, min, max, status) => {
  switch (baseKey) {
    case "waterDissolvedOxygenList":
      // 水溶解氧值: 小于最小值为差，大于最大值为优，否则为良
      if (value < min) {
        status.value = "差";
      } else if (value > max) {
        status.value = "优";
      } else {
        status.value = "良";
      }
      break;
    case "waterTurbidityList":
      // 浊度: 小于最小值为优，大于最大值为差，否则为良
      if (value < min) {
        status.value = "优";
      } else if (value > max) {
        status.value = "差";
      } else {
        status.value = "良";
      }
      break;
    case "waterConductivityList":
      // 水电导率: 小于最小值为差，大于最大值为优，否则为良
      if (value > min && value < max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "waterTemperatureList":
      // 水温: 在最小值和最大值之间为优，否则为差
      if (value > min && value < max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "waterChlorophyllList":
      // 叶绿素: 大于最小值小于最大值优，否则为良
      if (value < min) {
        status.value = "良";
      } else if (value > max) {
        status.value = "差";
      } else {
        status.value = "良";
      }
      break;
    case "waterPHList":
      // 水PH值,大于最小值小于最大值优，否则为良
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;

    case "soilTemperatureList":
      // 土壤温度: 大于最小值小于最大值优，否则为差
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "soilMoistureList":
      // 土壤湿度: 小于最小值为差，大于最大值为优，否则为良
      if (value < min) {
        status.value = "差";
      } else if (value > max) {                         
        status.value = "优";
      } else {
        status.value = "良";
      }
      break;
    case "soilConductivityList":
      // 土壤电导率: 大于最小值小于最大值优，否则为差
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "soilNitrogenList":
      // 氮含量: 大于最小值小于最大值优，否则为差
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "soilPhosphorusList":
      // 磷含量: 大于最小值小于最大值优，否则为差
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "soilPotassiumList":
      // 钾含量: 大于最小值小于最大值优，否则为差
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "soilPHList":
      // 土壤PH值: 大于最小值小于最大值优，否则为差
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;

    case "airTemperatureList":
      // 空气温度: 小于最小值为差，大于最大值为优，否则为良
      if (value >= min && value <= max) {
        status.value = "优";
        
      } else {
        status.value = "差";
      }
      break;
    case "airHumidityList":
      // 空气湿度: 小于最小值为差，大于最大值为优，否则为良
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "atmosphericPressureList":
      // 气压: 小于最小值为差，大于最大值为优，否则为良
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "pm25List":
      // PM2.5: 小于最小值为差，大于最大值为优
      if (value < min) {
        status.value = "优";
      } else if (value > max) {
        status.value = "差";
      } else {
        status.value = "良";
      }
      break;
    case "carbonDioxideList":
      // 二氧化碳: 小于最小值为优，大于最大值为差，否则为良
      if (value < min) {
        status.value = "优";
      } else if (value > max) {
        status.value = "差";
      } else {
        status.value = "良";
      }
      break;
    case "sulfurDioxideList":
      // 二氧化硫: 小于最小值为优，大于最大值为差，否则为良
      if (value < min) {
        status.value = "优";
      } else if (value > max) {
        status.value = "差";
      } else {
        status.value = "良";
      }
      break;
    case "totalRadiationList":
      // 总辐射: 小于最小值为差，大于最大值为优，否则为良
      if (value < min) {
        status.value = "差";
      } else if (value > max) {
        status.value = "优";
      } else {
        status.value = "良";
      }
      break;
    case "windDirectionList":
      // 风向: 小于最小值为差，大于最大值为优，否则为良
      if (value < min) {
        status.value = "优";
      } else if (value > max) {
        status.value = "优";
      } else {
        status.value = "优";
      }
      break;
    case "windSpeedList":
      // 风速: 小于最小值为差，大于最大值为优，否则为良
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    case "rainfallList":
      // 降雨量: 小于最小值为差，大于最大值为优，否则为良
      if (value >= min && value <= max) {
        status.value = "优";
      } else {
        status.value = "差";
      }
      break;
    default:
      // 默认状态为良
      status.value = "良";
  }

  return status.value;
 
};
//定义日期格式化函数和
export const formatDate = (date) => {
  const dateTimeParts = date.split(' '); // 拆分日期和时间部分
  const dateParts = dateTimeParts[0].split('-'); // 拆分日期部分
  
  if (dateParts.length === 1) {
    // 只有年份的情况，如 "2024"
    return date;
  } else if (dateParts.length === 2) {
    // 只有年月的情况，如 "2024-07"
    return date;
  } else if (dateParts.length === 3) {
    // 完整日期的情况，如 "2024-07-02" 或 "2024-07-02 00:00"
    const [year, month, day] = dateParts;
    const formattedDate = `${parseInt(month)}月${parseInt(day)}日`;
    
    if (dateTimeParts.length > 1) {
      // 包含时间部分
      const timePart = dateTimeParts[1];
      const [hours, minutes] = timePart.split(':');
      
      if (minutes) {
        // 完整时间 "00:00"
        return `${formattedDate} ${hours}:${minutes}`;
      } else {
        // 只有小时 "00" 或 "14"
        return `${formattedDate} ${hours}点`;
      }
    } else {
      // 不包含时间部分
      return formattedDate;
    }
  } else {
    // 不符合任何预期格式的情况，返回原日期字符串
    return date;
  }
}
