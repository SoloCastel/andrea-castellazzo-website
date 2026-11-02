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
  // Pagine Artluce visibili solo a chi ha il link: fuori da motori di ricerca e anteprime in cache
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }];
    return [
      { source: "/artluce", headers: noindex },
      { source: "/artluce/:path*", headers: noindex },
    ];
  },
};

export default nextConfig;
