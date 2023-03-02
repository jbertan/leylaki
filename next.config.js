/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    SECRET: process.env.SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leylaki-img.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
