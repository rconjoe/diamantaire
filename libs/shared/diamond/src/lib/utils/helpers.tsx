/**
 * Generates diamond PDP url
 * @param {string} handle diamond handle
 * @returns {string} diamond PDP url
 */
export function generateDiamondUrl(handle: string) {
  return `/diamonds/d/${handle}`;
}
