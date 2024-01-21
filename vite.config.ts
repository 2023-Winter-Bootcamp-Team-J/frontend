import * as path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['three']
    }
  },
  plugins: [react(), svgrPlugin(), vue()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
