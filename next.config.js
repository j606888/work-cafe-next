// -/** @type {import('next').NextConfig} */
// -const nextConfig = {
// -  swcMinify: true,
// -  // reactStrictMode: true,
// -}
// module.exports = nextConfig
const withPWA = require("next-pwa")({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  swcMinify: true,
})
