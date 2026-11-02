/** @type {import('next').NextConfig} */
const nextConfig = {
  // Presentazione Artluce: /artluce serve public/artluce/index.html
  async rewrites() {
    return [
      { source: "/artluce", destination: "/artluce/index.html" },
      { source: "/artluce/", destination: "/artluce/index.html" },
      // Presentazioni dedicate: /artluce/service, /artluce/noleggio, /artluce/matrimoni
      { source: "/artluce/:deck(service|noleggio|matrimoni)", destination: "/artluce/:deck/index.html" },
      { source: "/artluce/:deck(service|noleggio|matrimoni)/", destination: "/artluce/:deck/index.html" },
    ];
  },
};

export default nextConfig;
