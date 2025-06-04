import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/static/" : "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    global: "globalThis",
  },
  build: {
    outDir: "../backend/static", // Adjust to your Django static files directory
    emptyOutDir: true, // Clean output directory before build
  },
});
