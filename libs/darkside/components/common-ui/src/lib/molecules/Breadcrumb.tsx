import { mobileOnly, pageMargin } from '@diamantaire/styles/darkside-styles';
import Link from 'next/link';
import styled from 'styled-components';

import { UIString } from './UIString';

const BreadcrumbStyles = styled.div<{ lastItemBolded?: boolean; spacingType?: string }>`
  margin: 2rem 0;

  ${mobileOnly(`
    padding-left: 0;
    padding-right: 0;
  `)}
  ${({ spacingType }) => {
    switch (spacingType) {
      case 'default':
        return `${pageMargin}`;
      case 'containedWidth':
        return `
          width: 100%;
          max-width: 144rem;
          margin-left: auto;
          margin-right: auto;
        `;
      default:
        return '';
    }
  }}

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
    title?: string;
    name?: string;
    path: string;
    link?: {
      slug: string;
      category: string;
      slugNew: string;
    };
  }[];
  lastItemBolded?: boolean;
  simple?: boolean;
  spacingType?: string;
};

const Breadcrumb = ({ breadcrumb, simple = false, lastItemBolded = true, spacingType = 'default' }: BreadcrumbProps) => {
  return (
    <BreadcrumbStyles
      id="breadcrumb"
      className="container-wrapper"
      lastItemBolded={lastItemBolded}
      spacingType={spacingType}
    >
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
            const isLastItem = breadcrumb.length - 1 === index;

            const link =
              item?.link?.category && item?.link?.slugNew
                ? `/${item?.link?.category}/${item.link.slugNew}`
                : item?.link?.slug || item?.path;
            const name = item?.title?.trim() || item.name;

            if (!link) {
              return null;
            }

            return (
              <li key={item.path}>
                <Link href={isLastItem ? '#' : link}>{name}</Link>
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
