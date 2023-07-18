interface DiamondVariantTypes {
  dangerousInternalShopifyVariantId?: string;
  isForSale?: boolean;
  price?: number;
  title?: string;
  variantId?: string;
  variantSku?: string;
  variantTitle?: string;
}

export interface DiamondDataTypes {
  _id?: string;
  dangerousInternalProductId?: string;
  availableForSale?: boolean;
  carat?: number;
  clarity?: string;
  color?: string;
  cut?: string;
  dangerousInternalShopifyVariantId?: string;
  dfCertificateUrl?: string;
  diamondType?: string;
  handle?: string;
  isForSale?: boolean;
  lotId?: string;
  price?: number;
  productTitle?: string;
  productType?: string;
  slug?: string;
  type?: string;
  variantId?: string;
  variants?: DiamondVariantTypes[];
  available_inventory?: boolean;
  cert_url?: string;
  created_at?: string;
  crown_angle?: number;
  crown_height?: number;
  cut_grade?: string;
  depth_mm?: number;
  depth_pct?: number;
  digital_assets?: any[];
  fluorescence?: string;
  gcal_cert_id?: string | null;
  girdle?: string;
  graded_by?: string;
  id?: string;
  length_mm?: number;
  lot_id?: number;
  netsuite_id?: number;
  ns_location?: string;
  on_hold?: boolean;
  pavilion_angle?: number;
  pavilion_height?: number;
  polish?: string;
  quantity?: number;
  shape?: string;
  symmetry?: string;
  table_size?: number;
  unit_price_df_msrp_usd?: string;
  unit_price_msrp_usd?: string;
  updated_at?: string;
  width_mm?: number;
}
