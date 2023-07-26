import { ReactNode } from 'react';

type HeadingProps = {
  type?: string;
  children: ReactNode;
  className?: string | 'primary' | 'secondary' | 'tertiary' | '-medium' | '-bold' | 'small';
};

const Heading = ({ type, children, className }: HeadingProps) => {
  return (
    <>
      {(type === 'h1' || !type) && <h1 className={className}>{children}</h1>}
      {type === 'h2' && <h2 className={className}>{children}</h2>}
      {type === 'h3' && <h3 className={className}>{children}</h3>}
      {type === 'h4' && <h4 className={className}>{children}</h4>}
      {type === 'h5' && <h5 className={className}>{children}</h5>}
    </>
  );
};

export { Heading };
