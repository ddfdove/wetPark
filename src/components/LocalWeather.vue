<template>
    <div class="flex-center">
        <!-- <skycon v-if="iconCondition" :condition="iconCondition" color="white" size="40" /> -->
        <!-- <Skycon :condition="iconCondition"  size="128" color="orangered" paused  /> -->
        <div v-if="iconCondition">
            <span>{{ weather.temperature }}℃</span>
            <span>{{ weather.weather }}</span>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import Skycon from "vue3-skycons";
import { ref, onMounted } from 'vue';

const key = ref('f89095713ad2705c9308afbe0e535127');
const weather = ref({}); // 用于存放天气相关的数据
const iconCondition = ref(null); // icon值

onMounted(() => {
    getLocationInfo();
});

// 获取用户位置信息
const getLocationInfo = async () => {
    const params = {
        key: key.value,
    };
    try {
        const { data } = await axios.get('https://restapi.amap.com/v3/ip', { params });
        // data.adcode值为获取天气需要的city值
        getWeather(data.adcode);
    } catch (error) {
        console.error('获取位置信息失败', error);
    }
};

// 获取天气详情
const getWeather = async (adcode) => {
    const params = {
        key: key.value,
        city: adcode,
    };
    try {
        const { data } = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', { params });
        if (data.lives && data.lives.length > 0) {
            weather.value = data.lives[0];
            iconCondition.value = setWeatherIcon(data.lives[0]?.weather);
        }
    } catch (error) {
        console.error('获取天气信息失败', error);
    }
};

// 设置icon
const setWeatherIcon = (weather) => {
    // 只处理了基础的天气，可以继续精细化处理
    if (weather === '晴') {
        return 'clear-day';
    } else if (weather.includes('云')) {
        return 'partly-cloudy-day';
    } else if (weather.includes('风')) {
        return 'wind';
    } else if (weather.includes('雨')) {
        return 'rain';
    } else if (weather.includes('雪')) {
        return 'snow';
    } else if (weather.includes('雾')) {
        return 'fog';
    }
    return 'cloudy';
};
</script>

<!-- <style scoped>
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.font-22 {
    font-size: 22px;
}
</style> -->