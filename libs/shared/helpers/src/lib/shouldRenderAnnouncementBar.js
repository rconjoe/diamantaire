export default function shouldRenderAnnouncementBar(path) {
  // Then check if it matches any of the blocked pages
  const blockedPages = ['/redCarpet', '/builderEngagementRingProduct'];

  return blockedPages.indexOf(path) === -1;
}
