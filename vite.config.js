import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import cesium from 'vite-plugin-cesium'; // 引入插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),cesium()],
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    },
  },
  devServer:{
    proxy: 'http://36.133.97.79:8231'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/base.scss";`,
      },
    },
  },
});