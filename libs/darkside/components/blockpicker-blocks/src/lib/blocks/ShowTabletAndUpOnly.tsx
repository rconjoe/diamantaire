import { showTabletAndUpOnly } from '@diamantaire/styles/darkside-styles';
import { cx, css } from '@emotion/css';
import React, { ReactNode } from 'react';

const mobileOnlyStyles = css`
  ${showTabletAndUpOnly({
    display: 'block',
  })}
`;

type ShowTabletAndUpOnlyProps = {
  children: ReactNode;
  extraClass?: string;
};

const ShowTabletAndUpOnly = ({ children, extraClass, ...restProps }: ShowTabletAndUpOnlyProps) => (
  <div className={cx(mobileOnlyStyles, extraClass)} {...restProps}>
    {children}
  </div>
);

export default ShowTabletAndUpOnly;
