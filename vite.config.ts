import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

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
  base: process.env.DEPLOY_ENV === 'GH_PAGES'
    ? '/flexdevguy/'
    : '/',
  build: {
    outDir: 'dist',
    // Copy public assets including robots.txt and sitemap.xml
    copyPublicDir: true,
    // Optimize for Core Web Vitals
    target: 'esnext',
    minify: 'terser',
    minifyIdentifiers: true,
    cssMinify: true,
    // Report gzip size for better insights
    reportCompressedSize: true,
    // Sourcemap for production debugging (set to false for production)
    sourcemap: false,
    // Rollup options for advanced chunk management
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@tanstack/react-router')) {
              return 'router-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            if (id.includes('react-helmet-async')) {
              return 'seo-vendor';
            }
            if (id.includes('react-ga4') || id.includes('react-grab')) {
              return 'external-vendor';
            }
            if (id.includes('underscore')) {
              return 'utils-vendor';
            }
            return 'vendor';
          }
        },
        // Optimize chunk names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    // Terser options for aggressive minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
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
});
