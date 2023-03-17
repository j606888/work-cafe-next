// -/** @type {import('next').NextConfig} */
// -const nextConfig = {
// -  swcMinify: true,
// -  // reactStrictMode: true,
// -}
// module.exports = nextConfig
const withPWA = require("next-pwa")({
  dest: 'public'
})

module.exports = withPWA({
  swcMinify: true,
})
