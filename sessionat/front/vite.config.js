import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',  // Make sure `globalThis` is available in the browser
  },
  resolve: {
    alias: {
      global: path.resolve(__dirname, 'node_modules/global'), // Optional, if the above doesn't work
    },
  },
});
