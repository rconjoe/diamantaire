import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';

// import Search from 'components/search/Search';

import CompactHeader from './CompactHeader';
import MegaMenu from './MegaMenu';
import MobileHeader from './MobileHeader';
import TopBar from './TopBar';
// TODO: setup proper type
type HeaderProps = {
  headerData?: any;
  isHome: boolean;
};

const FullHeaderStyles = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 5000;
`;

const Header: FC<HeaderProps> = ({ headerData, isHome = false }): JSX.Element => {
  const { section } = headerData.headerNavigationDynamic;

  const [isTopbarShowing, setIsTopbarShowing] = useState(true);
  const [megaMenuIndex, setMegaMenuIndex] = useState(-1);

  // const [isSearchOpen, setIsSearchOpen] = useState(false);

  // const { setHeaderHeight, headerHeight } = useGlobalContext();

  function toggleMegaMenuOpen(index: number) {
    return setMegaMenuIndex(index);
  }

  function toggleMegaMenuClose() {
    setMegaMenuIndex(-1);
  }

  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = 90;

  // useEffect(() => {
  //   if (!headerRef?.current?.offsetHeight) return;

  //   const fullHeaderHeight = headerRef?.current?.offsetHeight;

  //   setHeaderHeight(fullHeaderHeight);
  // }, [headerRef?.current?.offsetHeight, isTopbarShowing]);

  return (
    <FullHeaderStyles>
      <div ref={headerRef} onMouseLeave={() => toggleMegaMenuClose()}>
        {isTopbarShowing && <TopBar setIsTopbarShowing={setIsTopbarShowing} />}

        {isHome ? (
          <p>Home page</p>
        ) : (
          // <StackedHeader navItems={section} toggleMegaMenuOpen={toggleMegaMenuOpen} menuIndex={megaMenuIndex} />
          <CompactHeader navItems={section} toggleMegaMenuOpen={toggleMegaMenuOpen} menuIndex={megaMenuIndex} />
        )}

        <MobileHeader navItems={section} headerHeight={headerHeight} />

        <MegaMenu navItems={section} megaMenuIndex={megaMenuIndex} headerHeight={headerHeight} />

        {/* <AnimatePresence>{isSearchOpen && <Search />}</AnimatePresence> */}
      </div>
    </FullHeaderStyles>
  );
};

export { Header };
