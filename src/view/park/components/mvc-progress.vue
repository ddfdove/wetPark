<template>
  <div class="group-progress">
    <div class="progress-item" v-for="(item,index) in newList" :key="index">
      <div class="progress-name" v-text="item.name"></div>
      <div class="progress-bar">
        <el-progress :percentage="item.rate" :color="'linear-gradient(270deg, #3981D4 13%, #2861AF 72%)'"  :show-text="false"/>
      </div>
      <div class="progress-num" v-text="item.value"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted ,computed} from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
const props = defineProps({
  name: {
    type: [String, null],
    default: ""
  },
  dataList: {
    type: [Array, null],
    default(){return []}
  },
})
const newList = computed(() => {
  let list=props.dataList;
  if (list.length === 0) return []; // 如果 list 为空，直接返回空数组
  let max=list.reduce((a,b)=>{
    if(a.value>b.value)return a;
    else return b;
  },{ value: 0 })    
  list.forEach(item=>{
    item.rate=(item.value/max.value)*100;
  })
  return list;
})
 

</script>
<style lang="less" scoped>
.group-progress{
  // border:1px solid red;
  // min-height:50px;
  height:100%;
  width:100%;
  .progress-item{
    width:100%;
    display: flex;
    align-items: center;
    margin-bottom:10px;
    .progress-name{
      width: 85.42px;
      line-height: 28px;
      color:#fff;
      text-align: center;
      border-radius:26px;
      background: #5397F4;
    }
    &:nth-of-type(1) .progress-name{
      background: linear-gradient(281deg, #B126BA 12%, #9353F4 71%);
    }
    &:nth-of-type(2) .progress-name{
      background: #484CE3;
    }
    
    .progress-bar{
      flex:1 1 auto;
      margin:0 10px 0 15px;
      ::v-deep{
        .el-progress-bar__outer{
          background: #254B87;
        }
      }
    }
    .progress-num{
      width:26px;
      color:#fff;
      font-size:16px;
    }
  }
}
</style>
  