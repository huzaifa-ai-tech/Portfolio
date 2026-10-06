import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Portfolio/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        // Split vendor code into stable, cacheable chunks so repeat visits
        // only re-download what actually changed.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (
            id.includes("framer-motion") ||
            id.includes("motion-dom") ||
            id.includes("motion-utils")
          ) {
            return "motion";
          }
          if (id.includes("react-icons") || id.includes("lucide-react")) {
            return "icons";
          }
          if (
            id.includes("react-dom") ||
            id.includes("scheduler") ||
            /[\\/]node_modules[\\/]react[\\/]/.test(id)
          ) {
            return "react";
          }
          return undefined;
        },
      },
    },
  },
});
