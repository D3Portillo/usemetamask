import path from "path"
import { defineConfig } from "vite"
import packageJson from "./package.json"

export default defineConfig({
  build: {
    target: "esnext",
    lib: {
      formats: ["es", "umd"],
      name: packageJson.name,
      entry: path.resolve(__dirname, "lib/index.ts"),
      fileName: (format) => `index.${format}.js`,
    },
    minify: "esbuild",
    chunkSizeWarningLimit: 1,
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  esbuild: {
    minify: true,
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    treeShaking: true,
    mangleProps: /.*_.*/g,
  },
})
