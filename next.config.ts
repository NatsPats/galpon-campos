import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/fotos/**",
      },
    ],
    qualities: [75],
    formats: ["image/webp"],
  },
};

export default nextConfig;
