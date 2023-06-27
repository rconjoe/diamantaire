export interface IDiamondQuery {
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

export interface IDiamondVariant {
  shopifyProductHandle?: string;
  shopifyProductTitle?: string;
  isForSale?: boolean;
  variantSku?: string;
  variantId?: string;
  dangerousInternalShopifyVariantId?: string;
  variantTitle?: string;
  price?: number;
  title?: string;
}
export interface IDiamondCollection {
  dangerousInternalProductId?: string;
  dangerousInternalCollectionId?: string;
  handle?: string;
  productTitle?: string;
  description?: string;
  slug?: string;
  variants?: IDiamondVariant[];
  dfCertificateUrl?: string;
  type?: string;
  carat?: number;
  cut?: string; // (typeof DiamondCut)[keyof typeof DiamondCut];
  color?: string; // (typeof DiamondColor)[keyof typeof DiamondColor];
  clarity?: string; // (typeof DiamondClarity)[keyof typeof DiamondClarity];
  lotId?: string;
  diamondType?: string;
  availableForSale?: boolean;
}
