/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",     // 👈 THIS IS THE FIX
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
