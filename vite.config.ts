import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const conditionalPlugins: [string, Record<string, any>][] = [];

// Only include tempo plugins in development with TEMPO=true
if (process.env.NODE_ENV === "development" && process.env.TEMPO === "true") {
  try {
    const { tempo } = require("tempo-devtools/dist/vite");
    conditionalPlugins.push(["tempo-devtools/swc", {}]);
    // Add tempo plugin only in development
    const plugins = [
      react({
        plugins: conditionalPlugins,
      }),
      tempo(),
    ];
  } catch (error) {
    console.warn("Tempo devtools not available:", error);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx"],
    exclude: ["tempo-routes", "tempo-devtools"],
  },
  plugins: [
    react({
      plugins: process.env.NODE_ENV === "development" ? conditionalPlugins : [],
    }),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      // Externalize tempo-related packages in production build
      external: ["tempo-routes", "tempo-devtools"],
    },
  },
});
