export function isGoogleReviewUrl(value) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    const isGoogleHost =
      hostname === "g.page" ||
      hostname === "maps.app.goo.gl" ||
      hostname === "google.com" ||
      hostname.endsWith(".google.com");
    const isReviewPath =
      hostname === "g.page" ||
      hostname === "maps.app.goo.gl" ||
      url.pathname.startsWith("/maps") ||
      url.pathname.startsWith("/local/writereview");

    return url.protocol === "https:" && isGoogleHost && isReviewPath;
  } catch {
    return false;
  }
}

export function getConfiguredGoogleReviewUrl() {
  try {
    const business = JSON.parse(localStorage.getItem("aakaar_business") || "null");
    return isGoogleReviewUrl(business?.googleReviewUrl)
      ? business.googleReviewUrl
      : "";
  } catch {
    return "";
  }
}
