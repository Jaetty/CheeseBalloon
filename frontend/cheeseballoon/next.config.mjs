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
        hostname: "stimg.sooplive.co.kr",
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
        hostname: "res.sooplive.co.kr",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ssl.pstatic.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "profile.img.afreecatv.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "profile.img.sooplive.co.kr",
        port: "",
      },
      {
        protocol: "http",
        hostname: "t1.kakaocdn.net",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
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
