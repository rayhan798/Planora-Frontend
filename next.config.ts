import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler:true,

  // // better auth proxy
  // async rewrites() {

  //   return [
  //     {
  //       // Explicitly map auth requests
  //       source: "/api/auth/:path*",
  //       destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/:path*",
  //     },

  //   {
  //       // Explicitly map v1 API requests
  //       source: "/api/v1/:path*",
  //       destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/:path*",
  //     },
  //   ];
  // };

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
