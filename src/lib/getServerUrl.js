const { headers } = require("next/headers");

export default function getServerUrl() {
  const heads = headers();

  const domain = heads.get("host") || "";
  const fullUrl = heads.get("referer") || "";
  const colonIdx = fullUrl.indexOf(":");
  const protocol = fullUrl.slice(0, colonIdx);

  return `${protocol || process.env.NODE_ENV === "development" ? "http" : "https"}://${domain}`;
}
