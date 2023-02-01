import PropTypes from 'prop-types';
import React from 'react';

const elements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
};

const Heading = ({ type, children, ...props }) => {
  // This will create the heading tag based on the type
  // insert any extra props
  // return any children put inside
  return React.createElement(elements[type] || elements.h1, props, children);
};

Heading.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Heading;
