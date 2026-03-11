/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export friendly — no server needed on Vercel
  output: undefined, // Let Vercel handle it (SSG per page)
};

module.exports = nextConfig;
