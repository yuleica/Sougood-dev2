/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
      loader: 'cloudinary',
      path: '/',
    }
  }

module.exports = nextConfig
