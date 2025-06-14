/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'res.cloudinary.com', 'example.com'], // Tambahkan domain di sini
  },

  typescript: {
    // ⚠️ Build will ignore type errors
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
