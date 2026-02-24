import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        whySparkhealth: resolve(__dirname, "pages/why-sparkhealth/index.html"),
        platform: resolve(__dirname, "pages/platform/index.html"),
        about: resolve(__dirname, "pages/about/index.html"),
      },
    },
  },
});
