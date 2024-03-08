import {
  configurationOptionValues,
  configurationTypes,
  optionTypeOrder,
  plpDiamondValues,
  plpMetalValues,
} from '../constants';
import { ProductType, productTypeToCategoryMap } from '../constants/product-properties';

export function isJewelry(productType: string) {
  return [
    ProductType.Ring as string,
    ProductType.Earrings as string,
    ProductType.Necklace as string,
    ProductType.Bracelet as string,
  ].includes(productType);
}

export function generateProductUrl(productType: string, collectionSlug: string, productSlug: string) {
  if (!productType || !collectionSlug || !productSlug) return ``;

  const isJewelryProduct = isJewelry(productType);

  const productCategory = productTypeToCategoryMap[productType];

  const productPath = isJewelryProduct ? `jewelry/${productCategory}` : productCategory;

  return `/${productPath}/${collectionSlug}/${productSlug}`;
}

export function generateListPageUrl({ category, plpSlug }) {
  return `/${category}/${plpSlug}`;
}

export function getOptionValueType(optionValue: string) {
  for (const [type, values] of Object.entries(configurationOptionValues)) {
    if (values.includes(optionValue as never)) {
      return type as keyof typeof configurationOptionValues;
    }
  }

  return undefined;
}
export function getOptionValueSorterByType(optionType: string) {
  return (a: string, b: string) => {
    const order: string[] = configurationOptionValues[optionType];

    if (order) {
      return order.indexOf(a) > order.indexOf(b) ? 1 : -1;
    }

    if (!isNaN(Number(a)) && !isNaN(Number(b))) {
      return Number(a) > Number(b) ? 1 : -1;
    }

    return a > b ? 1 : -1;
  };
}

// export function getOptionValueSorterByType(optionType: string) {
//   return (a, b) => {
//     const order = configurationOptionValues[optionType];

//     const indexA = order.indexOf(a);
//     const indexB = order.indexOf(b);

//     // If both values are in the array, sort based on their indexes
//     if (indexA !== -1 && indexB !== -1) {
//       return indexA - indexB;
//     }

//     // Extract numeric part for comparison
//     const numericA = parseFloat(a);
//     const numericB = parseFloat(b);

//     // If both are numbers, sort numerically
//     if (!isNaN(numericA) && !isNaN(numericB)) {
//       return numericA - numericB;
//     }

//     // Convert to string and default to alphabetical comparison
//     return a.toString().localeCompare(b.toString());
//   };
// }

export function sortOptionTypes(
  typeA: (typeof configurationTypes)[keyof typeof configurationTypes],
  typeB: (typeof configurationTypes)[keyof typeof configurationTypes],
) {
  return optionTypeOrder.indexOf(typeA as any) > optionTypeOrder.indexOf(typeB as any) ? 1 : -1;
}

export function sortMetalTypes(a: string, b: string) {
  if (!a || !b) return -1;

  return plpMetalValues.findIndex((metal) => metal === a) > plpMetalValues.findIndex((metal) => metal === b) ? 1 : -1;
}

export function sortDiamondTypes(a: string, b: string) {
  if (!a || !b) return -1;

  return plpDiamondValues.findIndex((metal) => metal === a) > plpDiamondValues.findIndex((metal) => metal === b) ? 1 : -1;
}

export function createShopifyVariantId(id: string | number) {
  return `gid://shopify/ProductVariant/${id}`;
}
