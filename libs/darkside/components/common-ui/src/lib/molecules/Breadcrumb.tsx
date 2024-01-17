import { mobileOnly } from '@diamantaire/styles/darkside-styles';
import Link from 'next/link';
import styled from 'styled-components';

import { UIString } from './UIString';

const BreadcrumbStyles = styled.div<{ lastItemBolded?: boolean }>`
  padding-bottom: calc(var(--gutter) / 4);

  ${mobileOnly(`
    padding-left: 0;
    padding-right: 0;
  `)}

  ul {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    ${mobileOnly(`
    padding-left: 1rem;
    padding-right:1rem;
  `)}
    li {
      flex-shrink: 0;
      a {
        font-size: var(--font-size-xxxsmall);
        white-space: nowrap;
      }
      span {
        margin: 0 0.25rem;
        font-size: var(--font-size-xxxsmall);
      }
    }
  }
`;

type BreadcrumbProps = {
  breadcrumb: {
    title: string;
    path: string;
  }[];
  lastItemBolded?: boolean;
  simple?: boolean;
};

const Breadcrumb = ({ breadcrumb, simple = false, lastItemBolded = true }: BreadcrumbProps) => {
  return (
    <BreadcrumbStyles className="container-wrapper" lastItemBolded={lastItemBolded}>
      {simple ? (
        <ul className="list-unstyled flex">
          {breadcrumb?.map((item, index) => {
            return (
              <li key={item?.path}>
                <Link href={item?.path}>{item?.title}</Link>
                {breadcrumb.length - 1 !== index && <span>/</span>}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="list-unstyled flex">
          <li>
            <Link href="/">
              <UIString>Home</UIString>
            </Link>
            <span>/</span>
          </li>
          {breadcrumb?.map((item, index) => {
            if (!item.path) {
              return null;
            }

            const isLastItem = breadcrumb.length - 1 === index;

            return (
              <li key={item.path}>
                <Link href={isLastItem ? '#' : item?.path}>{item?.title?.trim()}</Link>
                {!isLastItem && <span>/</span>}
              </li>
            );
          })}
        </ul>
      )}
    </BreadcrumbStyles>
  );
};

export { Breadcrumb };
