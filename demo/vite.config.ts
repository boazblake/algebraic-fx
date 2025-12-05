import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "public",

  server: {
    port: 5173,
    strictPort: true,
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    target: "esnext",
  },

  resolve: {
    alias: {
      "@shared": "/src/shared",
      "@effects": "/src/effects",
      "@panels": "/src/panels",
      "@main": "/src/main",
      "@utils": "/src/utils"
    }
  }
});
