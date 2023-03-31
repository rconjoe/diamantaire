import { ReactNode } from 'react';
import LazyLoad from 'react-lazyload';

type LazyLoadWrapperProps = {
  children: ReactNode;
  height?: number;
  once?: boolean;
  resize?: boolean;
  offset?: number;
  placeholder?: any;
};

// This component is really just a way to centralize the default settings for the LazyLoad component.

const LazyLoadWrapper = ({
  children = null,
  height = undefined,
  offset = 1000,
  once = true,
  resize = undefined,
  placeholder = undefined,
}: LazyLoadWrapperProps) => {
  return (
    <LazyLoad height={height} once={once} offset={offset} resize={resize} placeholder={placeholder}>
      {children}
    </LazyLoad>
  );
};

export { LazyLoadWrapper };
