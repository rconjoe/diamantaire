import React, { ReactNode } from 'react';

type HeadingProps = {
  type: string;
  children: ReactNode;
  className?: string;
};

const Heading = ({ type, children, ...props }: HeadingProps) => {
  return (
    <>
      {type === 'h1' && <h1 {...props}>{children}</h1>}
      {type === 'h2' && <h2 {...props}>{children}</h2>}
      {type === 'h3' && <h3 {...props}>{children}</h3>}
      {type === 'h4' && <h4 {...props}>{children}</h4>}
      {type === 'h5' && <h5 {...props}>{children}</h5>}
    </>
  );
};

export { Heading };
