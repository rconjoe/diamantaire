import React, { createContext, useState, useEffect } from 'react';

export interface GlobalContextInterface {
  headerHeight?: number;
  isMobile?: boolean;
  isCartOpen?: boolean;
  isWishlistUpdated?: number;
  isCartLoading?: boolean;
}

export const GlobalContext = createContext<GlobalContextInterface | null>(null);

export const GlobalUpdateContext = createContext<(data: Partial<GlobalContextInterface>) => void>(() => {
  throw new Error('updateGlobalContext function not implemented');
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalContext, setGlobalContext] = useState({
    isMobile: false,
    headerHeight: 0,
    isCartOpen: false,
    isWishlistUpdated: 0,
    isCartLoading: false,
  });

  const updateGlobalContext = (data: Partial<GlobalContextInterface>) => {
    setGlobalContext((prevContext) => ({
      ...prevContext,
      ...data,
    }));
  };

  const updateHeaderHeight = (value: number) => {
    updateGlobalContext({ headerHeight: value });
  };

  const updateIsMobileView = (value: boolean) => {
    updateGlobalContext({ isMobile: value });
  };

  const onHeaderHeightReset = (e) => {
    updateHeaderHeight(e.detail.headerHeight);
  };

  const onIsMobileReset = () => {
    updateIsMobileView(window.innerWidth <= 768);
  };

  const onWindowResize = () => {
    onIsMobileReset();
  };

  useEffect(() => {
    onIsMobileReset();

    window.addEventListener('resize', onWindowResize);

    window.addEventListener('RESET_HEADER_HEIGHT', onHeaderHeightReset);

    return () => {
      window.removeEventListener('resize', onWindowResize);

      window.removeEventListener('RESET_HEADER_HEIGHT', onHeaderHeightReset);
    };
  }, []);

  return (
    <GlobalContext.Provider value={globalContext}>
      <GlobalUpdateContext.Provider value={updateGlobalContext}>{children}</GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};
