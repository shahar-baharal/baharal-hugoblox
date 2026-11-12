// True when a link leaves the site (opens in a new tab). An absolute URL to
// this site's own origin counts as internal.
export function isExternal(url) {
  if (!url) return false;
  try {
    return new URL(url, window.location.origin).origin !== window.location.origin;
  } catch {
    return /^https?:\/\//.test(url);
  }
}
