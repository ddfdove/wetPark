import http from "@/utils/http";

//获取季增长
export const getBirdsByJi = (params) => {
  return http({
    url: "/api/wp/wpBird/getBirdsByJi",
    method: "get",
    params
  });
};
//获取日增长
export const getBirdsByRi = (params) => {
  return http({
    url: "/api/wp/wpBird/getBirdsByRi",
    method: "get",
    params
  });
};
