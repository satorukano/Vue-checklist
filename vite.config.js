import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
    base: "/Vue-checklist/",
	devServer:{
        proxy:{
            '^/api':{
                target: 'http://localhost:8080',
                ws: true,
                secure: false                
            }
        }
    },
  plugins: [
		vue(),
		vuetify({ autoImport: true }),
	],
})
