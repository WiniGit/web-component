import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import { fileURLToPath } from "url";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), dts(), cssInjectedByJsPlugin()],
  // plugins: [react(), dts({ insertTypesEntry: true, outDir: "dist" })],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "src"),
  //   },
  // },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "react-awesome-slider/dist/styles.css";`,
  //     },
  //   },
  //   modules: {
  //     localsConvention: "camelCase", // Allows camelCase imports
  //   },
  // },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "wini-web-components",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
