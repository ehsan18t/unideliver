/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'out',
  // output: 'export',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
