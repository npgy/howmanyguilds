// vite.config.js
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  return defineConfig({
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          callback: resolve(__dirname, "callback.html"),
        },
      },
    },
  });
};
