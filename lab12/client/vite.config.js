import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 51712,
    proxy: {
      '/api': 'http://127.0.0.1:5012',
    },
  },
  optimizeDeps: {
    include: ['plotly.js/dist/plotly.min.js'],
  },
});
