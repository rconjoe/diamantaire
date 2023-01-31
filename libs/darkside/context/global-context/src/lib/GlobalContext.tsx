import React, { createContext, useState } from 'react';

export interface GlobalContextInterface {
  headerHeight: any; // { [key: string]: string };
  setHeaderHeight: any; // { [diamondType: string]: DiamondShapeWithIcon };
  getRelativeUrl: (url: string, basePath?: string) => string;
}

export const GlobalContext = createContext<GlobalContextInterface | null>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  function getRelativeUrl(url: string, basePath?: string) {
    if (url.includes('http')) {
      let { pathname } = new URL(url);

      if (basePath) {
        pathname = pathname.replace(basePath, '');
      }

      return pathname;
    }

    if (basePath) {
      url = url.replace(basePath, '');
    }
    return url;
  }

  const globalContext: GlobalContextInterface = {
    headerHeight,
    setHeaderHeight,
    getRelativeUrl,
  };

  return (
    <GlobalContext.Provider value={globalContext}>
      {children}
    </GlobalContext.Provider>
  );
};
