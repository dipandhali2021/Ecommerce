import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy:{
      '/ecommerce-assets':{
        target: 'https://res.cloudinary.com/da9skd1ks/image/upload/v1706444003',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  
})
