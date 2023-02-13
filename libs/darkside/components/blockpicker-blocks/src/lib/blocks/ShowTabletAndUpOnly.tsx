import { showTabletAndUpOnly } from '@diamantaire/styles/darkside-styles';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const TabletOnlyStyles = styled.div`
  ${showTabletAndUpOnly("display: 'block'")}
`;

type ShowTabletAndUpOnlyProps = {
  children: ReactNode;
  extraClass?: string;
};

const ShowTabletAndUpOnly = ({ children, extraClass, ...restProps }: ShowTabletAndUpOnlyProps) => (
  <TabletOnlyStyles className={extraClass} {...restProps}>
    {children}
  </TabletOnlyStyles>
);

export default ShowTabletAndUpOnly;
