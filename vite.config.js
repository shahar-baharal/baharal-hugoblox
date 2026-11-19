/**
 * Vite Configuration for Vendoring JavaScript Libraries
 *
 * This config is used by Hugo Blox maintainers to copy third-party
 * JavaScript libraries from node_modules into the Hugo module's assets.
 *
 * Usage: pnpm run vendor:libs
 */

import {resolve} from "node:path";
import del from "rollup-plugin-delete";
import {defineConfig} from "vite";
import {viteStaticCopy} from "vite-plugin-static-copy";

const MODULE_DIR = "modules/blox";
const OUTPUT_DIR = resolve(MODULE_DIR, "assets/dist/lib");

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: OUTPUT_DIR,
    lib: {
      entry: resolve(MODULE_DIR, "assets/js/vendor-libs.js"),
      formats: ["es"],
      fileName: "vendor-libs",
    },
    rollupOptions: {
      // Don't bundle these libraries, just copy them
      external: ["alpinejs", "maplibre-gl"],
    },
  },

  plugins: [
    // Copy vendor libraries to module assets
    viteStaticCopy({
      targets: [



        // Alpine.js
        {
          src: "node_modules/alpinejs/dist/cdn.min.js",
          dest: "alpinejs/",
        },

        // MapLibre GL - Open-source interactive vector maps (map block)
        {
          src: "node_modules/maplibre-gl/dist/maplibre-gl.js",
          dest: "maplibre/",
        },
        {
          src: "node_modules/maplibre-gl/dist/maplibre-gl.css",
          dest: "maplibre/",
        },

        // Preact for interactive components
        {
          src: "node_modules/preact/dist/preact.min.js",
          dest: "preact/",
        },
        {
          src: "node_modules/preact/dist/preact.min.js.map",
          dest: "preact/",
        },
        {
          src: "node_modules/preact/hooks/dist/hooks.umd.js",
          dest: "preact/",
          rename: "hooks.min.js",
        },
      ],
    }),

    // Clean up any unwanted build artifacts
    del({
      targets: `${OUTPUT_DIR}/vendor-libs.js`, // Remove the dummy entry file
      hook: "writeBundle",
    }),
  ],
});
