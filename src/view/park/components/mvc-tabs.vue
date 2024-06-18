<template>
  <div class="tabs">
        <div class="tabs-btn-group">
          <button :class="data.index==index?'active':''" v-for="(item,index) in menus" :key="index" v-text="item.name" @click="tabsClick(item,index)"></button> 
        </div>
        <template v-for="(item,index) in menus" :key="index">
          <div class="tabs-panel" v-if="data.index==index"> 
            <slot :name="item.panel"></slot>
          </div>
        </template>
       </div>
</template>
<script setup>
import { ref, onMounted ,computed,reactive} from "vue";
import { useRoute } from "vue-router";
const emit = defineEmits(['tabsClick'])
const props = defineProps({
  menus: {
    type: [Array, null],
    default(){return []}
  },
})

const data=reactive({
  index:0,
});
// const newList = computed(() => { })
const tabsClick=(item,index)=>{
  data.index=index;
  emit('submit',item)
}

</script>
<style lang="less" scoped>
.tabs{
      .tabs-btn-group{
      display: flex;
      button{
        background: linear-gradient(180deg, rgba(0, 35, 88, 0.3) 3%, rgba(0, 15, 45, 0.3) 100%);
        box-sizing: border-box;
        font-size:16px;
        color:#fff;
        border:0;
        padding:10px 0;
        margin-right:28px;
        cursor: pointer;
        &.active{
          color: #4DA6FF;
          border-bottom: 3px solid #4DA6FF;
        }
      }
      }
      .tabs-panel{
        margin-top:20px;
        border:1px dashed grey;
        height: 284.42px;
        width:100%;
      }
    }
</style>
  