import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, outDir: "dist/types" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "react-awesome-slider/dist/styles.css";`,
      },
    },
  },
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "wini-web-components",
      fileName: "wini-web-components",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "@ckeditor/ckeditor5-react", "ckeditor5", "react-awesome-slider"],
    },
  },
});
