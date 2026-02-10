import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/PYTHON-REACT-GUI-CALCULATOR/",
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});