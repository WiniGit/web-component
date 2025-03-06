import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
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
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "@ckeditor/ckeditor5-react", "ckeditor5", "react-awesome-slider"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
