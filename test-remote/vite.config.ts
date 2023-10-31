import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "test",
      filename: "remoteEntry.js",
      exposes: {
        "./TestApp": "./src/App",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 4203,
  },
  build: {
    target: "esnext",
    cssCodeSplit: false,
    minify: false,
    modulePreload: false,
  },
});
