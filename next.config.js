/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export friendly — no server needed on Vercel
  output: undefined, // Let Vercel handle it (SSG per page)
  async redirects() {
    return [{ source: "/grant", destination: "/#pricing", permanent: true }];
  },
};

module.exports = nextConfig;
