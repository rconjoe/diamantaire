import { VraiProduct, ListPageItemConfiguration } from '../../types';

export const createPlpProduct = (product: VraiProduct, content: Record<string, any>): ListPageItemConfiguration => {
  return {
    title: content['plpTitle'] || product.collectionTitle,
    productSlug: product.productSlug,
    collectionSlug: product.collectionSlug,
    configuration: product.configuration,
    productType: product.productType,
    primaryImage: content['plpImage'].responsiveImage,
    hoverImage: content['plpImageHover'].responsiveImage,
    price: product.price,
  };
};
