import { defineConfig } from "vitest/config";
import path from "path";
import fs from "fs";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./tests/setup-env.ts"],
    include: ["tests/**/*.test.ts"],
    exclude: ["benchmarks/**/*"],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@adt": path.resolve(__dirname, "src/adt"),
      "@core": path.resolve(__dirname, "src/core"),
      "@effects": path.resolve(__dirname, "src/effects"),
    },
  },
});
