import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { DiamondShapesProvider } from '@diamantaire/darkside/context/diamond-icon-context';

// import Search from 'components/search/Search';

import CompactHeader from './CompactHeader';
import MegaMenu from './MegaMenu';
import MobileHeader from './MobileHeader';
import TopBar from './TopBar';
import {
  useDiamondIcons,
  useGlobalContext,
} from '@diamantaire/darkside/data/hooks';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';

type HeaderProps = {
  headerData: {
    headerNavigationDynamic: {
      section: object;
    };
  };
};

const FullHeaderStyles = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 5000;
`;

const Header: FC<HeaderProps> = ({ headerData }): JSX.Element => {
  // console.log('headerData', headerData);
  const { section } = headerData.headerNavigationDynamic;

  const [isTopbarShowing, setIsTopbarShowing] = useState(true);
  const [megaMenuIndex, setMegaMenuIndex] = useState(-1);
  // const [headerHeight, setHeaderHeight] = useState(0);
  // const [topBarHeight, setTopBarHeight] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function toggleSearch() {
    return setIsSearchOpen(!isSearchOpen);
  }

  const { setHeaderHeight, headerHeight, getRelativeUrl } = useGlobalContext();

  function toggleMegaMenuOpen(index: number) {
    return setMegaMenuIndex(index);
  }

  function toggleMegaMenuClose() {
    setMegaMenuIndex(-1);
  }

  const headerRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef?.current?.offsetHeight) return;

    const fullHeaderHeight = headerRef?.current?.offsetHeight;

    setHeaderHeight(fullHeaderHeight);
  }, [headerRef?.current?.offsetHeight, isTopbarShowing]);

  return (
    <FullHeaderStyles>
      <div ref={headerRef} onMouseLeave={() => toggleMegaMenuClose()}>
        {/* <StackedHeader
        navItems={section}
        toggleMegaMenuOpen={toggleMegaMenuOpen}
        menuIndex={megaMenuIndex}
      /> */}

        {isTopbarShowing && <TopBar setIsTopbarShowing={setIsTopbarShowing} />}

        <CompactHeader
          navItems={section}
          toggleMegaMenuOpen={toggleMegaMenuOpen}
          menuIndex={megaMenuIndex}
          getRelativeUrl={getRelativeUrl}
        />

        <MobileHeader navItems={section} headerHeight={headerHeight} />

        <DiamondShapesProvider>
          <MegaMenu
            navItems={section}
            megaMenuIndex={megaMenuIndex}
            headerHeight={headerHeight}
            getRelativeUrl={getRelativeUrl}
          />
        </DiamondShapesProvider>

        {/* <AnimatePresence>{isSearchOpen && <Search />}</AnimatePresence> */}
      </div>
    </FullHeaderStyles>
  );
};

export { Header };
