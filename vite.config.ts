import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

const isGhPages = process.env.VITE_DEPLOY_TARGET === 'GH_PAGES'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize for fast refresh and hydration
      fastRefresh: true,
    }),
    TanStackRouterVite(),
    // Compression plugins
    compression({
      verbose: false,
      disable: false,
      threshold: 10240,
      algorithm: 'brotli',
      ext: '.br',
    }),
    compression({
      verbose: false,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Bundle visualization (disabled by default, enable with --analyze flag)
    process.env.ANALYZE
      ? visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: 'dist/stats.html',
        })
      : null,
  ].filter(Boolean),
  base: isGhPages ? '/grwm.dev/' : '/',
  build: {
    outDir: 'dist',
    copyPublicDir: true,
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@domains': path.resolve(__dirname, './src/domains'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
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
    // Pre-bundle for faster dev server
    esbuildOptions: {
      target: 'esnext',
    },
    // Inline to avoid extra request in dev
    holdVendorChunkNames: true,
  },
  // Optimize for development
  server: {
    hmr: {
      overlay: true,
    },
    // Enable warm up for frequently accessed modules
    warmup: {
      clientFiles: ['./src/main.tsx', './src/router.tsx', './src/App.tsx'],
    },
  },
})
