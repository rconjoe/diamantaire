import Link, { LinkProps } from 'next/link';
import React from 'react';

import { generateProductUrl } from '../utils/helpers';

type ProductLinkProps = Omit<LinkProps, 'href'> & {
  productType: string;
  collectionSlug: string;
  productSlug: string;
  target?: '_blank' | '_self';
  children: React.ReactNode;
};

export const ProductLink = ({
  productType,
  collectionSlug,
  productSlug,
  children,
  target,
  ...linkProps
}: ProductLinkProps) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const href = generateProductUrl(productType, collectionSlug, productSlug);

  return target === '_blank' ? (
    <a href={href} target={target}>
      {children}
    </a>
  ) : (
    <Link href={href} {...linkProps}>
      {children}
    </Link>
  );
};
