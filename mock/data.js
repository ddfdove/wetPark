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
  // {
  //   url: "api/wp/video/getWpVideoVo",
  //   method: "get",
  //   response: () => {
  //     // 返回静态假数据
  //     return {
  //       code: "0",
  //       msg: "success",
  //       data: [
  //         {
  //           url: "/cut/bird/bird5.png",
  //         },
  //         {
  //           url: "/cut/bird/bird5.png",
  //         },
  //         {
  //           url: "/cut/bird/bird5.png",
  //         },
  //         {
  //           url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  //         },
  //         {
  //           url: "rtsp://rtspstream:111c140a7de78d40ba5e3249819b9632@zephyr.rtsp.stream/movie",
  //         },
  //         {
  //           url: "rtsp://10.2.145.66:655/EUrl/CLJ52BW",
  //         },
  //         {
  //           url: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
  //         },
  //         {
  //           url: "http://vjs.zencdn.net/v/oceans.mp4",
  //         },
  //         {
  //           url: "http://135.131.1.10:83/openurl/mvgYwDe/live.m3u8",
  //           // url: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  //         },
  //       ],
  //     };
  //   },
  // },
  // {
  //   url: "/api/wp/location/getWpLocationVo",
  //   method: "get",
  //   response: () => {
  //     // 返回静态假数据
  //     return {
  //       code: "0",
  //       msg: "success",
  //       data: [
  //         {
  //           label: "tv",
  //           name: "摄像头",
  //           tvdata: [
  //             {
  //               cameraIndexCode:'1324156',
  //               cameraName: "路口摄像头1",
  //               latitude: "36.65265100",
  //               longitude:'101.69126600',
  //               status:'在线',
  //             },
  //             {
  //               cameraIndexCode:'1324156',
  //               cameraName: "路口摄像头2",
  //               latitude: "36.653907",
  //               longitude:'101.692532',
  //               status:'在线',
  //             },
  //             {
  //               cameraIndexCode:'1324156',
  //               cameraName: "路口摄像头3",
  //               latitude: "36.653529",
  //               longitude:'101.690365',
  //               status:'在线',
  //             },
  //             {
  //               cameraIndexCode:'1324156',
  //               cameraName: "鸟类监控摄像头",
  //               latitude: "36.653391",
  //               longitude:'101.692554',
  //               status:'未知',
  //             },
  //             {
  //               cameraIndexCode:'1324156',
  //               cameraName: "环境监测设备",
  //               latitude: "36.652428",
  //               longitude:'101.684543',
  //               status:'离线',
  //             },
  //             {
  //               cameraIndexCode:'1324156',
  //               cameraName: "水质监测设备",
  //               latitude: "36.653143",
  //               longitude:'101.680815',
  //               status:'离线',
  //             },
  //             {
  //               cameraIndexCode:'1324156',
  //               cameraName: "土壤监测设备",
  //               latitude: "36.653125",
  //               longitude:'101.679264',
  //               status:'离线',
  //             },
              
  //           ],
  //         },
  //         {
  //           label: "environment",
  //           name: "环境监测",
  //           data: [
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "生态停车场",
  //               onlineNum: 1,
  //               totalNum: 2,
  //               detail: [
  //                 {
  //                   id: 1,
  //                   paId: 1,
  //                   devicesName: "设备1",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: "1440114185123",
  //                   installationDate: "2024-07-17",
  //                   lastMaintenance: "2024-07-17",
  //                   status: "Failed",
  //                   dataTransmissionFrequency: "1970-01-01",
  //                 },
  //                 {
  //                   id: 10,
  //                   paId: 1,
  //                   devicesName: "设备2",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: "22222",
  //                   installationDate: "2024-07-17",
  //                   lastMaintenance: "2024-07-17",
  //                   status: "Active",
  //                   dataTransmissionFrequency: "1970-01-01",
  //                 },
  //               ],
  //             },
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "卫生间",
  //               onlineNum: 1,
  //               totalNum: 1,
  //               detail: [
  //                 {
  //                   id: 11,
  //                   paId: 2,
  //                   devicesName: "设备3",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: "33333",
  //                   installationDate: "2024-07-17",
  //                   lastMaintenance: "2024-07-17",
  //                   status: "Active",
  //                   dataTransmissionFrequency: "1970-01-01",
  //                 },
  //               ],
  //             },
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "生态停车场",
  //               onlineNum: 1,
  //               totalNum: 1,
  //               detail: [
  //                 {
  //                   id: 12,
  //                   paId: 3,
  //                   devicesName: "设备4",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: "44444",
  //                   installationDate: "2024-07-24",
  //                   lastMaintenance: "2024-07-24",
  //                   status: "Active",
  //                   dataTransmissionFrequency: "1970-01-01",
  //                 },
  //               ],
  //             },
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "石笼坝",
  //               onlineNum: 0,
  //               totalNum: 0,
  //               detail: [],
  //             },
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "滴水亭",
  //               onlineNum: 0,
  //               totalNum: 0,
  //               detail: [],
  //             },
  //           ],
  //         },
  //         {
  //           label: "soil",
  //           name: "土壤监测",
  //           data: [
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "生态停车场",
  //               onlineNum: 2,
  //               totalNum: 3,
  //               detail: [
  //                 {
  //                   id: 3,
  //                   paId: 1,
  //                   devicesName: "设备3",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: "11111",
  //                   installationDate: "2024-07-01",
  //                   lastMaintenance: "2095-06-07",
  //                   status: "UnderMaintenance",
  //                   dataTransmissionFrequency: "1970-01-01",
  //                 },
  //                 {
  //                   id: 4,
  //                   paId: 1,
  //                   devicesName: "设备4",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: "12343",
  //                   installationDate: "2024-07-12",
  //                   lastMaintenance: "2095-06-02",
  //                   status: "Active",
  //                   dataTransmissionFrequency: "1970-01-01",
  //                 },
  //                 {
  //                   id: 7,
  //                   paId: 1,
  //                   devicesName: "设备6",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: "1355",
  //                   installationDate: "2024-07-20",
  //                   lastMaintenance: "1899-11-24",
  //                   status: "Active",
  //                   dataTransmissionFrequency: "1970-01-01",
  //                 },
  //               ],
  //             },
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "卫生间",
  //               onlineNum: 0,
  //               totalNum: 2,
  //               detail: [
  //                 {
  //                   id: 2,
  //                   paId: 2,
  //                   devicesName: "设备2",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: "1235341234",
  //                   installationDate: "2024-07-20",
  //                   lastMaintenance: "1899-11-24",
  //                   status: "Inactive",
  //                   dataTransmissionFrequency: "1970-01-01",
  //                 },
  //                 {
  //                   id: 5,
  //                   paId: 2,
  //                   devicesName: "设备5",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: "2222",
  //                   installationDate: "2024-07-17",
  //                   lastMaintenance: null,
  //                   status: "Failed",
  //                   dataTransmissionFrequency: null,
  //                 },
  //               ],
  //             },
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "生态停车场",
  //               onlineNum: 0,
  //               totalNum: 0,
  //               detail: [],
  //             },
  //           ],
  //         },
  //         {
  //           label: "water",
  //           name: "水质监测",
  //           data: [
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "生态停车场",
  //               onlineNum: 2,
  //               totalNum: 2,
  //               detail: [
  //                 {
  //                   id: 1,
  //                   paId: 1,
  //                   devicesName: "出口设备",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: null,
  //                   installationDate: null,
  //                   lastMaintenance: null,
  //                   status: "Active",
  //                   dataTransmissionFrequency: null,
  //                 },
  //                 {
  //                   id: 3,
  //                   paId: 1,
  //                   devicesName: "设备3",
  //                   devicesType: null,
  //                   location: null,
  //                   serialNumber: null,
  //                   installationDate: null,
  //                   lastMaintenance: null,
  //                   status: "Active",
  //                   dataTransmissionFrequency: null,
  //                 },
  //               ],
  //             },
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "卫生间",
  //               onlineNum: 0,
  //               totalNum: 0,
  //               detail: [],
  //             },
  //             {
  //               parkNames: "海湖湿地片区",
  //               parkAttractionNames: "生态停车场",
  //               onlineNum: 0,
  //               totalNum: 0,
  //               detail: [],
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //   },
  // },
  {
    url: "api/wp/artemispost/previewURLs/",
    method: "get",
    response: () => {
      // 返回静态假数据
      return {
        code: "0",
        msg: "success",
        data: {
          url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        },
      };
    },
  },
  //获取9设备列表
  {
    url: "/api/wp/artemispost/getCameras",
    method: "get",
    response: () => {
      // 返回静态假数据
      return {
        code: "0",
        msg: "success",
        data: [
          {
              cameraIndexCode: "9dd014fd77964be29b236769949dfbdf",
              url: "rtsp://135.131.1.10:554/openUrl/mdHYGnm"
          },
          {
              cameraIndexCode: "88eb65d772054d61a2223d6f3e08d9b9",
              url: "rtsp://135.131.1.10:554/openUrl/mebuXU4"
          },
          {
              cameraIndexCode: "4322bd0eead443bfb21e0c023ad470e7",
              url: "rtsp://135.131.1.10:554/openUrl/mezCRXy"
          },
          {
              cameraIndexCode: "71e43baa6a47408ab8bf6721da58b972",
              url: "rtsp://135.131.1.10:554/openUrl/meY2n96"
          },
          {
              cameraIndexCode: "4b9c935896ac4d9496749bbb7a123e5d",
              url: "rtsp://135.131.1.10:554/openUrl/mfljtOo"
          },
          {
              cameraIndexCode: "582e9cf9087f4eb78ad47a74bb063fdb",
              url: "rtsp://135.131.1.10:554/openUrl/mfK0A80"
          },
          {
              cameraIndexCode: "4a2113ec2f9a46ef9360136768611e30",
              url: "rtsp://135.131.1.10:554/openUrl/mg7QT3q"
          },
          {
              cameraIndexCode: "f9df1d8b5ed24f598faed2a72205b004",
              url: "rtsp://135.131.1.10:554/openUrl/mguyNsA"
          },
          {
              cameraIndexCode: "d2a9fffe0b0745b4aa4a80ab3f383fde",
              url: "rtsp://135.131.1.10:554/openUrl/mgPQIdq"
          }
      ],
        pageSize: 10,
        pageNum: 1
      };
    },
  },
]);

