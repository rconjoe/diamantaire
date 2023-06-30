import { DiamondEntity } from '../entities/diamond.entity';

/**
 * Diamond Interface
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */
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

export interface IDiamondCollection extends Partial<DiamondEntity> {
  dangerousInternalProductId?: string;
  dangerousInternalCollectionId?: string;
  handle?: string;
  productTitle?: string;
  description?: string;
  slug?: string;
  isForSale?: boolean;
  variantSku?: string;
  variantId?: string;
  dangerousInternalShopifyVariantId?: string;
  price?: number;
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

export interface IDiamondRecommendation extends IDiamondCollection {
  label: string;
}

export interface INetSuiteDiamonds {
  status: string;
  message: unknown;
  data: {
    id: number;
    available_inventory: boolean;
    lot_id: string;
    shape: string;
    clarity: string;
    color: string;
    carat: number;
    cut: string;
    fluorescence: string;
    symmetry: string;
    polish: string;
    location: string;
    quantity: number;
  };
  error: unknown;
}

export interface IShopifyInventory {
  inventoryItem?: InventoryItem;
}

export interface InventoryItem {
  id?: string;
  tracked?: boolean;
  sku?: string;
  variant?: Variant;
}

export interface Variant {
  id?: string;
  sku?: string;
  title?: string;
  availableForSale?: boolean;
  inventoryQuantity?: number;
  price?: string;
  storefrontId?: string;
  selectedOptions?: SelectedOption[];
  product?: Product;
}

export interface Product {
  id?: string;
  title?: string;
  handle?: string;
  productType?: string;
  tags?: string[];
  description?: string;
  status?: string;
  storefrontId?: string;
  options?: Option[];
}

export interface Option {
  name?: string;
  values?: string[];
}

export interface SelectedOption {
  name?: string;
  value?: string;
}
