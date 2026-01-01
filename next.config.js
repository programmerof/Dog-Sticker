/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doggystickers.vercel.app",
        port: "",
        pathname: "/_next/image", // because your image URLs are proxied by Next.js
      },
    ],
  },
}

module.exports = nextConfig;
