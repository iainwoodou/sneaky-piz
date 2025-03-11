import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  base: "",
  build: { target: "esnext" },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            tag.startsWith('imdt-')
          }
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'imd-icons': path.resolve(__dirname, './node_modules/@awesome.me/kit-4b5ffe0e68')
    }
  }
})
