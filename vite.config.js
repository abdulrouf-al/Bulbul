

import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve( 'src/index.html'),
        course: resolve( 'src/course.html'),
        register: resolve( 'src/register.html')
      }
    }
  }
})

