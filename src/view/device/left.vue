<template>
  <div class="left">
    <!-- <div class="errEqui" @click="handleAbnormalDevicesClick">
      <el-tooltip :content="abnormalDevicesTooltip" placement="right">
        <div class="icon-container">
          <i v-if="abnormalDevicesCount > 0" class="iconfont icon-yichangshebei">
            <span class="badge">{{ abnormalDevicesCount }}</span>
          </i>
          <i v-else class="iconfont icon-zhengchangshebei"></i>
        </div>
      </el-tooltip>
    </div> -->
    <panel-board :chTitle="'设备管理'" :enTitle="'Device Management'">
      <div class="table-box">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.label" :name="item.name">
            <el-table :data="item.data" height="500" :header-row-style="headerRowStyle"
              :header-cell-style="headerCellStyle" :row-style="rowStyle" :cell-style="cellStyle"
              row-class-name="rowClassName">
              <el-table-column type="index" width="80" label="序号" />
              <el-table-column v-if="item.name !== 'tv'" prop="parkNames" label="园区" width="160" />

              <el-table-column v-if="item.name !== 'tv'" prop="parkAttractionNames" label="地点" width="160" />
              <el-table-column v-if="item.name !== 'tv'" prop="device" label="设备" width="160">
                <template #default="scope">
                 {{ scope.row.totalNum }}
                </template>
              </el-table-column>
              <el-table-column v-if="item.name === 'tv'" prop="cameraName" label="监控点名称" width="160" />
              <el-table-column v-if="item.name === 'tv'" prop="latitude" label="纬度" width="120" />
              <el-table-column v-if="item.name === 'tv'" prop="longitude" label="经度" width="120" />
              <el-table-column v-if="item.name === 'tv'" prop="status" label="状态" width="120">
                <template #default="scope">
                  {{ scope.row.status == 'null' ? '在线' : scope.row.status }}
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </panel-board>
    <el-dialog ref="dialogRef" v-model="isDialogVisible" title="异常设备列表" style="width: 750px;">
      <el-table :data="abnormalDevicesList" :max-height="maxTableHeight" style="width:100%;">
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="devicesName" label="设备名称" width="100" />
        <el-table-column prop="devicesType" label="设备类型" width="120" />
        <el-table-column prop="parkNames" label="园区" width="150" />
        <el-table-column prop="parkAttractionNames" label="景区" width="150" />
        <el-table-column prop="reason" label="异常原因" width="100" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from "vue";
import PanelBoard from "@/components/panelboard/index.vue";

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
});

const activeName = ref("");
const tabsList = ref([]);
const abnormalDevicesList = ref([]);
const isDialogVisible = ref(false);
const dialogRef = ref(null);
const maxTableHeight = ref(300); // 默认最大高度
// Watch for changes in props.dataList
watch(
  () => props.dataList,
  (newValue) => {
    if (Array.isArray(newValue)) {
      console.log('dataList', newValue);
      tabsList.value = newValue.map((item) => {
        if (item.label === "tv") {
          console.log('对吗', item.label === "tv");
          // 处理 "camera" 选项卡的数据
          return {
            label: item.name,
            name: item.label,
            data: item.tvdata.map((dataItem) => ({
              cameraIndexCode: dataItem.cameraIndexCode,
              cameraName: dataItem.cameraName,
              latitude: dataItem.latitude,
              longitude: dataItem.longitude,
              status: dataItem.status,
            })),
          };
        } else {
          // 处理其他选项卡的数据
          return {
            label: item.name,
            name: item.label,
            data: item.data.map((dataItem) => ({
              parkNames: dataItem.parkNames,
              parkAttractionNames: dataItem.parkAttractionNames,
              onlineNum: dataItem.onlineNum,
              totalNum: dataItem.totalNum,
              detail: dataItem.detail,
            })),
          };
        }
      });
      console.log('tabsList.value', tabsList.value);
      // 设置默认激活的选项卡，如果未设置
      if (tabsList.value.length > 0 && !activeName.value) {
        activeName.value = tabsList.value[0].name;
      }

      // 更新异常设备列表
      updateAbnormalDevicesList();
    }
  },
  { immediate: true }
);
// 更新异常设备列表
const updateAbnormalDevicesList = () => {
  abnormalDevicesList.value = [];
  // 状态映射
  const statusMap = {
    'Active': '正常',
    'Inactive': '不在线',
    'UnderMaintenance': '维修中',
    'Failed': '故障',
  };
  tabsList.value.forEach((tab) => {
    tab.data.forEach((device) => {
      if (device.onlineNum < device.totalNum) {
        const abnormalDevices = device.detail.filter((d) => d.status !== "Active");
        console.log('abnormalDevices', abnormalDevices);
        abnormalDevices.forEach((abnormalDevice) => {
          abnormalDevicesList.value.push({
            devicesName: abnormalDevice.devicesName,
            devicesType: `${tab.label}设备`,
            parkNames: device.parkNames,
            parkAttractionNames: device.parkAttractionNames,
            reason: statusMap[abnormalDevice.status] || "未知状态", // 根据状态映射转换为中文
          });
        });
        console.log('abnormalDevicesList', abnormalDevicesList.value);
      }
    });
  });
};
// 计算属性：异常设备数量
const abnormalDevicesCount = computed(() => {
  return abnormalDevicesList.value.length;
});

// 计算属性：异常设备提示框内容
const abnormalDevicesTooltip = computed(() => {
  return abnormalDevicesCount.value > 0 ? `有 ${abnormalDevicesCount.value} 台设备异常` : "所有设备正常";
});

// 点击事件：显示异常设备列表弹出框
const handleAbnormalDevicesClick = () => {
  if (abnormalDevicesCount.value > 0) {
    isDialogVisible.value = true;
  }
  console.log('isDialogVisible.value', isDialogVisible.value);
};

//表格样式
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
// 监听 isDialogVisible 的变化
watch(isDialogVisible, async (newVal) => {
  if (newVal) {
    await nextTick(); // 等待 DOM 更新完成
    if (dialogRef.value) {
      const dialogHeight = dialogRef.value.clientHeight;
      // 设置表格的最大高度为对话框高度减去标题栏高度和其他边距
      maxTableHeight.value = dialogHeight - 60; // 假设标题栏高度为60px
    }
  }
});
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
  width: 630px;
  height: 650px;
  padding: 20px 10px;
  position: fixed;

  top: 180px;
  left: 10px;
  background: rgba(0, 102, 255, 0.3);
  opacity: 0.8;

  .errEqui {
    position: absolute;
    right: 80px;
    top: 15px;

    .icon-container {
      position: relative;

      .badge {
        position: absolute;
        top: -15px;
        /* 根据需要调整位置 */
        right: -10px;
        /* 根据需要调整位置 */
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 2px 5px;
        font-size: 12px;
        display: inline-block;
        /* 确保badge显示为块级元素 */
      }
    }

    .iconfont.icon-zhengchangshebei {
      font-size: 30px;
      color: green;
    }

    .iconfont.icon-yichangshebei {
      font-size: 30px;
      color: red;
      /* 修改颜色以匹配设计 */
    }
  }

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
