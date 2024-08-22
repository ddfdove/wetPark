<template>
  <div class="panel-container">
    <div class="panel-head">
      <div class="panel-title">
        <img class="bg-img" src="@/assets/images/cut/标题.png">
        <span class="ch-title" v-text="props.chTitle"></span>
        <!-- <span class="en-title" v-text="props.enTitle"></span> -->
      </div>
      <div class="panel-right">
        <slot name="topRight"></slot>
      </div>
    </div>
    <div class="panel-body">
      <slot>默认内容</slot>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
const props = defineProps({
  chTitle: {
    type: [String, null],
    default: "公园简介"
  },
  enTitle: {
    type: [String, null],
    default: "Location detection"
  },
})
</script>
<style lang="less" scoped>
.panel-container {
  margin-bottom: 18px;

  .panel-head {
    display: flex;
    justify-content: space-between;

    .panel-title {
      position: relative;
      padding-left: 38px;
      white-space: nowrap;

      .bg-img {
        position: absolute;
        bottom: -6px;
        left: 0;
      }

      .ch-title {
        font-size: 25px;
        font-family: YouSheBiaoTiHei;
        font-weight: 700;
        line-height: 30px;
        letter-spacing: 2px;
        color: #FFFFFF;
        vertical-align: middle;
      }

      .en-title {
        margin-left: 10px;
        font-size: 10px;
        font-weight: normal;
        line-height: 14px;
        letter-spacing: 2px;
        color: #4DA6FF;
        vertical-align: text-bottom;
        white-space: nowrap;
      }
    }

    .panel-right {}
  }

  .panel-body {
    margin-top: 17px;
  }
}
</style>