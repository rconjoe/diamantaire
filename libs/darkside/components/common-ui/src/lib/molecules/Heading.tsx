import React, { ReactNode } from 'react';

type HeadingProps = {
  type: string;
  children: ReactNode;
  className?: string;
};

const elements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
};

const Heading = ({ type, children, ...props }: HeadingProps) => {
  // This will create the heading tag based on the type
  // insert any extra props
  // return any children put inside
  return React.createElement(elements[type] || elements.h1, props, children);
};

export { Heading };
