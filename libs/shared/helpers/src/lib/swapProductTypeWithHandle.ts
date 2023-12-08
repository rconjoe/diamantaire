import { pdpTypeTitleSingleToPluralHandleAsConst } from '@diamantaire/shared/constants';

export function swapProductTypeWithHandle(productType: string) {
  return pdpTypeTitleSingleToPluralHandleAsConst[productType];
}
