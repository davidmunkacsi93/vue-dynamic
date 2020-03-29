export function getLastURLSegment(url) {
  return url.substr(url.lastIndexOf('/') + 1);
}
