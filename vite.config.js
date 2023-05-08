import * as path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/install.js'),
            name: 'v-tail',
            fileName: format => `v-tail.${format}.js`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    'vue': 'Vue'
                }
            }
        },
        minify: false
    },
    optimizeDeps: {
        exclude: ['vue-demi']
    },
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
