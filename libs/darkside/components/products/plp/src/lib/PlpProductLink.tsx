import { ProductType } from '@diamantaire/shared-product';
import Link from 'next/link';

type ProductLinkProps = {
  productType: string;
  collectionSlug: string;
  productSlug: string;
  children: React.ReactNode;
};
const ProductLink = ({ productType, collectionSlug, productSlug, children }: ProductLinkProps) => {
  const ProductCategory = {
    [ProductType.EngagementRing]: 'engagement-ring',
    [ProductType.WeddingBand]: 'wedding-band',
    [ProductType.Necklace]: 'necklaces',
    [ProductType.Earrings]: 'earrings',
    [ProductType.Bracelet]: 'bracelets',
    [ProductType.Ring]: 'rings',
  } as const;

  const productCategory = ProductCategory[productType as keyof typeof ProductCategory];
  let productUrl = `/engagement-ring/${collectionSlug}/${productSlug}`;

  if (![ProductType.EngagementRing as string, ProductType.WeddingBand as string].includes(productType)) {
    productUrl = `/jewelry/${productCategory}/${collectionSlug}/${productSlug}`;
  }

  return <Link href={productUrl}>{children}</Link>;
};

export { ProductLink };
