import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    hmr: false
  },
  css: {
    postcss
  }
})
