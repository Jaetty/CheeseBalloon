/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stimg.afreecatv.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
