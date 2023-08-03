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
