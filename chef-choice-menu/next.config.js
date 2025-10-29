/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'res.cloudinary.com', 'blogapi.gyprc.com'],
  },
}

module.exports = nextConfig
