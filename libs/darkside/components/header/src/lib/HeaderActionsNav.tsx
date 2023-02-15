import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { AccountIcon, HeartIcon, SearchIcon, ShoppingBagIcon } from '@diamantaire/shared/icons';
import Link from 'next/link';
import React, { useContext } from 'react';
import styled from 'styled-components';

const HeaderActionsNavContainer = styled.nav`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    li {
      margin-right: 10px;
      &:last-child {
        margin-right: 0px;
      }
      &.accounts {
        svg {
          width: 20px;
          height: auto;
          position: relative;
          top: 1px;
        }
      }
      &.search {
        svg {
          width: 24px;
          height: auto;
          transform: scale(0.8);
          position: relative;
          top: 1px;
        }
      }
      &.wishlist {
        svg {
          width: 24px;
          height: auto;
          transform: scale(0.8);
          stroke-width: 1.5px;
          position: relative;
          top: 2px;
        }
      }
      &.cart {
        svg {
          width: 24px;
          height: auto;
        }
      }
      a {
        display: inline-block;
      }

      button {
        line-height: 0;
        padding: 0;
        background-color: transparent;
        border: none;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

const HeaderActionsNav = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) return null;

  const { getRelativeUrl } = globalContext;

  const links = [
    {
      title: 'Search',
      icon: <SearchIcon />,
      type: 'button',
      alt: 'Search Toggle Button',
      onClick: () => null,
    },
    {
      title: 'Accounts',
      icon: <AccountIcon />,
      type: 'link',
      href: '/account/login',
      alt: 'Accounts Toggle Button',
    },
    {
      title: 'Wishlist',
      icon: <HeartIcon />,
      type: 'button',
      alt: 'Wishlist Toggle Button',
    },
    {
      title: 'Cart',
      icon: <ShoppingBagIcon />,
      type: 'button',
      alt: 'Cart Toggle Button',
    },
  ];

  return (
    <HeaderActionsNavContainer>
      <ul>
        {links.map((link, index) => {
          const { title, href, icon, alt, onClick } = link;

          if (link.type === 'link') {
            return (
              <li key={`header-action-${index}`} className={title.toLowerCase()}>
                {href && (
                  <Link href={getRelativeUrl(href)} aria-label={alt} legacyBehavior>
                    {icon}
                  </Link>
                )}
              </li>
            );
          } else {
            return (
              <li key={`header-action-${index}`} className={link.title.toLowerCase()}>
                <button onClick={onClick} aria-label={alt}>
                  {icon}
                </button>
              </li>
            );
          }
        })}
      </ul>
    </HeaderActionsNavContainer>
  );
};

export default HeaderActionsNav;
