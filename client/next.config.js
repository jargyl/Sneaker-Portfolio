/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["wsrv.nl"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  exportPathMap: async function (defaultPathMap) {
    return {
      "/": { page: "/" },
      "/edit": { page: "/edit" },
      "/admin": { page: "/admin" },
      "/404": { page: "/404" },
    };
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
