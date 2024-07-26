import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/bird/dropDown/first-options",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [
          { id: "1", name: "西岸1号" },
          { id: "2", name: "西岸2号" },
          { id: "3", name: "西岸3号" },
          { id: "4", name: "西岸4号" },
        ],
      };
    },
  },
  {
    url: "/bird/dropDown/second-options",
    method: "get",
    response: ({ query }) => {
      const options = [
        {
          id: "1",
          data: [
            { id: "1-1", name: "西岸1.1号" },
            { id: "1-2", name: "西岸1.2号" },
            { id: "1-3", name: "西岸1.3号" },
            { id: "1-4", name: "西岸1.4号" },
          ],
        },
        {
          id: "2",
          data: [
            { id: "2-1", name: "西岸2.1号" },
            { id: "2-2", name: "西岸2.2号" },
            { id: "2-3", name: "西岸3.3号" },
            { id: "2-4", name: "西岸2.4号" },
          ],
        },
        {
          id: "3",
          data: [
            { id: "3-1", name: "西岸3.1号" },
            { id: "3-2", name: "西岸3.2号" },
            { id: "3-3", name: "西岸3.3号" },
            { id: "3-4", name: "西岸3.4号" },
          ],
        },
      ];

      // 过滤匹配的选项并返回其 data 属性
      const matchedOption = options.find((option) => option.id === query.id);
      const data = matchedOption ? matchedOption.data : [];
      // 返回静态假数据
      return {
        success: true,
        data,
      };
    },
  },
  {
    url: "/bird/dropDown/third-options",
    method: "get",
    response: ({ query }) => {
      const options = [
        {
          id: "1-1",
          data: [
            { id: "1-1-1", name: "西岸1.1号" },
            { id: "1-1-2", name: "西岸1.2号" },
            { id: "1-1-3", name: "西岸1.3号" },
            { id: "1-1-4", name: "西岸1.4号" },
          ],
        },
        {
          id: "1-2",
          data: [
            { id: "1-2-1", name: "西岸2.1号" },
            { id: "1-2-2", name: "西岸2.2号" },
            { id: "1-2-3", name: "西岸3.3号" },
            { id: "1-2-4", name: "西岸2.4号" },
          ],
        },
        {
          id: "1-3",
          data: [
            { id: "1-3-1", name: "西岸3.1号" },
            { id: "1-3-2", name: "西岸3.2号" },
            { id: "1-3-3", name: "西岸3.3号" },
            { id: "1-3-4", name: "西岸3.4号" },
          ],
        },
        {
          id: "1-4",
          data: [
            { id: "1-4-1", name: "西岸3.1号" },
            { id: "1-4-2", name: "西岸3.2号" },
            { id: "1-4-3", name: "西岸3.3号" },
            { id: "1-4-4", name: "西岸3.4号" },
          ],
        },
        {
          id: "2-1",
          data: [
            { id: "2-1-1", name: "西岸1.1号" },
            { id: "2-1-2", name: "西岸1.2号" },
            { id: "2-1-3", name: "西岸1.3号" },
            { id: "2-1-4", name: "西岸1.4号" },
          ],
        },
        {
          id: "2-2",
          data: [
            { id: "2-2-1", name: "西岸2.1号" },
            { id: "2-2-2", name: "西岸2.2号" },
            { id: "2-2-3", name: "西岸3.3号" },
            { id: "2-2-4", name: "西岸2.4号" },
          ],
        },
        {
          id: "2-3",
          data: [
            { id: "2-3-1", name: "西岸3.1号" },
            { id: "2-3-2", name: "西岸3.2号" },
            { id: "2-3-3", name: "西岸3.3号" },
            { id: "2-3-4", name: "西岸3.4号" },
          ],
        },
        {
          id: "2-4",
          data: [
            { id: "2-4-1", name: "西岸3.1号" },
            { id: "2-4-2", name: "西岸3.2号" },
            { id: "2-4-3", name: "西岸3.3号" },
            { id: "2-4-4", name: "西岸3.4号" },
          ],
        },
      ];

      // 返回静态假数据
      const matchedOption = options.find((option) => option.id === query.id);
      const data = matchedOption ? matchedOption.data : [];
      // 返回静态假数据
      return {
        success: true,
        data,
      };
    },
  },

  {
    url: "/bird/dropDown/getbirds",
    method: "get",
    response: ({ query }) => {
      const options = [
        {
          id: "1-1-1",
          data: [
            {
              id: "1-1-1",
              name: "斑嘴鸭",
              quantity: "5",
              discription: {
                name: "斑嘴鸭",
                family: "雁形目>鸭科>鸭属",
                height: "58-63cm",
                Wingspan: "83-94cm",
                weight: "750-1000g",
                scientificName: "Anaszonorhyncha",
                distributed: "欧亚，非洲，东洋界， 澳新界， 广泛分布",
                src: "/cut/bird/banzuiya.png",
              },
            },
            {
              id: "1-1-2",
              name: "白鹭",
              quantity: "1",
              discription: {
                name: "白鹭",
                family: "鹈形目>鹭科>白鹭属",
                height: "55-65cm",
                Wingspan: "83-94cm",
                weight: "280-710g",
                scientificName: "Egretta garzetta",
                distributed: "欧亚，非洲，东洋界， 澳新界， 广泛分布",
                src: "/cut/bird/bailu.png",
              },
            },
            {
              id: "1-1-3",
              name: "骨顶鸡",
              quantity: "3",
              discription: {
                name: "骨顶鸡",
                family: "鹤形目>秧鸡科>骨顶属",
                height: "55-65cm",
                Wingspan: "86-104cm",
                weight: "280-710g",
                scientificName: "Egretta garzetta",
                distributed: "欧亚，非洲，东洋界， 澳新界， 广泛分布",
                src: "/cut/bird/gudingji.png",
              },
            },
            { id: "1-1-4", name: "动物", quantity: "5" },
          ],
        },
        {
          id: "1-1-2",
          data: [
            { id: "1-1-2-1", name: "斑嘴鸭", quantity: "5" },
            { id: "1-1-2-2", name: "斑嘴鸭", quantity: "5" },
            { id: "1-1-2-3", name: "骨顶鸡", quantity: "3" },
            { id: "1-1-2-4", name: "鸟", quantity: "9" },
          ],
        },
        {
          id: "1-1-3",
          data: [
            { id: "1-1-1-1", name: "斑嘴鸭", quantity: "5" },
            { id: "1-1-1-2", name: "白鹭", quantity: "1" },
            { id: "1-1-1-3", name: "骨顶鸡", quantity: "3" },
            { id: "1-1-1-4", name: "动物", quantity: "5" },
          ],
        },
        {
          id: "1-1-4",
          data: [
            {
              id: "1-1-1-1",
              name: "斑嘴鸭",
              quantity: "5",
            },
            {
              id: "1-1-1-2",
              name: "白鹭",
              quantity: "1",
            },
            {
              id: "1-1-1-3",
              name: "骨顶鸡",
              quantity: "3",
            },
            { id: "1-1-1-4", name: "动物", quantity: "5" },
          ],
        },
      ];
      // 返回静态假数据
      const matchedOption = options.find((option) => option.id === query.id);
      const data = matchedOption ? matchedOption.data : [];
      // 返回静态假数据
      return {
        success: true,
        data,
      };
    },
  },
]);

// {

// },
// {

// },
