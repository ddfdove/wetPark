import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import cesium from "vite-plugin-cesium"; // 引入插件
import { vitePluginFakeServer } from "vite-plugin-fake-server";

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    server: {
      // 端口号
      port: env.VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false, // 忽略证书验证
          // rewrite: path => path.replace(/^\/api/, '')
        }
      },
    },
    plugins: [
      vue(),
      cesium(),
      vitePluginFakeServer({
        logger: false,
        include: "mock",
        infixName: false,
        enableProd: true,
      }),
    ],
    
    
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "./styles/index.scss";`,
        },
      },
    },
  };
});
