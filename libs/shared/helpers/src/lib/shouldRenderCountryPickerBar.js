export default function shouldRenderCountryPickerBar(path) {
  // Then check if it matches any of the blocked pages
  const blockedPages = ['/builderEngagementRingProduct'];

  return blockedPages.indexOf(path) === -1;
}
