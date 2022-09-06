

import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve( __dirname,'src/index.html'),
        course: resolve( __dirname,'src/course.html'),
        register: resolve(__dirname, 'src/register.html')
      }
    }
  }
})

