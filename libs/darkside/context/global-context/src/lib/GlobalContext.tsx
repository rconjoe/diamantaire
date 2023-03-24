import React, { createContext, useState } from 'react';

export interface GlobalContextInterface {
  headerHeight: any; // { [key: string]: string };
  setHeaderHeight: any; // { [diamondType: string]: DiamondShapeWithIcon };
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
