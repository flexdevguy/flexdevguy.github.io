import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // default config is safest for prod
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

    // Optional bundle analysis: `ANALYZE=true npm run build`
    process.env.ANALYZE
      ? visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: 'dist/stats.html',
        })
      : null,
  ].filter(Boolean),

  /**
   * IMPORTANT
   * ----------
   * GitHub Pages USER SITE + Netlify both require root base.
   * Repo name: flexdevguy.github.io
   * URL: https://flexdevguy.github.io/
   */
  base: '/',

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
