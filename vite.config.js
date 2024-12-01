import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // لتفعيل الـ PWA أثناء التطوير
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https?.*/, // جميع الملفات اللي بتيجي من HTTP/HTTPS
            handler: "CacheFirst", // يحاول الشبكة أولًا، ولو فشل يستخدم الكاش
            options: {
              cacheName: "dynamic-cache",
              expiration: {
                maxEntries: 50, // أقصى عدد من الملفات اللي هيتم تخزينها
                maxAgeSeconds: 7 * 24 * 60 * 60, // أسبوع واحد
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/, // الكاش للصور
            handler: "CacheFirst", // يخزن الصور مباشرة في الكاش
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100, // أقصى عدد من الصور
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 يوم
              },
            },
          },
        ],
      },
      manifest: {
        name: "Journal",
        short_name: "JOR",
        description:
          "Journal is a personal and intuitive web app designed to help you capture your daily thoughts, memories, and reflections. With a simple and modern interface, it offers a private space to document your journey anytime, anywhere. ✨",
        theme_color: "#3b82f6",
        icons: [
          {
            src: "/logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
