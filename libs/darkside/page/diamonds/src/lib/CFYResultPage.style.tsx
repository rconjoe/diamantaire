import { TEAL, TEAL_MED, desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
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
    > .media {
      width: 100%;

      ${desktopAndUp(`
      width: 50rem;
      height: 57rem;
      `)}

      .swiper {
        width: 100%;
        padding: 0 0 80px;

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
      border: 1px solid transparent;
      padding: 0.1rem;

      &.active {
        border: 1px solid ${TEAL_MED};
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
      }
    }
  }

  .page-aside {
    width: 100%;
    padding: 0 2.4rem;
    margin: 4rem 0 0;

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
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-medium);
    }

    .subtitle,
    .subtitle * {
      text-transform: capitalize;
      font-size: var(--font-size-xsmall);

      ${tabletAndUp(`
        font-size: var(--font-size-medium);
      `)};
    }

    .price,
    .price * {
      margin: 0.25rem 0 0;
      font-size: var(--font-size-xsmall);
      ${tabletAndUp(`
      font-size: var(--font-size-small);
      `)};
    }

    > .accordion {
      margin: 2rem 0 0;
    }

    .date {
      margin: 2rem 0 0;
    }

    .date,
    .date * {
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-bold) !important;
    }

    .policy,
    .policy * {
      padding: 0;
      margin: 0.25rem 0 0;
      font-size: var(--font-size-xxxsmall);
    }

    .links * {
      font-size: var(--font-size-xxsmall);
    }

    .links a {
      color: ${TEAL};
    }

    .cta {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      ${desktopAndUp(`
        flex-direction: row;
      `)}
    }
  }
`;

export default StyledCFYResultPage;

export { StyledCFYResultPage };
