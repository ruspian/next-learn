import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* gunakan gambar diluar domain atau folder public agar tidak error */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
