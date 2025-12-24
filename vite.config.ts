import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
    /**
   * IMPORTANT
   * ----------
   * GitHub Pages USER SITE + Netlify both require root base.
   * Repo name: flexdevguy.github.io
   * URL: https://flexdevguy.github.io/
   */
  base: '/',

  plugins: [
    react(),
    TanStackRouterVite(),
    
    // Brotli compression (Netlify will serve if supported)
    compression({
      algorithm: 'brotli',
      ext: '.br',
      threshold: 10240,
    }),

    // Gzip compression (fallback)
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
    }),

    // PWA (SAFE)
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'GRWM',
        short_name: 'GRWM',
        description: 'Grow With Me',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/assets\//],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' ||
              request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets',
            },
          },
        ],
      },
    }),

    // Compression (safe)
    compression({ algorithm: 'brotli', ext: '.br' }),
    compression({ algorithm: 'gzip', ext: '.gz' }),

    // Bundle analysis (optional)
    process.env.ANALYZE
      ? visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: 'dist/stats.html',
        })
      : null,
  ].filter(Boolean),

  build: {
    outDir: 'dist',
    copyPublicDir: true,
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    reportCompressedSize: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@domains': path.resolve(__dirname, './src/domains'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },

  /**
   * optimizeDeps affects DEV only.
   * Safe to keep, but do not over-tune.
   */
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-router',
      'framer-motion',
      'react-helmet-async',
      'react-ga4',
      'underscore',
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },

  server: {
    hmr: {
      overlay: true,
    },
  },
})
