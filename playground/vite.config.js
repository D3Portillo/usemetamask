import path from "path"
import { defineConfig } from "vite"
import reactPlugin from "@vitejs/plugin-react"

const LIB_DEV_ENTRY = path.resolve(__dirname, "../lib/index.ts")
const LIB_NAME = __dirname
export default defineConfig({
  plugins: [reactPlugin()],
  build: {
    lib: {
      entry: LIB_DEV_ENTRY,
      name: LIB_NAME,
      formats: ["es"],
      fileName: (format) => `${LIB_NAME}.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
  },
})
