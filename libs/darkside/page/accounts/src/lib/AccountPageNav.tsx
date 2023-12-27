import { useClerk } from '@clerk/nextjs';
import { DarksideButton, Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import { humanNamesMapperType, useTranslations } from '@diamantaire/darkside/data/hooks';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const AccountPageNavStyles = styled.div`
  .title-container {
    padding: 2rem 2.4rem;

    ${media.medium`
    padding: 4rem 0;`}

    .title {
      flex: 1;

      h2 {
        font-size: var(--font-size-xxlarge);
        font-family: var(--font-family-main);
        font-weight: var(--font-weight-normal);
      }

      .customer-name {
        text-transform: capitalize;
      }
    }

    .actions {
      flex: 1;
      li {
        a {
          font-size: var(--font-size-small);
          color: var(--color-teal);
          border-bottom: 0.1rem solid var(--color-teal);
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

    ul {
      li {
        margin-right: 4rem;

        &:last-child {
          margin-right: 0px;
        }

        a {
          font-size: var(--font-size-xxxsmall);
          border-bottom: 0.2rem solid transparent;
          padding: 1rem 0 0.5rem;
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

const AccountPageNav = ({ customerName }) => {
  const { query, locale } = useRouter();
  const { accountPageSlug } = query || {};
  const { _t } = useTranslations(locale, [humanNamesMapperType.UI_STRINGS_2]);

  const clerk = useClerk();

  const navItems = [
    {
      title: _t('Account Details'),
      href: '/account/details',
    },
    {
      title: _t('Order History'),
      href: '/account/order-history',
    },
    {
      title: _t('Your Wishlist'),
      href: '/wishlist',
    },
  ];

  return (
    <AccountPageNavStyles>
      <div className="title-container flex align-center container-wrapper">
        <div className="title">
          <Heading type="h2">
            <UIString>Welcome</UIString> <span className="customer-name">{customerName}</span>
          </Heading>
        </div>
        <div className="actions">
          <ul className="flex justify-flex-end list-unstyled">
            <li>
              <DarksideButton type="underline" colorTheme="teal" onClick={() => clerk.signOut()}>
                <UIString>Log out</UIString>
              </DarksideButton>
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
                    active: item.href.includes(accountPageSlug as string),
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
