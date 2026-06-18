import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Vercel dev injects PORT; plain `npm run dev` falls back to 5173.
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
    open: false,
  },
});
