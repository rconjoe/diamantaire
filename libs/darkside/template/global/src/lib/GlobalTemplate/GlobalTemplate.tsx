import { Footer } from '@diamantaire/darkside/components/footer';
import { Header } from '@diamantaire/darkside/components/header';
import { useHeader, useFooter } from '@diamantaire/darkside/data/hooks';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  /* This is a fallback for mobile */
  padding-top: ${({ distanceFromTopMobile }) => (!distanceFromTopMobile ? '70px' : distanceFromTopMobile + 'px')};

  ${media.medium`padding-top: ${({ distanceFromTop }) => distanceFromTop + 'px'};`}
`;

export type GlobalTemplateProps = {
  children: ReactNode;
};

export const GlobalTemplate = ({ children }) => {
  const router = useRouter();
  const headerData = useHeader(router.locale);
  const footerData = useFooter(router.locale);
  const headerRef = useRef(null);

  const [isTopbarShowing, setIsTopbarShowing] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  const { pathname } = useRouter();
  const isHome = pathname === '/';

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

    window.dispatchEvent(
      new CustomEvent('RESET_HEADER_HEIGHT', {
        detail: {
          headerHeight,
        },
      }),
    );

    resizeObserver.observe(headerRef.current);

    return () => resizeObserver.disconnect();
  }, [headerData, isTopbarShowing]);

  return (
    <>
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
      <MainContainer distanceFromTopMobile={headerHeight} distanceFromTop={isHome ? 0 : headerHeight}>
        {children}
      </MainContainer>
      {footerData?.data && <Footer footerData={footerData?.data} />}
    </>
  );
};

export const getTemplate = (page: ReactElement) => <GlobalTemplate>{page}</GlobalTemplate>;
