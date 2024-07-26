<template>
  <div class="left">
    <panel-board :chTitle="'设备管理'" :enTitle="'Device Management'">
      <div class="table-box">
        <!-- <el-popover
          placement="left-start"
          :width="400"
          trigger="click"
          :show-arrow="false"
          :offset="400"
          popper-class="popperClass"
        >
          <template #reference>
            <div> -->
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.label" :name="item.name">
            <el-table :data="item.data" height="500" :header-row-style="headerRowStyle"
              :header-cell-style="headerCellStyle" :row-style="rowStyle" :cell-style="cellStyle"
              row-class-name="rowClassName">
              <el-table-column type="index" width="80" label="序号" />
              <el-table-column prop="parkNames" label="园区" width="160" />
              <el-table-column prop="parkAttractionNames" label="景区" width="160" />
              <el-table-column prop="device" label="设备(在线/总数)" width="160">
                <template #default="scope">
                  {{ scope.row.onlineNum }}/{{ scope.row.totalNum }}
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <!-- </div>
          </template>
        </el-popover> -->
      </div>
    </panel-board>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import PanelBoard from "@/components/panelboard/index.vue";

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
});

const activeName = ref("");
const tabsList = ref([]);

// Watch for changes in props.dataList
watch(
  () => props.dataList,
  (newValue) => {
    if (Array.isArray(newValue)) {
      tabsList.value = newValue.map((item) => ({
      // tabsList.value = newValue.map((item) => ({
        label: item.name,
        name: item.label,
        data: item.data
         
          // .filter((dataItem) => dataItem.totalNum > 0) // Filter out rows with totalNum equal to 0
          .map((dataItem) => ({
            parkNames: dataItem.parkNames,
            parkAttractionNames: dataItem.parkAttractionNames,
            onlineNum: dataItem.onlineNum,
            totalNum: dataItem.totalNum,
          })),
      }));

      // Set the default active tab to the first item if not already set
      if (tabsList.value.length > 0 && !activeName.value) {
        activeName.value = tabsList.value[0].name;
      }
    }
  },
  { immediate: true }
);

const headerRowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
    fontSize: "16px",
    height: "60px",
  };
};

const headerCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: "0px",
    borderBottom: "1px solid #ffffff",
    border: "none",
  };
};

const rowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
    borderBottom: "1px solid #ffffff",
    fontSize: "16px",
    height: "50px",
  };
};

const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderBottom: "1px dashed #0a559b",
  };
};
</script>

<style scoped lang="less">
// table下面有根白线，去掉
:deep(.el-table__inner-wrapper::before) {
  height: 0px;
}

.el-table,
.el-table__expanded-cell {
  margin-left: 10px;
  background-color: transparent; // 这是设置透明背景色
}

.el-dropdown-link {
  width: 160px;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  color: #ffffff;
  font-size: 16px;
  border: 1px solid;
  border-radius: 2px;
}

.left {
  width: 600px;
  height: 650px;
  padding: 20px 10px;
  position: fixed;
  top: 180px;
  left: 10px;
  background: rgba(0, 102, 255, 0.3);
  opacity: 0.8;

  .table-box {
    color: #ffffff;
    margin: 0 5px 10px 10px;
    padding-left: 15px;
    background-color: rgba(0, 163, 255, 0.05);

    :deep(.demo-tabs) {
      background-color: rgba(0, 0, 0, 0);
    }

    :deep(.el-tabs__item) {
      color: #ffffff;
      padding: 0;
      margin-left: 25px;
      margin-bottom: 10px;
      font-size: 18px;
    }

    :deep(.el-tabs__item.is-active) {
      color: #428fdf;
    }

    :deep(.el-tabs__nav-wrap::after) {
      position: static !important;
    }
  }
}

:deep(.el-popover.popperClass) {
  background-color: red;
  margin-top: 200px;
  top: 200px;
  left: 400px;
}
</style>
