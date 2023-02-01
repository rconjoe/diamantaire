import React from 'react';

const makeChildrenWithProps = ({ children, extraProps }) => {
  return React.Children.map(children, child => {
    return child && React.cloneElement(child, { ...extraProps });
  });
};

export default makeChildrenWithProps;
