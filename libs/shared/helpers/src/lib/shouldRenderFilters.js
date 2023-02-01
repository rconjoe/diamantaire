export default function shouldRenderFilters(path) {
  // Then check if it matches any of the blocked pages
  const blockedPages = ['engagement-rings-settings'];

  return blockedPages.indexOf(path) === -1;
}
