import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa';

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
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'IMD Editor',
        short_name: 'mdeditor',
        start_url: '/sneaky-piz/',
        display: 'standalone',
        background_color: '#efefef',
        theme_color: '#efefef',
        icons: [
          {
            src: '/sneaky-piz/icons/sm.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/sneaky-piz/icons/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        file_handlers: [
          {
            action: '/sneaky-piz/index.html',
            accept: {
              'application/json': ['.imd'],
            },
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'imd-icons': path.resolve(__dirname, './node_modules/@awesome.me/kit-4b5ffe0e68')
    }
  }
})
