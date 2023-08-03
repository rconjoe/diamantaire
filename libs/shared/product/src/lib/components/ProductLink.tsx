import Link, { LinkProps } from 'next/link';
import React from 'react';

import { generateProductUrl } from '../utils/helpers';

type ProductLinkProps = Omit<LinkProps, 'href'> & {
  productType: string;
  collectionSlug: string;
  productSlug: string;
  children: React.ReactNode;
};

export const ProductLink = ({ productType, collectionSlug, productSlug, children, ...linkProps }: ProductLinkProps) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const href = generateProductUrl(productType, collectionSlug, productSlug);

  return (
    <Link href={href} {...linkProps}>
      {children}
    </Link>
  );
};
