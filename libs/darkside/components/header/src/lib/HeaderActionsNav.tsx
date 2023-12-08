import { WishlistSlideOutButton } from '@diamantaire/darkside/components/wishlist';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { AccountIcon, LoveIcon, ShoppingBagIcon } from '@diamantaire/shared/icons';
import { media } from '@diamantaire/styles/darkside-styles';
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
      margin-right: 1rem;

      &:last-child {
        margin-right: 0px;
      }

      &.accounts {
        padding: 0 0.4rem 0 0;

        svg {
          width: 1.8rem;
          height: auto;
          position: relative;
        }
      }

      &.search {
        svg {
          width: 2.6rem;
          height: auto;
          transform: scale(0.8);
          position: relative;
          top: 0.1rem;
        }
      }

      &.wishlist {
        cursor: pointer;

        svg {
          width: 2.4rem;
          height: auto;
          transform: scale(0.8);
          stroke-width: 1.5rem;
          position: relative;
          top: 0.2rem;
        }
      }

      &.cart {
        svg {
          width: 2.4rem;
          height: auto;
          position: relative;
          top: 0px;
          ${media.small`top: 0.1rem;`}
        }
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

      a {
        display: inline-block;
      }

      svg {
        height: 1.8rem;
      }
    }
  }
`;

const HeaderActionsNav = ({ toggleCart }: { toggleCart: () => void }) => {
  const links = [
    // {
    //   title: 'Search',
    //   icon: <SearchIcon />,
    //   type: 'button',
    //   alt: 'Search Toggle Button',
    //   onClick: () => null,
    //   href: '/',
    // },
    {
      title: 'Accounts',
      icon: <AccountIcon />,
      type: 'link',
      href: '/account/login',
      alt: 'Accounts Toggle Button',
    },
    {
      title: 'Wishlist',
      icon: <LoveIcon />,
      type: 'button',
      alt: 'Wishlist Toggle Button',
      href: '/',
    },
    {
      title: 'Cart',
      icon: <ShoppingBagIcon />,
      type: 'button',
      onClick: () => toggleCart(),
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
                {(title === 'Wishlist' && <WishlistSlideOutButton />) || (
                  <button onClick={onClick} aria-label={alt}>
                    {icon}
                  </button>
                )}
              </li>
            );
          }
        })}
      </ul>
    </HeaderActionsNavContainer>
  );
};

export default HeaderActionsNav;
