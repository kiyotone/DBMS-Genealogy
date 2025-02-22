import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // If you're using a specific library, such as react, separate it into its own chunk
          if (id.includes('node_modules')) {
            return 'vendor'; // Create a separate vendor chunk for node_modules
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust this to change the warning threshold (in KB)
  },
};
