import bundleAnalyzer from '@next/bundle-analyzer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export. Note: `headers()` is NOT supported with `output: 'export'`,
  // so security/cache headers live in `vercel.json` instead.
  output: 'export',
  distDir: 'dist',
  images: {
    // next/image optimisation needs a server; images are pre-optimised WebP files in /public
    unoptimized: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  webpack: (config, { dev }) => {
    // Fix webpack cache issues
    if (dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: join(__dirname, '.next', 'cache'),
        compression: 'gzip',
        maxAge: 172800000, // 2 days
      };
    }

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
