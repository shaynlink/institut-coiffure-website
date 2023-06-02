const securityHeaders = require('./securityHeaders');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd375139ucebi94.cloudfront.net',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
