import Link, { LinkProps } from 'next/link';
import React from 'react';

import { generateDiamondUrl } from '../utils/helpers';

type DiamondLinkProps = Omit<LinkProps, 'href'> & {
  children: React.ReactNode;
  handle: string;
};

export const DiamondLink = ({ handle, children }: DiamondLinkProps) => {
  const href = generateDiamondUrl(handle);

  return <Link href={href}>{children}</Link>;
};
