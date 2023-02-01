// TODO: Rewrite functionality/eliminate

// import uniRoute from '../universal-routes';
// import builderRoutes from '../universal-routes/builderRoutes';
// import jewelryRoutes from '../universal-routes/jewelryRoutes';
// import {
//   EARRING_PRODUCT_TYPE,
//   NECKLACE_PRODUCT_TYPE,
//   BRACELET_PRODUCT_TYPE,
//   RING_PRODUCT_TYPE,
//   ACCESSORY_PRODUCT_TYPE,
//   RING_SIZER_PRODUCT_TYPE,
//   GIFT_CARD_PRODUCT_TYPE,
//   ENGAGEMENT_RING_PRODUCT_TYPE,
//   WEDDING_BAND_PRODUCT_TYPE,
// } from '@diamantaire/shared/constants';
// import { default as URI } from 'jsuri';
// import { getBaseCountrySiteUrl } from '.';

// export const getPdpUrl = ({
//   slug,
//   configuredOptions,
//   productType,
//   countryCode,
// }) => {
//   const router = getProductRoute(productType);
//   const pdpPath =
//     router &&
//     router.createLink({
//       product: slug,
//       options: configuredOptions,
//     }).as;

//   let baseUrl = getBaseCountrySiteUrl(countryCode);
//   const pdpUrl = new URI(baseUrl);

//   pdpUrl.setPath(pdpPath);

//   return pdpUrl.toString();
// };

// /**
//  * Returns a router function to determine a variants url
//  * @param {string} productType
//  */
// export function getProductRoute(productType) {
//   switch (true) {
//     case productType === ENGAGEMENT_RING_PRODUCT_TYPE:
//       return builderRoutes.builderDynamicEngagementRingProduct;
//     case productType === WEDDING_BAND_PRODUCT_TYPE:
//       return uniRoute.omegaWeddingBandProduct;
//     case productType === EARRING_PRODUCT_TYPE:
//       return jewelryRoutes.earringProduct;
//     case productType === NECKLACE_PRODUCT_TYPE:
//       return jewelryRoutes.necklaceProduct;
//     case productType === BRACELET_PRODUCT_TYPE:
//       return jewelryRoutes.braceletProduct;
//     case productType === RING_PRODUCT_TYPE:
//       return jewelryRoutes.ringProduct;
//     case productType === ACCESSORY_PRODUCT_TYPE:
//       return jewelryRoutes.accessoryProduct;
//     case productType === RING_SIZER_PRODUCT_TYPE:
//       return jewelryRoutes.ringSizerProduct;
//     case productType === GIFT_CARD_PRODUCT_TYPE:
//       return jewelryRoutes.giftCardProduct;
//   }
// }

// export default getPdpUrl;
