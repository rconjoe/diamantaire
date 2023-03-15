/**
 * Diamond Interface
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */
export interface DiamondQuery {
  diamondType?: { $in: string[] };
  carat?: { $gte: string; $lte: string };
  cut?: { $in: string[] };
  clarity?: { $in: string[] };
  color?: { $in: string[] };
  shape?: { $in: string[] };
  limit?: number;
  page?: number;
  sortOrder?: string;
  sortBy: string;
}

export interface DiamondVariant {
  shopifyProductHandle?: string;
  shopifyProductTitle?: string;
  isForSale?: boolean;
  variantSku?: string;
  variantId?: string;
  dangerousInternalShopifyVariantId?: string;
  variantTitle?: string;
  price?: {
    amount?: string;
    currencyCode?: string;
  };
  title?: string;
}

export interface DiamondCollection {
  dangerousInternalProductId?: string;
  dangerousInternalCollectionId?: string;
  handle?: string;
  productTitle?: string;
  productType?: string;
  description?: string;
  slug?: string;
  variants?: DiamondVariant[];
  dfCertificateUrl?: string;
  type?: string;
  carat?: number;
  cut?: string;
  color?: string;
  clarity?: string;
  lotId?: string;
  diamondType?: string;
}
