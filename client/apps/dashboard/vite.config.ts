import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const appDir = path.dirname(fileURLToPath(import.meta.url));
const clientAppsDir = path.resolve(appDir, '..');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      allow: [clientAppsDir],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
      '/_': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
