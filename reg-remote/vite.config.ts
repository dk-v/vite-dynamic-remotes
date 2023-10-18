import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "reg",
      filename: "remoteEntry.js",
      exposes: {
        "./RegularApp": "./src/App",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 4202,
  },
  build: {
    target: "esnext",
    cssCodeSplit: false,
    minify: false,
    modulePreload: false,
  },
});
