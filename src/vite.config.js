

import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve( 'index.html'),
        course: resolve( 'course.html'),
        register: resolve( 'register.html')
      }
    }
  }
})

