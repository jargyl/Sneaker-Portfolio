/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.weserv.nl", "wsrv.nl"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
