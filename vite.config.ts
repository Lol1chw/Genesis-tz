import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
   process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
   return {
      plugins: [vue()],
      resolve: {
         alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
         }
      },
      server: {
         proxy: {
            '/leads': {
               target: `https://${process.env.VITE_AMOCRM_DOMAIN}/api/v4`,
               auth: 'Bearer ' + process.env.VITE_AMOCRM_ACCESS_TOKEN,
               changeOrigin: true
            },
            '/contacts': {
               target: `https://${process.env.VITE_AMOCRM_DOMAIN}/api/v4`,
               auth: 'Bearer ' + process.env.VITE_AMOCRM_ACCESS_TOKEN,
               changeOrigin: true
            },
            '/companies': {
               target: `https://${process.env.VITE_AMOCRM_DOMAIN}/api/v4`,
               auth: 'Bearer ' + process.env.VITE_AMOCRM_ACCESS_TOKEN,
               changeOrigin: true
            }
         }
      }
   }
})
