import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* gunakan gambar diluar domain atau folder public agar tidak error */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "7mcr301f6o4xaqnc.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
