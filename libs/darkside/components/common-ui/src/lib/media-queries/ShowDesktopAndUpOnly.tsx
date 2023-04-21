import { desktopAndUp } from '@diamantaire/styles/darkside-styles';
import { ReactNode } from 'react';
import styled from 'styled-components';

const DesktopAndUpOnlyStyles = styled.div`
  display: none;
  ${desktopAndUp('display: block')}
`;

type ShowDesktopAndUpOnlyProps = {
  children: ReactNode;
  extraClass?: string;
};

const ShowDesktopAndUpOnly = ({ children, extraClass, ...restProps }: ShowDesktopAndUpOnlyProps) => (
  <DesktopAndUpOnlyStyles className={extraClass} {...restProps}>
    {children}
  </DesktopAndUpOnlyStyles>
);

export { ShowDesktopAndUpOnly };
