import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
				
				importStyle: "sass",
			})],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // css:{
  //   preprocessorOptions:{
  //     scss:{
  //       additionalData: `@use "./src/style/index.scss" as *;`
  //     }
  //   }
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://47.100.201.199:9007',
        changeOrigin: true,
        ws: true
      },
    },
  },
})
