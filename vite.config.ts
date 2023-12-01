// import { defineConfig } from 'vitest/config'
import * as path from 'path';
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(
    {
      script: {
        defineModel: true
      }
    }
  ), UnoCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // @ts-ignore
  test: {
    environment: 'happy-dom',
    setupFiles: path.resolve(__dirname, './vitest.setup.ts'),
  },
  assetsInclude: ['**/*.mp4','**/*.splinecode'],
  build:{
   outDir:'dist'
  }
})
