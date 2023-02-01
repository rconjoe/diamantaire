/**
 * Based on the pathname property of the Router object
 * from the next/router module. This is a blacklist for
 * which pages should not show the email popup.
 *
 * @param {String} pagePathname
 * @returns {Boolean}
 */
export default function getShouldRenderOnThisPage(pagePathname) {
  const blockedPages = [
    '/diamondProduct',
    '/builderEngagementRingProduct',
    '/builderDiamonds',
    '/builderEngagementRingSummary',
    '/omegaWeddingBandProduct',
    '/jewelry/product',
    '/jewelry/diamond',
    '/jewelry/summary',
    '/account/login',
    '/account/register',
    '/account/details',
    '/account/ordersPage',
    '/account/reset',
  ];

  return blockedPages.indexOf(pagePathname) === -1;
}
