/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stimg.afreecatv.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "nng-phinf.pstatic.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.afreecatv.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ssl.pstatic.net",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
