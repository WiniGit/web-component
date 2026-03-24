import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import { fileURLToPath } from "url";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    dts(),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }), // ✅ handles fs shim + CSS
  ],
  optimizeDeps: {
    exclude: ["ckeditor5", "@ckeditor/ckeditor5-react"],
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "wini-web-components",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "ckeditor5",                   // ✅ externalize — let consumer bundle it
        "@ckeditor/ckeditor5-react",   // ✅ externalize — avoid double-bundling
      ],
      output: {
        globals: {
          ckeditor5: "ckeditor5",
          "@ckeditor/ckeditor5-react": "CKEditor5React",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "style.css";
          return assetInfo.name!;
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
});