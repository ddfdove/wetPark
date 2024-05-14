<template>
 <ul id="left">
    <li>
      <el-popover placement="left-start" :width="400" trigger="click" :show-arrow="false" :offset="400"
        popper-class="popperClass">
        <template #reference>
          <div>
            <h3 style="
                padding: 15px 0 15px 60px;
                font-size: 16px;
                margin-bottom: 10px;
              ">
              数据采集
            </h3>
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.label" :name="item.name">
                <el-table :data="tableData" :max-height="240" :header-row-style="headerRowStyle"
                  :header-cell-style="headerCellStyle" :row-style="rowStyle" :cell-style="cellStyle">
                  <el-table-column v-for="(tableItem, index) in item.tableList" :key="index" :prop="tableItem.prop"
                    :label="tableItem.label1" width="140" />
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
    </li>
    <li>
      <h3 style="padding: 15px 0 15px 60px; font-size: 16px; margin-bottom: 10px">
        数据采集
      </h3>
      <el-table :data="tableData2" :max-height="260" :header-row-style="headerRowStyle"
        :header-cell-style="headerCellStyle" :row-style="rowStyle" :cell-style="cellStyle">
        <el-table-column v-for="(tableItem, index) in tableList2" :key="index" :prop="tableItem.prop"
          :label="tableItem.label" width="250" />
        <!-- <el-table-column prop="area" label="地区" width="140" />
                            <el-table-column prop="device" label="设备(在线/总数)" /> -->
      </el-table>
    </li>
    <li style="background-color: rgb(18, 39, 57); opacity: 1">
      <p style="
          font-size: 22px;
          font-weight: 500;
          color: rgb(60, 191, 223);
          margin: 0 0 10px 30px;
        ">
        地点检测
      </p>
      <div class="top" style="display: flex; margin-bottom: 30px">
        <div class="tLeft" style="flex: 1">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <span style="margin-right: 50px">西岸5号</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">Action 1</el-dropdown-item>
                <el-dropdown-item command="b">Action 2</el-dropdown-item>
                <el-dropdown-item command="c">Action 3</el-dropdown-item>
                <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="tRight" style="flex: 1; border: 1px solid; border-radius: 2px">
          <span style="margin-left: 40px; line-height: 30px">4/30</span>
          <span style="margin-left: 40px; line-height: 30px">.</span>
          <span style="margin-left: 40px; line-height: 30px">5/30</span>
        </div>
      </div>
      <div id="animal">
        <ul style="display: flex">
          <li>
            <h3 style="margin-bottom: 10px">斑嘴鸭</h3>
            <span style="margin-left: 20px">2只</span>
          </li>
          <li>
            <h3 style="margin-bottom: 10px">白鹭</h3>
            <span style="margin-left: 20px">6只</span>
          </li>
          <li>
            <h3 style="margin-bottom: 10px">骨顶鸡</h3>
            <span style="margin-left: 20px">4只</span>
          </li>
        </ul>
        <div style="padding: 0 10px 0 20px">
          <span>
            <h3 style="margin-bottom: 10px">动物</h3>
            <span style="margin-left: 20px">1只</span>
          </span>
          <span>
            <h3 style="margin-bottom: 10px">鸟</h3>
            <span style="margin-left: 20px">9只</span>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
 import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
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
    label: "孢子虫情",
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
  };
};
const headerCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: "0px",
    // borderBottom: '1px solid rgb(8, 171, 238)'
    border: "none",
  };
};
const rowStyle = ({ row, rowIndex }) => {
  return {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
  };
};
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
  return {
    // padding: '0px',
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
  };
};
</script>

<style scoped lang="less">
//table下面有根白线，去掉
/deep/.el-table__inner-wrapper::before {
  height: 0px;
}

.el-table,
.el-table__expanded-cell {
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

#left {
  width: 500px;
  height: 930px;
  // margin:0 0 20px 5px;
  position: fixed;
  top: 80px;
  left: 10px;
  background-color: rgb(43, 58, 68);
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  #animal {
    background-color: rgb(18, 39, 57);

    // color: rgb(44,95,102);
    ul {
      display: flex;
      padding: 0 10px 0 10px;
      margin-bottom: 10px;

      // flex-wrap: wrap;
      li {
        width: 130px;
        height: 80px;
        margin-right: 10px;
        padding: 10px 0px 0 30px;
        // border: 2px solid #13ecf3;
        border: 2px solid rgb(44, 95, 102);
        background-color: rgb(17, 39, 57);
        border-radius: 5px;
      }
    }

    div>span {
      display: inline-block;
      width: 130px;
      height: 80px;
      margin-right: 20px;
      padding: 10px 0px 0 30px;
      border: 2px solid rgb(44, 95, 102);
      border-radius: 5px;
    }
  }

  // font-size: 28px;
  li {
    flex: 1;
    // color: rgb(229, 239, 250);
    color: #ffffff;
    margin: 0 5px 10px 10px;
    padding-left: 15px;
    // margin-left: 15px;
    // margin-bottom: 10px;
    background-color: rgb(47, 81, 157);
    // background-color: rgb(24, 86, 218);

    ::v-deep .demo-tabs {
      margin: 0 20px 0 0px;
      // background-color: rgb(24, 86, 218);
      background-color: rgb(47, 81, 157);

      ::v-deep .el-table__inner-wrapper::before {
        height: 0px;
        background-color: transparent; //这是设置透明背景色
      }
    }

    ::v-deep .el-tabs__item {
      color: #ffffff;
      padding: 0;
      margin-left: 15px;
      //   margin-right: 10px;
      height: 26px;
      width: 70px;
      text-align: center;
      vertical-align: middle;
      //   color: rgb(203,176,89);
      border: 2px solid rgb(245, 190, 9);
      border-radius: 5px;
    }

    /**选中 */
    ::v-deep .el-tabs__item.is-active {
      color: rgb(243, 197, 45);
    }

    /*去下划线 */
    ::v-deep .el-tabs__nav-wrap::after {
      position: static !important;
    }

    /*去掉切换时el-tab-pane底部的蓝色下划线*/
    ::v-deep .el-tabs__active-bar {
      background-color: transparent !important;
    }
  }
}
/deep/.el-popover.popperClass {
  background-color: red;
  // position: fixed;
  margin-top: 200px;
  top: 200px;
  left: 400px;
}
</style>