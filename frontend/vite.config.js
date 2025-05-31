import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import gFontPiraCode from "vite-plugin-webfont-dl";
import webfontDL from 'vite-plugin-webfont-dl';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  
    tailwindcss(),
    webfontDL([ "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" ])
  ],
})
