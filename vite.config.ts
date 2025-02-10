import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // tsconfig.json에서 "@components/*": ["src/components/*"]로 매핑되어 있으므로
      // Vite에서는 "@components"를 src/components 폴더로 매핑합니다.
      "@components": path.resolve(__dirname, "src/components"),
      // "@/*": ["src/*"]로 매핑되어 있으므로
      "@": path.resolve(__dirname, "src"),
    },
  },
});
