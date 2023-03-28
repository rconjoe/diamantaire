import { Footer } from '@diamantaire/darkside/components/footer';
import { Header } from '@diamantaire/darkside/components/header';
import { useHeader, useFooter } from '@diamantaire/darkside/data/hooks';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  padding-top: ${({ distanceFromTopMobile }) => distanceFromTopMobile + 'px'};

  ${media.medium`padding-top: ${({ distanceFromTop }) => distanceFromTop + 'px'};`}
`;

export type GlobalTemplateProps = {
  children: ReactNode;
};

export const GlobalTemplate = ({ children }) => {
  const headerData = useHeader('en_US');
  const footerData = useFooter('en_US');
  const headerRef = useRef(null);

  const [isTopbarShowing, setIsTopbarShowing] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  const { pathname } = useRouter();
  const isHome = pathname === '/';

  console.log('isHome', isHome);

  useEffect(() => {
    if (!headerRef?.current?.offsetHeight) return;

    const fullHeaderHeight = headerRef?.current?.offsetHeight;

    setHeaderHeight(fullHeaderHeight);
  }, [isTopbarShowing]);

  useEffect(() => {
    if (!headerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeaderHeight(headerRef.current.offsetHeight);
    });

    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.disconnect();
  }, [headerData?.data]);

  return (
    <div>
      {headerData?.data && (
        <Header
          headerData={headerData.data}
          isHome={isHome}
          headerRef={headerRef}
          isTopbarShowing={isTopbarShowing}
          setIsTopbarShowing={setIsTopbarShowing}
          headerHeight={headerHeight}
        />
      )}
      <MainContainer distanceFromTopMobile={headerHeight} distanceFromTop={isHome ? 0 : headerHeight + 'px'}>
        {children}
      </MainContainer>
      {footerData?.data && <Footer footerData={footerData?.data} />}
    </div>
  );
};

export const getTemplate = (page: ReactElement) => <GlobalTemplate>{page}</GlobalTemplate>;
