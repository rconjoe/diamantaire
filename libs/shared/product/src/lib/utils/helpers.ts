import { configurationOptionValues, configurationTypes, optionTypeOrder } from '../constants';
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
  const isJewelryProduct = isJewelry(productType);
  const productCategory = productTypeToCategoryMap[productType];
  const productPath = isJewelryProduct ? `jewelry/${productCategory}` : productCategory;

  return `/${productPath}/${collectionSlug}/${productSlug}`;
}

export function getOptionValueType(optionValue: string) {
  for (const [type, values] of Object.entries(configurationOptionValues)) {
    if (values.includes(optionValue as never)) {
      return type as keyof typeof configurationOptionValues;
    }
  }

  return;
}

export function getOptionValueSorterByType(optionType: string) {
  return (a: string, b: string) => {
    const order: string[] = configurationOptionValues[optionType];

    if (order) {
      return order.indexOf(a) > order.indexOf(b) ? 1 : -1;
    }

    return a > b ? 1 : -1;
  };
}

export function sortOptionTypes(
  typeA: (typeof configurationTypes)[keyof typeof configurationTypes],
  typeB: (typeof configurationTypes)[keyof typeof configurationTypes],
) {
  return optionTypeOrder.indexOf(typeA as any) > optionTypeOrder.indexOf(typeB as any) ? 1 : -1;
}
