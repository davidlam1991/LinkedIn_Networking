import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true, // Open the page in the default browser when running 'npm run dev'
    proxy: {
      '/api': {
        target: 'http://localhost:3010',
        secure: false,
      },
    },
  },
  plugins: [react()],
});