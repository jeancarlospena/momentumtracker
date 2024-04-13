import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      // "/api": "https://momentumtracker.onrender.com",
    }
  },
  plugins: [react()],
})
