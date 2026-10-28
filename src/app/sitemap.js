export default function sitemap() {
  const baseUrl = "https://exploring-space.com";

  const routes = [
    "",
    "/bio",
    "/servizi",
    "/portfolio",
    "/portfolio/artemis-ii",
    "/privacy",
    "/cookie",
    "/note-legali",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/portfolio" || route === "/servizi"
        ? 0.9
        : 0.7,
  }));
}