import { setSpace, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const JournalCategoryEntryContainer = styled.div<{ headerHeight: number }>`
  padding-top: ${(props) => props.headerHeight + 'px'};

  .breadcrumbs {
    padding: calc(var(--gutter) / 2) 0 0;
    max-width: 90vw;
    margin: 0 auto;
    ul {
      li {
        margin-right: 1rem;

        a {
          font-size: var(--font-size-xxxsmall);
        }

        span {
          margin-left: 1rem;
          font-size: var(--font-size-xxxsmall);
        }
      }
    }
  }

  .journal-category__wrapper {
    &.blog-category {
      .module-title {
        * {
          padding: 0;
          margin: 0;
        }

        hr {
          display: none;
        }

        h2 {
          display: block;
          font-size: 3rem;
          line-height: 3.2rem;
          padding: ${setSpace(4)} ${setSpace(2)} ${setSpace(2)};
          &:last-child {
            padding-right: 0;
          }
        }
        text-align: center;
      }
    }

    .journal-category__page-title {
      text-transform: uppercase;
      justify-content: center;
      display: flex;
      margin: 2.6rem auto 3rem;

      ${tabletAndUp(
        `
          margin: 3rem auto;
        `,
      )}
    }

    .journal-category__page-heading {
      font-size: 3rem;
      line-height: 1;
      text-align: center;
      font-weight: 500;
    }

    .journal-category__subnav {
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      gap: 2rem;
      padding: 1.5rem 2.4rem;
      margin: 1rem 0 2rem;
      border-top: 0.5rem solid var(--color-gray);
      border-bottom: 0.5rem solid var(--color-gray);
      ${tabletAndUp(`
        overflow-x: unset;
        align-items: center;
        justify-content: center;
        border-top: none;
        border-bottom: none;
        margin: 1rem 0 3rem;
        padding: 0;
      `)};
    }

    .journal-category__subnav-link {
      text-transform: uppercase;
      cursor: pointer;
      white-space: nowrap;
      font-size: 1.4rem;

      &:after {
        border-bottom: 0.2rem solid transparent;
        padding: 0.2rem 0 0;
        display: block;
        content: '';
      }

      &.active {
        font-weight: 600;

        &:after {
          border-bottom: 0.2rem solid #000;
        }
      }
    }

    .journal-category__content-block-container {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -1.6rem;

      > * {
        flex: 0 0 33.33%;
      }
      div { 
        &.journal-item {
          padding: 3rem 1.6rem;
          @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
            padding: 1rem 0;
          }
        }
      }
    }

    .journal-category__load-more-button {
      max-width: unset;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: ${setSpace(6)};
      > div {
        max-width: 20rem !important;
      }
    }
  }
`;
