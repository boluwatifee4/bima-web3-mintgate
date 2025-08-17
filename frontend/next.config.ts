import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  env: {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  }
};



export default nextConfig;
