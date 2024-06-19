<template>
  <div class="container">
    <ul class="left">
      <li>
        <panelboard :chTitle="'土壤监测'" :enTitle="'Soil monitoring'">
          <div class="soil">
            <SoilChart></SoilChart>
          </div>
        </panelboard>
      </li>
      <li>
        <panelboard :chTitle="'水文监测'" :enTitle="'Hydrological monitoring'">
          <div class="hydrology">
            <HydrologyChart></HydrologyChart>
          </div>
        </panelboard>
      </li>
      <li>
        <panelboard :chTitle="'水质监测'" :enTitle="'Water quality monitoring'">
          <div class="water">
            <WaterChart></WaterChart>
          </div>
        </panelboard>
      </li>
    </ul>
    <div class="middle">
      <div class="mTop">
        <img src="/cut/wind.png" alt="">
      </div>
      <div class="mBottom">
        <panel-board :chTitle="'设备'" :enTitle="'Equipment'">
          <div class="table-border">
            <el-table :data="tableData" :max-height="400" :header-row-style="headerRowStyle"
              :header-cell-style="headerCellStyle" :row-style="rowStyle" :cell-style="cellStyle"
              row-class-name="rowClassName">
              <el-table-column v-for="(tableItem, index) in tableList" :key="index" :prop="tableItem.prop"
                :label="tableItem.label1" width="160" />
            </el-table>
          </div>
        </panel-board>
      </div>
    </div>
    <ul class="right">
      <li>
        <panelboard :chTitle="'大气湿度'" :enTitle="'Atmospheric humidity'">
          <div class="soil">
            <SoilChart></SoilChart>
          </div>
        </panelboard>

      </li>
      <li>
        <panelboard :chTitle="'风力风向'" :enTitle="'Wind force and direction'">
          <div class="hydrology" style="padding-left: 40px;">
            <WindChart></WindChart>
          </div>
        </panelboard>
      </li>
      <li>
        <panelboard :chTitle="'降雨量'" :enTitle="'Rainfall'">
          <div class="water">
            <SoilChart></SoilChart>
          </div>
        </panelboard>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SoilChart from './LeftChart/soil.vue'
import HydrologyChart from './LeftChart/hydrology.vue'
import WaterChart from './LeftChart/water.vue'
import WindChart from './RightChart/wind.vue'
import TleftChart from './MiddleChart/tLeft.vue'
import TrightChart from './MiddleChart/tRighr.vue'
import BleftChart from './MiddleChart/bLeft.vue'
import BrightChart from './MiddleChart/bRight.vue'
import panelboard from "../../components/panelboard/index.vue"

const tableList = ref([
  {
    prop: "garden",
    label1: "园区",
  },
  {
    prop: "area",
    label1: "地区",
  },
  {
    prop: "landArea",
    label1: "占地",
  },
  {
    prop: "device",
    label1: "设备(在线/总数)",
  },
  {
    prop: "device",
    label1: "操作",
  },
]);
const tableData = ref([
  {
    garden: "海湖湿地游乐园",
    area: "西宁市城西区",
    device: "130/132",
    landArea:'1836.45亩'
  },
  {
    garden: "海湖湿地游客中心",
    area: "西宁市城西区",
    device: "130/132",
    landArea:'1836.45亩'
  },
  {
    garden: "海湖湿地双湖",
    area: "西宁市城西区",
    device: "130/132",
    landArea:'1836.45亩'
  },
  {
    garden: "海湖湿地游乐园",
    area: "西宁市城西区",
    device: "130/132",
    landArea:'1836.45亩'
  },
  {
    garden: "海湖湿地游乐园",
    area: "西宁市城西区",
    device: "130/132",
    landArea:'1836.45亩'
  },
  
]);
const headerRowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "#428fdf",
    height:'60px',
    fontSize:'18px'
    
  };
};
const headerCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: "0px",
    borderBottom: '1px solid #ffffff',
    border: "none",
    width:'160px'
    
  };
};
const rowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
    borderBottom: '1px solid #ffffff',
    height:'60px',
    fontSize:'16px'
  };
};
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    // padding: '0px',
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderBottom: '1px dashed #0a559b',
  };
};

</script>

<style scoped lang="less">
.container {
  display: flex;
  // padding: 20px;
  height: 100%;
  background-color: #030025;

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
      flex: 1;
      padding: 10px
    }
  }

  .middle {
    flex: 1.5;
    display: flex;
    flex-direction: column;

    // padding: 20px 0 20px 20px;
    .mTop {
      flex: 1;

      img {
        width: 900px;
        height: 500px;
        padding: 30px 20px 0 20px;

      }

      // display: flex;
      // margin-top: 50px;
      // li{
      //   flex:1;
      // }
    }

    .mBottom {
      flex: 1;
      padding: 30px 20px 0 20px;

      .table-border {
        margin-top: 10px;
        // padding: 10px;
        padding-top: 20px;
        height: 425px;
       
        background-color: #030632;
        border: 1px solid #021f66;
      }

      .el-table {
        margin-left: 50px;
        width: 820px;
        // height: 300px;
        // background-color: rgb(10, 210, 236);
        background-color: transparent; //这是设置透明背景色
      }
      // .el-table::before {
      //   content: "";
      //   display: block;
      //   height: 20px; /* 设置表头和表项之间的距离 */
      // }

      :deep(.el-table__inner-wrapper::before) {
        height: 0px;
        background-color: transparent; //这是设置透明背景色
      }

      // display: flex;
      // margin-top: 140px;
      // li{
      //   flex:1;
      // }
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
      flex: 1;
      padding: 10px
    }
  }
}
</style>