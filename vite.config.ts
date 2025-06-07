import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certificates/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certificates/cert.pem')),
    },
    port: 3000,
  },
});
