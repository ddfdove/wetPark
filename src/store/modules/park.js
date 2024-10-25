import { ref } from "vue";
import { defineStore } from "pinia";
import {
  getParkIntroduce
} from "@/api/index";
export const useParkStore = defineStore("park", {
  state: () => ({
    parkIntroduce:{
      title:'海湖湿地',
      introduce:'海湖湿地绿草繁盛、河道蜿蜒、芦苇连片的湿地自然风光格外美丽，吸引了大批游客前来观赏湿地美景。走进海湖湿地公园，我们看到，这里处处呈现出人与鸟儿和谐相处的景象。这里的野生鸟类有黑水鸡、绿头鸭、斑头雁、白骨顶、灰雁、赤麻鸭等；水生植物有芦苇、香蒲、两栖蓼、泽泻、球穗藨草、千屈菜、眼子菜、睡莲、浮萍等。'
     }
   
  }),
  actions: {
    async getParkIntroduce(params) {
      try {
        const res = await getParkIntroduce(params);
        if (res.code === 0) {
          this.parkIntroduce = res.data;
        } else {
          console.log(res.msg);
        }
      } catch (err) {
        console.error("请求失败", err);
        // 处理请求失败的情况
      }
    },
    //  getParkIntroduce  (id)  {
    //     if (id == 1) {
    //       this.parkIntroduce.title = '海湖湿地公园'
    //       this.parkIntroduce.introduce = '海湖湿地绿草繁盛、河道蜿蜒、芦苇连片的湿地自然风光格外美丽，吸引了大批游客前来观赏湿地美景。走进海湖湿地公园，我们看到，这里处处呈现出人与鸟儿和谐相处的景象。这里的野生鸟类有黑水鸡、绿头鸭、斑头雁、白骨顶、灰雁、赤麻鸭等；水生植物有芦苇、香蒲、两栖蓼、泽泻、球穗藨草、千屈菜、眼子菜、睡莲、浮萍等。'
    //     } else if (id == 2) {
    //         this.parkIntroduce.title = '北川湿地公园'
    //         this.parkIntroduce.introduce = '   北川片区依北川河而建，定位为高原水城、夏都花园与文化走廊，致力于构建生态防护、休闲绿地、文化展示等多功能于一体的生态城区，打造特色滨水区和城北活力中心。通过融合历史文化和现代建设，采用海绵城市理念及湿地净化，改善水质，形成多样水系格局，实现水清岸绿、景色宜人的居住和旅游环境。此片区成功吸引了多种候鸟、鱼类栖息，植被丰富，生物多样性显著提升，创造了一个湿润小气候，广受市民好评。'
    //     } else  if(id==3){
    //         this.parkIntroduce.title = '宁湖湿地公园'
    //         this.parkIntroduce.introduce = '    宁湖湿地紧挨湟水，湿地种植的芦苇、香蒲等植物根系发达，除了有环保和观赏价值，还为水鸟提供了安静的栖息环境。盛夏，东方欲晓，宁湖湿地公园从晨曦中醒来，芦苇丛里传来水鸟婉转的啁啾。沿着公园绿道漫步，一路变换风景，前夜的雨水，让这里的空气浸润着青草香和花香，格外清新湿润。'
    //     }else{
    //         this.parkIntroduce.title = '海湖湿地公园'
    //         this.parkIntroduce.introduce = '海湖湿地绿草繁盛、河道蜿蜒、芦苇连片的湿地自然风光格外美丽，吸引了大批游客前来观赏湿地美景。走进海湖湿地公园，我们看到，这里处处呈现出人与鸟儿和谐相处的景象。这里的野生鸟类有黑水鸡、绿头鸭、斑头雁、白骨顶、灰雁、赤麻鸭等；水生植物有芦苇、香蒲、两栖蓼、泽泻、球穗藨草、千屈菜、眼子菜、睡莲、浮萍等。'
    //     }
    //   }
  },
});
