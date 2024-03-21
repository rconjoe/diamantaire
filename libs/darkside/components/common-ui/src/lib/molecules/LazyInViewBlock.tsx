import { ReactNode } from 'react';
import { InView, IntersectionOptions } from 'react-intersection-observer';

interface LazyInViewBlockProps extends IntersectionOptions {
  children: ReactNode;
}

const LazyInViewBlock: React.FC<LazyInViewBlockProps> = ({ children, rootMargin = '500px 0px', ...props }) => (
  <InView triggerOnce={true} rootMargin={rootMargin} {...props}>
    {({ inView, ref }) => <div ref={ref}>{inView && children}</div>}
  </InView>
);

export { LazyInViewBlock };
