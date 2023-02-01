import { showMobileOnly } from '@diamantaire/styles/darkside-styles';
import { cx, css } from '@emotion/css';
import React, { ReactNode } from 'react';

const mobileOnlyStyles = css`
  ${showMobileOnly()}
`;

type ShowMobileOnlyProps = {
  children: ReactNode;
  extraClass?: string;
};

const ShowMobileOnly = ({ children, extraClass, ...restProps }: ShowMobileOnlyProps) => (
  <div className={cx(mobileOnlyStyles, extraClass)} {...restProps}>
    {children}
  </div>
);

export default ShowMobileOnly;
