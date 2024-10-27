import { ref } from "vue";
import { defineStore } from "pinia";
import { getParkIntroduce } from "@/api/index";

export const useParkStore = defineStore("park", {
  state: () => ({
    parkId: Number(localStorage.getItem("parkId")) || 1, // 从 localStorage 获取
    parkIntroduce: JSON.parse(localStorage.getItem("parkIntroduce")) ||{
      title: '海湖湿地',
      introduce: '海湖湿地绿草繁盛、河道蜿蜒、芦苇连片的湿地自然风光格外美丽，吸引了大批游客前来观赏湿地美景。走进海湖湿地公园，我们看到，这里处处呈现出人与鸟儿和谐相处的景象。这里的野生鸟类有黑水鸡、绿头鸭、斑头雁、白骨顶、灰雁、赤麻鸭等；水生植物有芦苇、香蒲、两栖蓼、泽泻、球穗藨草、千屈菜、眼子菜、睡莲、浮萍等。'
    }
  }),
  actions: {
    setParkId(id) {
      this.parkId = id;
      localStorage.setItem("parkId", id); // 保存到 localStorage
      this.updateParkIntroduceInLocalStorage(); // 更新园区介绍到 localStorage
    },
    async getParkIntroduce() {
      try {
        const res = await getParkIntroduce({parkId:this.parkId});
        if (res.code === 0) {
          this.parkIntroduce = res.data;
          this.updateParkIntroduceInLocalStorage(); // 成功获取后更新园区介绍到 localStorage
        } else {
          console.log(res.msg);
        }
      } catch (err) {
        console.error("请求失败", err);
      }
    },
    updateParkIntroduceInLocalStorage() {
      localStorage.setItem("parkIntroduce", JSON.stringify(this.parkIntroduce)); // 保存园区介绍到 localStorage
    },
    loadParkDataFromLocalStorage() {
      const storedParkId = localStorage.getItem("parkId");
      const storedParkIntroduce = localStorage.getItem("parkIntroduce");

      if (storedParkId) {
        this.parkId = Number(storedParkId);
      }
      if (storedParkIntroduce) {
        this.parkIntroduce = JSON.parse(storedParkIntroduce);
      }
    }
  }
});
