<template>
  <div class="left">
    <panel-board :chTitle="'设备管理'" :enTitle="'Device Management'">
      <div class="table-box">
        <el-popover placement="left-start" :width="400" trigger="click" :show-arrow="false" :offset="400"
          popper-class="popperClass">
          <template #reference>
            <div>
              <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.label" :name="item.name">
                  <el-table :data="tableData" :max-height="500" :header-row-style="headerRowStyle"
                    :header-cell-style="headerCellStyle" :row-style="rowStyle" :cell-style="cellStyle"
                    row-class-name="rowClassName">
                    <el-table-column v-for="(tableItem, index) in item.tableList" :key="index" :prop="tableItem.prop"
                      :label="tableItem.label1" width="160" />
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
          </template>
          <template #default>
            <el-table :data="gridData">
              <el-table-column width="150" property="date" label="date" />
              <el-table-column width="100" property="name" label="name" />
              <el-table-column width="300" property="address" label="address" />
            </el-table>
          </template>
        </el-popover>
      </div>
    </panel-board>
  </div>


</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import PanelBoard from '@/components/panelboard/index.vue'
const handleCommand = (command) => {
  ElMessage(`click on item ${command}`);
};
const activeName = ref("first");
const tabsList = ref([
  {
    label: "气象站",
    name: "first",
    tableList: [
      {
        prop: "garden",
        label1: "园区",
      },
      {
        prop: "area",
        label1: "地区",
      },
      {
        prop: "device",
        label1: "设备(在线/总数)",
      },
    ],
  },
  {
    label: "环境监测",
    name: "second",
  },
  {
    label: "土壤详情",
    name: "third",
  },
  {
    label: "摄像头",
    name: "fourth",
  },
  {
    label: "气温监测",
    name: "fifth",
  },
]);
const tableList2 = ref([
  {
    prop: "garden",
    label: "园区名",
  },
  {
    prop: "collection",
    label: "采集总数",
  },
]);
const tableData = ref([
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
  {
    garden: "梁兴家庭农场",
    area: "沧州市南皮县",
    device: "130/132",
  },
]);
const tableData2 = ref([
  {
    garden: "梁兴家庭农场",
    collection: "1314521",
  },
  {
    garden: "梁兴家庭农场",
    collection: "7788654",
  },
  {
    garden: "梁兴家庭农场",
    collection: "98421365",
  },

  {
    garden: "梁兴家庭农场",
    collection: "99484684654",
  },
  {
    garden: "梁兴家庭农场",
    collection: "沧州市南皮县",
  },
]);
const gridData = ref([
  {
    date: "2016-05-02",
    name: "Jack",
    address: "New York City",
  },
  {
    date: "2016-05-04",
    name: "Jack",
    address: "New York City",
  },
  {
    date: "2016-05-01",
    name: "Jack",
    address: "New York City",
  },
  {
    date: "2016-05-03",
    name: "Jack",
    address: "New York City",
  },
]);
const headerRowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
    fontSize:'16px',
    height:'60px',
  };
};
const headerCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: "0px",
    borderBottom: '1px solid #ffffff',
    border: "none",
  };
};
const rowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
    borderBottom: '1px solid #ffffff',
    fontSize:'16px',
    height:'50px',
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
//table下面有根白线，去掉
:deep(.el-table__inner-wrapper::before) {
  height: 0px;
}


.el-table,
.el-table__expanded-cell {
  margin-left: 10px;
  // height: 400px;
  // background-color: rgb(10, 210, 236);
  background-color: transparent; //这是设置透明背景色
}

.el-dropdown-link {
  width: 160px;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  // text-align: center;
  color: #ffffff;
  font-size: 16px;
  border: 1px solid;
  border-radius: 2px;
}

.left {
  width: 520px;
  height: 600px;
  padding: 20px 10px;
  // margin:0 0 20px 5px;
  position: fixed;
  top: 180px;
  left: 10px;
  background: rgba(0, 102, 255, 0.2);
  // background-color: rgba(0, 163, 255, 0.05);
  border-image: linear-gradient(90deg, rgba(0, 163, 255, 0.04) 0%, rgba(0, 163, 255, 0) 100%) 1;
  opacity: 0.8;

  .table-box {

    color: #ffffff;
    margin: 0 5px 10px 10px;
    padding-left: 15px;
    // margin-left: 15px;
    // margin-bottom: 10px;
    background-color: rgba(0, 163, 255, 0.05);
    // background-color: rgb(24, 86, 218);

    :deep(.demo-tabs) {
      // margin: 0 20px 0 0px;
      // background-color: rgb(24, 86, 218);
      background-color: rgba(0, 0, 0, 0);
      // margin-bottom: 20px;
    }

    :deep(.el-tabs__item) {
      color: #ffffff;
      padding: 0;
      margin-left: 25px;
      margin-bottom: 10px;
      font-size: 18px;
        // margin-right: 10px;
      // height: 26px;
      // width: 70px;
      text-align: center;
      vertical-align: middle;
      //   color: rgb(203,176,89);
      // border: 2px solid rgb(245, 190, 9);
      // border-radius: 5px;
    }

    /**选中 */
    :deep(.el-tabs__item.is-active) {
      color:#428fdf;
    }

    /*去下划线 */
    :deep(.el-tabs__nav-wrap::after) {
      position: static !important;
    }

    // /*去掉切换时el-tab-pane底部的蓝色下划线*/
    // :deep(.el-tabs__active-bar) {
    //   background-color: transparent !important;
    // }
  }
}

:deep(.el-popover.popperClass) {
  background-color: red;
  // position: fixed;
  margin-top: 200px;
  top: 200px;
  left: 400px;
}
</style>