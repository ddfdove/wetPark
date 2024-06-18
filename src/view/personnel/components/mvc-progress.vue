<template>
  <div class="group-progress">
    <div class="progress-item" v-for="(item,index) in newList" :key="index">
      <div class="progress-desc">
        <div class="progress-name" v-text="item.name"></div>
        <div class="progress-num" v-text="item.value"></div>
      </div>
      <div class="progress-bar">
        <el-progress :percentage="item.rate"   :show-text="false"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted ,computed} from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
const props = defineProps({
  list: {
    type: [Array, null],
    default(){return []}
  },
})
const newList = computed(() => {
  let list=props.list;
  let max=list.reduce((a,b)=>{
    if(a.value>b.value)return a;
    else return b;
  })    
  list.forEach(item=>{
    item.rate=(item.value/max.value)*100;
  })
  return list;
})
 

</script>
<style lang="less" scoped>
.group-progress{
  // border:1px solid red;
  min-height:50px;
  width:100%;
  .progress-item{
    width:100%;
    margin-bottom:65px;
    width:100%;
    .progress-desc{
      display: flex;
      justify-content: space-between;
      .progress-name{ 
       font-size:20px;
       color: #E1E8F1;
      } 
      .progress-num{
        color: #FFFAF9;
        font-size:25px;
      }
    }
    .progress-bar{
      margin-top:15px;
      ::v-deep{
        .el-progress-bar__outer{
          background: #254B87;
          overflow: visible;
        }
        .el-progress-bar__inner{
          background:linear-gradient(270deg, #0052FF 0%, rgba(108, 155, 255, 0) 100%);
          &::after{
            content:"";
            width: 12px;
            height: 12px;
            background: #6C9BFF;
            box-shadow: 0 0 11px 0 #6C9BFF;
            border-radius: 50%;
            position:absolute;
            top:-4px;
            right:0;
          }
        }
      }
    }
  }
}
</style>
  