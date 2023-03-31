import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { SearchIcon, AccountIcon, HeartIcon, ShoppingBagIcon } from '@diamantaire/shared/icons';
import Link from 'next/link';
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
        img {
          width: 20px;
          height: auto;
          position: relative;
          top: 1px;
        }
      }
      &.search {
        img {
          width: 26px;
          height: auto;
          transform: scale(0.8);
          position: relative;
          top: 1px;
        }
      }
      &.wishlist {
        img {
          width: 24px;
          height: auto;
          transform: scale(0.8);
          stroke-width: 1.5px;
          position: relative;
          top: 1px;
        }
      }
      &.cart {
        img {
          width: 24px;
          height: auto;
          position: relative;
          top: -1px;
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
  const links = [
    {
      title: 'Search',
      icon: <SearchIcon alt="Search" loading="eager" />,
      type: 'button',
      alt: 'Search Toggle Button',
      onClick: () => null,
      href: '/',
    },
    {
      title: 'Accounts',
      icon: <AccountIcon alt="Accounts" loading="eager" />,
      type: 'link',
      href: '/account/login',
      alt: 'Accounts Toggle Button',
    },
    {
      title: 'Wishlist',
      icon: <HeartIcon alt="Favorites" loading="eager" />,
      type: 'button',
      alt: 'Wishlist Toggle Button',
      href: '/',
    },
    {
      title: 'Cart',
      icon: <ShoppingBagIcon alt="Cart" loading="eager" />,
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
                  <Link href={href === '/' ? '/' : getRelativeUrl(href)} aria-label={alt}>
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
