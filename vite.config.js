import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https?.*/, 
            handler: "NetworkFirst",
            options: {
              cacheName: "dynamic-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
      manifest: {
        name: "Journal",
        short_name: "Journal",
        description:
          "Journal is a personal and intuitive web app designed to help you capture your daily thoughts, memories, and reflections. With a simple and modern interface, it offers a private space to document your journey anytime, anywhere. ✨",
        theme_color: "#3b82f6",
        icons: [
          {
            src: "/logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
