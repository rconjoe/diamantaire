import React, { createContext, useState } from 'react';

export interface GlobalContextInterface {
  headerHeight: any;
  setHeaderHeight: any;
}

export const GlobalContext = createContext<GlobalContextInterface | null>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const globalContext: GlobalContextInterface = {
    headerHeight,
    setHeaderHeight,
  };

  return <GlobalContext.Provider value={globalContext}>{children}</GlobalContext.Provider>;
};
