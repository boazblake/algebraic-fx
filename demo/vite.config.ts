// vite.config.ts
import { defineConfig } from "vite";
import path from "node:path";

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
      // Properly resolved absolute paths (recommended way)
      "@shared": path.resolve(__dirname, "src/shared"),
      "@effects": path.resolve(__dirname, "src/effects"),
      "@panels": path.resolve(__dirname, "src/panels"),
      "@main": path.resolve(__dirname, "src/main"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@core": path.resolve(__dirname, "src/core"),

      // Alternative shorter syntax that also works in most cases:
      // "@shared": "/src/shared",
      // "@effects": "/src/effects",
      // "@panels": "/src/panels",
      // "@main": "/src/main",
      // "@utils": "/src/utils",
      // "@core": "/src/core",
    },
  },
});
