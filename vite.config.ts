import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root:'./',
  // base:'/api',
  publicDir:'public',
  plugins: [react()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
  server:{
    host:'localhost',
    port:8080,
    // proxy: {
    //   '/api': {
    //     // target: 'https://mock.apifox.cn/m1/4361209-4005003-default',
    //     // secure: false,
    //     // changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
