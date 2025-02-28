import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Add this block of code
const conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    process.env.TEMPO === "true" && {
      name: "tempo-plugin",
      configureServer(server) {
        console.log("Tempo plugin initialized");
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["tempo-routes", "tempo-devtools"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
});
