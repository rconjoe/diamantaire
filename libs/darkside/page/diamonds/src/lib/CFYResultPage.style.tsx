import { desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const pageGap = '5rem';

const StyledCFYResultPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 !important;

  ${tabletAndUp(`
    margin: 2rem auto;
  `)};

  .page-row {
    width: 100%;
    display: flex;
    flex-direction: column;

    ${tabletAndUp(`
      gap: ${pageGap};
      flex-direction: row;  
    `)}
  }

  .page-head {
    display: block;
    text-align: center;
    margin-bottom: 2rem;

    &.mobile-only {
      height: 2.7rem;

      ${tabletAndUp(`
        display: none;
      `)}
    }

    * {
      font-size: var(--font-size-xsmall);
    }
  }

  .page-content {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    ${tabletAndUp(`
      width: calc(50% - (${pageGap} / 2))
    `)}
  }

  .page-content {
    position: relative;

    > .media {
      width: 100%;

      ${desktopAndUp(`
      width: 50rem;
      height: 57rem;
      `)}

      .swiper {
        width: 100%;
        padding: 0 0 8rem;
        height: calc(100vw + 8rem);

        ${desktopAndUp(`
          padding: 0;
          width: 50rem;
          height: 57rem;
        `)}
      }
    }

    .custom-pagination {
      transform: translateX(-50%);
      position: absolute;
      bottom: 0;
      left: 50%;
      display: flex;
      justify-content: center;
      gap: 1rem;
      z-index: 1;
    }

    .custom-pagination-thumbnail {
      width: 6rem;
      height: 6rem;
      cursor: pointer;
      border: 0.1rem solid transparent;
      padding: 0;
      margin: 0;
      overflow: hidden;

      &.active {
        border: 0.1rem solid #516868;
      }

      .caption {
        display: none;
      }

      .diamond36 {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(1.05);
      }
    }
  }

  .page-aside {
    width: 100%;
    padding: 0 2.4rem;
    margin: 4rem 0 0;
    position: relative;

    ${tabletAndUp(`
      margin: 0;
      width: calc(50% - (${pageGap} / 2));
    `)}
  }

  .page-aside {
    .inner {
      display: flex;
      flex-direction: column;
      max-width: 450px;
    }

    .title,
    .title * {
      position: relative;
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-medium);
    }

    .subtitle,
    .subtitle * {
      font-size: var(--font-size-xsmall);

      ${tabletAndUp(`
        font-size: var(--font-size-medium);
      `)};
    }

    .primary-price,
    .primary-price * {
      margin: 0.25rem 0 0;
      font-size: var(--font-size-xsmall);

      ${tabletAndUp(`
        font-size: var(--font-size-xsmall);
      `)};

      small {
        margin: 0;
        display: block;
        font-size: var(--font-size-xxxxsmall);

        ${tabletAndUp(`
          font-size: var(--font-size-xxxxsmall);
        `)};
      }
    }

    > .accordion {
      margin: 2rem 0 0;
    }

    .date {
      min-height: 24px;
      margin: 2rem 0 0.5rem;
    }

    .date,
    .date * {
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-bold) !important;
    }

    .policy,
    .policy * {
      padding: 0;
      margin: 0;
      font-size: var(--font-size-xxsmall);

      a {
        color: var(--color-teal);
      }
    }

    .links * {
      margin: 0;
      padding: 0;
      font-size: var(--font-size-xxsmall);
    }

    .links a {
      color: var(--color-teal);
    }

    .cta {
      display: flex;
      flex-direction: column;
      margin: 2rem 0;
      gap: 1rem;

      ${desktopAndUp(`
        flex-direction: row;
      `)}
    }
  }

  .pagination {
    padding-top: 20px;
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      justify-content: center;
      li {
        padding: 0 0.5rem;
        button {
          padding: 0;

          &.active {
            > div {
              border: 0.1rem solid rgb(81, 104, 104);
            }
          }
        }
      }
    }
  }

  .desktop-only {
    display: none;

    ${desktopAndUp(`
      display: block;
    `)}
  }

  .mobile-only {
    ${desktopAndUp(`
      display: none;
    `)}
  }
`;

export default StyledCFYResultPage;

export { StyledCFYResultPage };
