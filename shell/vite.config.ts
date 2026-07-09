import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        // dyn: "http://localhost:4201/assets/remoteEntry.js",
        // reg: "http://localhost:4202/assets/remoteEntry.js",
        // dyn: "",
        // dyn: "",
        // reg: "",
        placeholder: "",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    cssCodeSplit: false,
    minify: false,
    modulePreload: false,
  },
});
