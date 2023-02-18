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
};

module.exports = nextConfig;
