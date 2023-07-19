import { setSpace, tabletAndUp, BORDER_GRAY } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const JournalCategoryEntryContainer = styled.div<{ headerHeight: number }>`
  padding-top: ${(props) => props.headerHeight + 'px'};

  .breadcrumbs {
    padding: calc(var(--gutter) / 2) 0 0;
    max-width: 90vw;
    margin: 0 auto;
    ul {
      li {
        margin-right: 10px;

        a {
          font-size: var(--font-size-xxxsmall);
        }

        span {
          margin-left: 10px;
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
          font-size: 30px;
          line-height: 32px;
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
      margin: 26px auto 30px;

      ${tabletAndUp(
        `
          margin: 30px auto;
        `,
      )}
    }

    .journal-category__page-heading {
      font-size: 30px;
      line-height: 1;
      text-align: center;
      font-weight: 500;
    }

    .journal-category__subnav {
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      gap: 20px;
      padding: 15px 24px;
      margin: 10px 0 20px;
      border-top: 0.5px solid ${BORDER_GRAY};
      border-bottom: 0.5px solid ${BORDER_GRAY};
      ${tabletAndUp(`
        overflow-x: unset;
        align-items: center;
        justify-content: center;
        border-top: none;
        border-bottom: none;
        margin: 10px 0 30px;
        padding: 0;
      `)};
    }

    .journal-category__subnav-link {
      text-transform: uppercase;
      cursor: pointer;
      white-space: nowrap;
      font-size: 14px;

      &:after {
        border-bottom: 2px solid transparent;
        padding: 2px 0 0;
        display: block;
        content: '';
      }

      &.active {
        font-weight: 600;

        &:after {
          border-bottom: 2px solid #000;
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
    }

    .journal-category__load-more-button {
      max-width: unset;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: ${setSpace(6)};
    }
  }
`;
