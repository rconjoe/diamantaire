import Link from 'next/link';
import { ReactNode } from 'react';

type UniLinkProps = {
  route?: string | object;
  shouldScrollTop?: boolean;
  className?: string;
  children: ReactNode | ReactNode[];
};

// This class is a wrapper for next/link
function UniLink({ route, children, className, shouldScrollTop = true }: UniLinkProps) {
  if (!route) {
    return null;
  }

  if (typeof route === 'string') {
    // catch-all for standard pages without a fixed route
    const slug = route;

    return (
      <Link href={slug} className={className} scroll={shouldScrollTop ? shouldScrollTop : true}>
        {children}
      </Link>
    );
  }

  return null;
}

export { UniLink };
