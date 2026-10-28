/** @type {import('next').NextConfig} */
const nextConfig = {
  // Presentazione Artluce: /artluce serve public/artluce/index.html
  async rewrites() {
    return [
      { source: "/artluce", destination: "/artluce/index.html" },
      { source: "/artluce/", destination: "/artluce/index.html" },
    ];
  },
};

export default nextConfig;
