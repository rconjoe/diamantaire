import React from 'react';

type HeadingProps = {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  children: React.ReactNode;
  className?: string | 'primary' | 'secondary' | 'tertiary' | '-medium' | '-bold' | 'small';
};

const Heading: React.FC<HeadingProps> = ({ type = 'h1', children, className }) => {
  const getHeading = (type: string) => {
    switch (type) {
      case 'h1':
        return <h1 className={className}>{children}</h1>;
      case 'h2':
        return <h2 className={className}>{children}</h2>;
      case 'h3':
        return <h3 className={className}>{children}</h3>;
      case 'h4':
        return <h4 className={className}>{children}</h4>;
      case 'h5':
        return <h5 className={className}>{children}</h5>;
      default:
        return <h1 className={className}>{children}</h1>;
    }
  };

  return getHeading(type);
};

export { Heading };
