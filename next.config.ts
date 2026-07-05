import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  transpilePackages: ["three"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader"],
    });
    return config;
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "@react-three/drei"],
  },
};

export default nextConfig;
