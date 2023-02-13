import { showMobileOnly } from '@diamantaire/styles/darkside-styles';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const MobileOnlyStyles = styled.div`
  ${showMobileOnly()}
`;

type ShowMobileOnlyProps = {
  children: ReactNode;
  extraClass?: string;
};

const ShowMobileOnly = ({ children, extraClass, ...restProps }: ShowMobileOnlyProps) => (
  <MobileOnlyStyles className={extraClass} {...restProps}>
    {children}
  </MobileOnlyStyles>
);

export default ShowMobileOnly;
