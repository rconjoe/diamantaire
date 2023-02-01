import { getUIStrings, getProduct } from '../store/selectors/data';
import { getSlug } from '../store/selectors/activeProduct';

import { mapStr } from './language';
import getIsJewelryProduct from './getIsJewelryProduct';

const generatePDPBreadcrumbs = (state, { data }) => {
  const productSlug = getSlug(state);
  const product = getProduct(state, productSlug);
  const uiStrings = getUIStrings(state);
  const info = data.productData;
  const prevUniRoute = data.prevUniRoute;
  const productTypeRaw = info.productType
    ? info.productType
    : info.contentful?.productType;
  const productType = mapStr(uiStrings, productTypeRaw);

  let catSlug = '';

  if (prevUniRoute) {
    catSlug = prevUniRoute.category;
  } else {
    if (productTypeRaw == 'Wedding Band') {
      catSlug = 'wedding-rings';
    } else if (productTypeRaw == 'Gift Card') {
      catSlug = 'all-jewelry';
    } else {
      catSlug = product?.category?.toLowerCase().replace(' ', '-');
      if (getIsJewelryProduct(productTypeRaw)) {
        catSlug += '-jewelry';
      }
    }
  }

  return [
    { name: productType, link: { slug: catSlug } },
    { name: info?.contentful?.productTitle },
  ];
};

export default generatePDPBreadcrumbs;
