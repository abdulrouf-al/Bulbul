

import { join, resolve } from 'path'
import { defineConfig } from 'vite'
import glob from "glob";

export default {
  root: resolve(__dirname, 'src'),
  resolve: {
    alias: {
      'bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      'bootstrap-icons': resolve(__dirname, 'node_modules/bootstrap-icons'),
    }
  },
  server: { 
    port: 8080,
    hot: true
  },
  build :{
    outDir:join(__dirname,'dist'),
  rollupOptions:{
    
    input: {
      main: resolve( 'src/index.html'),
      course: resolve( 'src/course.html'),
      register: resolve( 'src/register.html'),
      test: resolve( 'src/test.html')
    }
  }
}
};





