import axios from 'axios';
import { ElNotification , ElMessageBox, ElMessage, ElLoading } from 'element-plus'

const http=axios.create({
    baseURL: '',
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
    },
})


// 请求拦截器
http.interceptors.request.use(
  config => {
    // 可以在这里添加一些请求前的逻辑，比如设置全局 loading 状态等
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// 响应拦截器
http.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 可以在这里处理全局的错误，比如网络错误等
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    console.log({ message: message, type: 'error', duration: 5 * 1000 });
    // ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
);

// http.interceptors.response.use(res => {
//     // 未设置状态码则默认成功状态
//     const code = res.data.code || 200;
//     // 获取错误信息
//     const msg = errorCode[code] || res.data.msg || errorCode['default']
//     // 二进制数据则直接返回
//     if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
//       return res.data
//     }
//     if (code === 401) {
//       if (!isRelogin.show) {
//         isRelogin.show = true;
//         ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' }).then(() => {
//           isRelogin.show = false;
//           useUserStore().logOut().then(() => {
//             location.href = '/index';
//           })
//       }).catch(() => {
//         isRelogin.show = false;
//       });
//     }
//       return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
//     } else if (code === 500) {
//       ElMessage({ message: msg, type: 'error' })
//       return Promise.reject(new Error(msg))
//     } else if (code === 601) {
//       ElMessage({ message: msg, type: 'warning' })
//       return Promise.reject(new Error(msg))
//     } else if (code !== 200) {
//       ElNotification.error({ title: msg })
//       return Promise.reject('error')
//     } else {
//       return  Promise.resolve(res.data)
//     }
//   },
//   error => {
//     console.log('err' + error)
//     let { message } = error;
//     if (message == "Network Error") {
//       message = "后端接口连接异常";
//     } else if (message.includes("timeout")) {
//       message = "系统接口请求超时";
//     } else if (message.includes("Request failed with status code")) {
//       message = "系统接口" + message.substr(message.length - 3) + "异常";
//     }
//     ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
//     return Promise.reject(error)
//   }
// )

export default http