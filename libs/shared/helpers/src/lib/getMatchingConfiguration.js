// TODO: Do we need to keep this?

// import * as omegaProductData from '../domain/selectors/omegaSpecificProductData';
// import { dangerouslyExtractInternalShopifyId } from '../shopify/normalizers/helpers';

// function getMatchingCMSConfiguration(productData, shopifyProductHandle) {
//   const {
//     _modelApiKey,
//     id,
//     defaultRingSizeVariantId,
//     // this product data is the "merged" product data from list page logic
//   } = productData;

//   // Engagement Rings
//   if (!_modelApiKey || _modelApiKey === 'omega_product') {
//     const cmsProducts = omegaProductData.getCMSProducts(productData) || [];

//     return cmsProducts.find(cmsProduct => {
//       return shopifyProductHandle === cmsProduct.shopifyProductHandle;
//     });
//   }
//   // Jewelry
//   else if (_modelApiKey === 'configuration') {
//     const cmsConfigurations = omegaProductData.getCMSConfigurations(
//       productData
//     );

//     // return empty obj if cms data is not available
//     if (!cmsConfigurations) {
//       return {};
//     }

//     const dangerousVariantId = dangerouslyExtractInternalShopifyId(
//       defaultRingSizeVariantId || id
//     );

//     return cmsConfigurations.find(
//       cmsConfiguration => cmsConfiguration.variantId === dangerousVariantId
//     );
//   }
// }

// export default function getMatchingConfiguration(
//   flattenedCmsAndShopifyProductData
// ) {
//   const shopifyProductHandle = omegaProductData.getShopifyProductHandle(
//     flattenedCmsAndShopifyProductData
//   );

//   const cmsConfiguration = getMatchingCMSConfiguration(
//     flattenedCmsAndShopifyProductData,
//     shopifyProductHandle
//   );

//   return cmsConfiguration;
// }
