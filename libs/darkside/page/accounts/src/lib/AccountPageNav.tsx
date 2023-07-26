import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const AccountPageNavStyles = styled.div`
  .title-container {
    padding: calc(var(--gutter) / 2) 2.4rem;
    ${media.medium`padding: calc(var(--gutter) / 2) 0;`}
    .title {
      flex: 1;

      h2 {
        font-size: var(--font-size-xxlarge);
        font-family: var(--font-family-main);
        font-weight: var(--font-weight-normal);
      }
    }
    .actions {
      flex: 1;
      li {
        a {
          font-size: var(--font-size-small);
          color: var(--color-teal);
          border-bottom: 1px solid var(--color-teal);
          transition: 0.25s;
          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }
  .nav-items__container {
    background-color: var(--color-lightest-grey);
    /* padding: 15px 0; */
    ul {
      li {
        margin-right: 40px;

        &:last-child {
          margin-right: 0px;
        }

        a {
          font-size: var(--font-size-xxxsmall);
          border-bottom: 2px solid transparent;
          padding: 10px 0 5px;
          display: inline-block;
          transition: 0.25s;
          font-weight: var(--font-weight-normal);

          &:hover,
          &.active {
            border-color: var(--color-teal);
          }

          &.active {
            font-weight: var(--font-weight-medium);
          }
        }
      }
    }
  }
`;

export const navItems = [
  {
    title: 'Account Details',
    href: '/account/details',
  },
  {
    title: 'Order History',
    href: '/account/order-history',
  },
  {
    title: 'Your Wishlist',
    href: '/account/wishlist',
  },
];

const AccountPageNav = ({ customerName }) => {
  const { asPath } = useRouter();

  return (
    <AccountPageNavStyles>
      <div className="title-container flex align-center container-wrapper">
        <div className="title">
          <h2>Hi {customerName}</h2>
        </div>
        <div className="actions">
          <ul className="flex justify-flex-end list-unstyled">
            <li>
              <Link href="/">Log out</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="nav-items__container">
        <ul className="flex justify-center align-center list-unstyled container-wrapper nav-items">
          {navItems.map((item, index) => {
            return (
              <li key={`account-nav-item-${index}`}>
                <Link
                  className={clsx({
                    active: asPath === item.href,
                  })}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </AccountPageNavStyles>
  );
};

export { AccountPageNav };
