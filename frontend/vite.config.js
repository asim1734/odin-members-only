import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/log-in': 'http://localhost:3001',
      '/register': 'http://localhost:3001',
      '/log-out': 'http://localhost:3001',
      '/new-member': 'http://localhost:3001',
      '/new-message': 'http://localhost:3001',
      '/admin-form': 'http://localhost:3001',
    },
  },
});
