/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  trailingSlash: true,
  generateEtags: false,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
